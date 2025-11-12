import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-primary mb-3">
              Welfare Schemes
            </h3>
            <p className="text-sm text-secondary">
              A comprehensive repository of Indian Government welfare schemes.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-primary mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-secondary hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-secondary hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-secondary hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-primary mb-3">
              Information
            </h3>
            <p className="text-sm text-secondary">
              This is an informational repository. For official scheme details, please visit respective government websites.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-secondary text-center">
            © {currentYear} Welfare Scheme Repository. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
