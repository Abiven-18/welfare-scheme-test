import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-block text-sm text-secondary hover:text-primary mb-6">
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold text-primary mb-6">About</h1>

      <div className="space-y-6 text-sm text-secondary leading-relaxed">
        <div className="bg-white border border-border rounded p-6">
          <h2 className="text-lg font-semibold text-primary mb-3">
            Welfare Scheme Repository
          </h2>
          <p className="mb-4">
            This is a comprehensive repository of Indian Government welfare schemes designed to help 
            citizens discover and learn about various government initiatives.
          </p>
          <p>
            The platform provides an easy way to browse schemes by year, ministry, theme, and 
            Prime Minister, making it simple to find relevant welfare programs.
          </p>
        </div>

        <div className="bg-white border border-border rounded p-6">
          <h2 className="text-lg font-semibold text-primary mb-3">
            Features
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Browse schemes by multiple filters</li>
            <li>Search functionality for quick access</li>
            <li>Detailed scheme information</li>
            <li>Download scheme documents</li>
            <li>Submit feedback and suggestions</li>
          </ul>
        </div>

        <div className="bg-white border border-border rounded p-6">
          <h2 className="text-lg font-semibold text-primary mb-3">
            Disclaimer
          </h2>
          <p>
            This is an informational repository. For official and up-to-date information about 
            any scheme, please visit the respective government ministry websites or official 
            scheme portals.
          </p>
        </div>

        <div className="bg-white border border-border rounded p-6">
          <h2 className="text-lg font-semibold text-primary mb-3">
            Contact
          </h2>
          <p>
            For questions, suggestions, or to report issues, please visit our{' '}
            <Link to="/contact" className="text-primary hover:text-secondary underline">
              contact page
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
