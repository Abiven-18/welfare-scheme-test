import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/common/Loading';
import DocumentViewer from '../components/scheme/DocumentViewer';
import { getSchemeById } from '../services/api';

const SchemeDetailPage = () => {
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
      setError('Failed to load scheme details');
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
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-primary flex-1">{scheme.title}</h1>
          <span className="text-sm text-secondary ml-4">{scheme.year}</span>
        </div>
        {scheme.schemeRename && scheme.schemeName && scheme.schemeRename !== scheme.schemeName && (
          <p className="text-sm text-secondary mb-4">
            Previous name: <span className="font-medium text-primary">{scheme.schemeName}</span>
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-light text-secondary text-sm rounded">
            {scheme.theme}
          </span>
          <span className="px-3 py-1 bg-light text-secondary text-sm rounded">
            {scheme.ministry}
          </span>
          <span className="px-3 py-1 bg-light text-secondary text-sm rounded">
            {scheme.primeMinister}
          </span>
          {scheme.status && (
            <span className={`px-3 py-1 text-sm rounded ${
              scheme.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {scheme.status}
            </span>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-primary mb-2">Description</h2>
            <p className="text-sm text-secondary leading-relaxed">{scheme.description}</p>
          </div>

          {scheme.beneficiaries && (
            <div>
              <h2 className="text-lg font-semibold text-primary mb-2">Beneficiaries</h2>
              <p className="text-sm text-secondary leading-relaxed">{scheme.beneficiaries}</p>
            </div>
          )}

          {scheme.eligibility && (
            <div>
              <h2 className="text-lg font-semibold text-primary mb-2">Eligibility</h2>
              <p className="text-sm text-secondary leading-relaxed whitespace-pre-line">{scheme.eligibility}</p>
            </div>
          )}

          {scheme.benefits && (
            <div>
              <h2 className="text-lg font-semibold text-primary mb-2">Benefits</h2>
              <p className="text-sm text-secondary leading-relaxed whitespace-pre-line">{scheme.benefits}</p>
            </div>
          )}

          {scheme.applicationProcess && (
            <div>
              <h2 className="text-lg font-semibold text-primary mb-2">Application Process</h2>
              <p className="text-sm text-secondary leading-relaxed whitespace-pre-line">{scheme.applicationProcess}</p>
            </div>
          )}

          {scheme.officialWebsite && (
            <div>
              <h2 className="text-lg font-semibold text-primary mb-2">Official Website</h2>
              <a
                href={scheme.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-secondary underline"
              >
                {scheme.officialWebsite}
              </a>
            </div>
          )}
        </div>
      </div>

      <DocumentViewer
        documentUrl={scheme.documentUrl}
        schemeTitle={scheme.title}
      />

      {scheme.tags && scheme.tags.length > 0 && (
        <div className="bg-white border border-border rounded p-6 mt-6">
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
    </div>
  );
};

export default SchemeDetailPage;
