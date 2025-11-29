import { useCallback, useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import FeedbackBox from '../components/home/FeedbackBox';
import FilterGrid from '../components/home/FilterGrid';
import Hero from '../components/home/Hero';
import SchemePreview from '../components/home/SchemePreview';
import { useFilterContext } from '../context/FilterContext';
import { getSchemes } from '../services/api';
import { generatePageNumbers } from '../utils/helpers';

const HomePage = () => {
  const { filters, updateFilter } = useFilterContext();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalSchemes: 0
  });

  const fetchSchemes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSchemes(filters);
      setSchemes(data.schemes);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalSchemes: data.totalSchemes
      });
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  const handlePageChange = (page) => {
    if (page !== '...' && page !== pagination.currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateFilter('page', page);
    }
  };

  return (
    <div>
      <Hero />
      <FilterGrid />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {loading ? (
              <Loading />
            ) : schemes.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-sm text-secondary">
                    Showing {schemes.length} of {pagination.totalSchemes} schemes
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {schemes.map((scheme) => (
                    <SchemePreview key={scheme.id} scheme={scheme} />
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className="px-3 py-1 text-sm border border-border rounded hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {generatePageNumbers(pagination.currentPage, pagination.totalPages).map((page, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(page)}
                        disabled={page === '...' || page === pagination.currentPage}
                        className={`px-3 py-1 text-sm border rounded ${
                          page === pagination.currentPage
                            ? 'bg-primary text-white border-primary'
                            : 'border-border hover:border-primary'
                        } disabled:cursor-default`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="px-3 py-1 text-sm border border-border rounded hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-secondary">No schemes found matching your criteria.</p>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <FeedbackBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
