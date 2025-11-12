import React from 'react';
import { Link } from 'react-router-dom';
import FeedbackBox from '../components/home/FeedbackBox';

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-block text-sm text-secondary hover:text-primary mb-6">
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold text-primary mb-6">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white border border-border rounded p-6 mb-6">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Get in Touch
            </h2>
            <p className="text-sm text-secondary mb-4">
              We welcome your feedback, suggestions, and questions about the Welfare Scheme Repository.
            </p>
            <p className="text-sm text-secondary">
              Please use the form to send us a message, and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="bg-white border border-border rounded p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Information
            </h2>
            <div className="space-y-3 text-sm text-secondary">
              <div>
                <h3 className="font-medium text-primary mb-1">Purpose</h3>
                <p>Informational repository of government welfare schemes</p>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-1">Updates</h3>
                <p>Schemes are regularly updated with latest information</p>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-1">Disclaimer</h3>
                <p>For official information, please visit government websites</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <FeedbackBox />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
