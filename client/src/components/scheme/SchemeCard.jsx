import React from 'react';
import { Link } from 'react-router-dom';
import { truncateText, getDisplayTitle, getPreviousName } from '../../utils/helpers';

const SchemeCard = ({ scheme }) => {
  const displayTitle = getDisplayTitle(scheme);
  const titleMatch = displayTitle.match(/^(.*?)(?:\s*\(([^)]+)\))\s*$/);
  const mainTitle = titleMatch ? titleMatch[1].trim() : displayTitle;
  const bracketText = titleMatch ? titleMatch[2].trim() : '';
  return (
    <div className="bg-white border border-border rounded p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-primary flex-1">
          {mainTitle}
        </h3>
        <span className="text-xs text-secondary ml-2">{scheme.year}</span>
      </div>
      {bracketText && (
        <p className="text-xs text-secondary -mt-2 mb-2">{bracketText}</p>
      )}
      {getPreviousName(scheme) && (
        <p className="text-xs text-secondary mb-2">
          Previous name: {getPreviousName(scheme)}
        </p>
      )}
      
      <p className="text-sm text-secondary mb-3">
        {truncateText(scheme.description, 150)}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-3 text-xs">
        <span className="px-2 py-1 bg-light text-secondary rounded">
          {scheme.theme}
        </span>
        <span className="px-2 py-1 bg-light text-secondary rounded">
          {scheme.ministry}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <Link
          to={`/scheme/${scheme.id}/brief`}
          className="text-sm text-primary hover:text-secondary underline"
        >
          View Brief →
        </Link>
        <Link
          to={`/scheme/${scheme.id}`}
          className="text-xs text-secondary hover:text-primary underline"
        >
          Full Details
        </Link>
      </div>
    </div>
  );
};

export default SchemeCard;

