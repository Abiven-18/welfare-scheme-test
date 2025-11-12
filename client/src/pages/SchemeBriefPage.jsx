import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSchemeById } from '../services/api';
import Loading from '../components/common/Loading';
import { getPreviousName } from '../utils/helpers';

const SchemeBriefPage = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScheme = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSchemeById(id);
      setScheme(data);
    } catch (err) {
      setError('Failed to load scheme brief');
      console.error('Error fetching scheme:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchScheme();
  }, [fetchScheme]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading />
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-secondary mb-4">{error || 'Scheme not found'}</p>
          <Link to="/" className="text-primary hover:text-secondary underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-block text-sm text-secondary hover:text-primary mb-6">
        ← Back to Schemes
      </Link>

      <div className="bg-white border border-border rounded p-6 mb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary mb-3">{scheme.title}</h1>
          {getPreviousName(scheme) && (
            <p className="text-sm text-secondary mb-3">
              Previous name: <span className="font-medium text-primary">{getPreviousName(scheme)}</span>
            </p>
          )}
          {((scheme.revised && String(scheme.revised).trim()) || (scheme['renamed year'] && String(scheme['renamed year']).trim())) && (
            <div className="space-y-1 mb-3">
              {scheme.revised && String(scheme.revised).trim() && (
                <p className="text-sm text-secondary">
                  Revised: <span className="font-medium text-primary">{String(scheme.revised).trim()}</span>
                </p>
              )}
              {scheme['renamed year'] && String(scheme['renamed year']).trim() && (
                <p className="text-sm text-secondary">
                  Renamed year: <span className="font-medium text-primary">{String(scheme['renamed year']).trim()}</span>
                </p>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-light text-secondary rounded">
              Year: {scheme.year}
            </span>
            <span className="px-3 py-1 bg-light text-secondary rounded">
              {scheme.ministry}
            </span>
            <span className="px-3 py-1 bg-light text-secondary rounded">
              PM: {scheme.primeMinister}
            </span>
            {scheme.status && (
              <span className={`px-3 py-1 text-sm rounded ${
                scheme.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {scheme.status}
              </span>
            )}
          </div>
        </div>

        {/* Brief Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-primary mb-3">Brief</h2>
          <p className="text-sm text-secondary leading-relaxed">{scheme.description}</p>
        </div>

        {/* Target Population */}
        {scheme.beneficiaries && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-3">Target Population</h2>
            <p className="text-sm text-secondary">{scheme.beneficiaries}</p>
          </div>
        )}

        {/* Classification */}
        {scheme.theme && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-3">Classification</h2>
            <p className="text-sm text-secondary">{scheme.theme}</p>
          </div>
        )}

        {/* Tags */}
        {scheme.tags && scheme.tags.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {scheme.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-light text-secondary text-sm rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Official Website Link */}
        {scheme.officialWebsite && (
          <div className="mb-6 p-4 bg-light rounded">
            <h2 className="text-lg font-semibold text-primary mb-3">Official Website</h2>
            <a
              href={scheme.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-secondary underline break-all inline-flex items-center gap-2"
            >
              {scheme.officialWebsite}
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </a>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Link
            to={`/scheme/${scheme.id}`}
            className="flex-1 px-4 py-2 text-sm text-center bg-primary text-white rounded hover:bg-secondary"
          >
            View Full Details
          </Link>
          <Link
            to="/"
            className="px-4 py-2 text-sm bg-light text-secondary rounded hover:bg-border"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SchemeBriefPage;
