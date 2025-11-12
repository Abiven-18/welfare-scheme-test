import React from 'react';
import { Link } from 'react-router-dom';
import { truncateText } from '../../utils/helpers';

const SchemePreview = ({ scheme }) => {
  return (
    <Link
      to={`/scheme/${scheme.id}/brief`}
      className="block bg-white border border-border rounded p-4 hover:border-primary transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-semibold text-primary flex-1">
          {scheme.title}
        </h3>
        <span className="text-xs text-secondary ml-2">{scheme.year}</span>
      </div>
      
      <p className="text-sm text-secondary mb-3">
        {truncateText(scheme.description, 120)}
      </p>
      
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 bg-light text-secondary rounded">
          {scheme.theme}
        </span>
        <span className="px-2 py-1 bg-light text-secondary rounded">
          {scheme.ministry}
        </span>
      </div>
    </Link>
  );
};

export default SchemePreview;
