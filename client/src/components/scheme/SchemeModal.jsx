import React from 'react';

const SchemeModal = ({ scheme, isOpen, onClose }) => {
  if (!isOpen || !scheme) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-primary mb-2">{scheme.title}</h2>
              {(scheme.schemeRename || scheme.rename) && (
                <p className="text-xs text-secondary mb-2">
                  Renamed as: <span className="font-medium text-primary">{scheme.schemeRename || scheme.rename}</span>
                </p>
              )}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-light text-secondary rounded">
                  {scheme.year}
                </span>
                <span className="px-2 py-1 bg-light text-secondary rounded">
                  {scheme.ministry}
                </span>
                <span className="px-2 py-1 bg-light text-secondary rounded">
                  {scheme.primeMinister}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-secondary hover:text-primary text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Brief Description */}
          <div>
            <h3 className="text-base font-semibold text-primary mb-2">About</h3>
            <p className="text-sm text-secondary leading-relaxed">{scheme.description}</p>
          </div>

          {/* Target Population */}
          {scheme.beneficiaries && (
            <div>
              <h3 className="text-base font-semibold text-primary mb-2">Target Population</h3>
              <p className="text-sm text-secondary">{scheme.beneficiaries}</p>
            </div>
          )}

          {/* Theme/Classification */}
          {scheme.theme && (
            <div>
              <h3 className="text-base font-semibold text-primary mb-2">Classification</h3>
              <p className="text-sm text-secondary">{scheme.theme}</p>
            </div>
          )}

          {/* Tags */}
          {scheme.tags && scheme.tags.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-primary mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {scheme.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-light text-secondary text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Official Website */}
          {scheme.officialWebsite && (
            <div>
              <h3 className="text-base font-semibold text-primary mb-2">Official Website</h3>
              <a
                href={scheme.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-secondary underline break-all"
              >
                {scheme.officialWebsite}
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-border p-6 flex gap-3">
          <a
            href={`/scheme/${scheme.id}`}
            className="flex-1 px-4 py-2 text-sm text-center bg-primary text-white rounded hover:bg-secondary"
            onClick={onClose}
          >
            View Full Details
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-light text-secondary rounded hover:bg-border"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchemeModal;
