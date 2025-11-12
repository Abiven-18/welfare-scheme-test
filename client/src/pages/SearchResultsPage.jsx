import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getSchemes } from '../services/api';
import SchemeCard from '../components/scheme/SchemeCard';
import Loading from '../components/common/Loading';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalSchemes: 0
  });

  const fetchSearchResults = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSchemes({ search: query });
      setSchemes(data.schemes);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalSchemes: data.totalSchemes
      });
    } catch (error) {
      console.error('Error searching schemes:', error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query, fetchSearchResults]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-block text-sm text-secondary hover:text-primary mb-6">
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold text-primary mb-2">Search Results</h1>
      <p className="text-sm text-secondary mb-6">
        Showing results for: <span className="font-semibold">"{query}"</span>
      </p>

      {loading ? (
        <Loading />
      ) : schemes.length > 0 ? (
        <>
          <p className="text-sm text-secondary mb-6">
            Found {pagination.totalSchemes} scheme{pagination.totalSchemes !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-secondary mb-4">No schemes found for "{query}"</p>
          <Link to="/" className="text-primary hover:text-secondary underline">
            Browse all schemes
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
