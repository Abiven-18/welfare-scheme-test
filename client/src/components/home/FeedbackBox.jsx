import React, { useState } from 'react';
import { submitFeedback } from '../../services/api';

const FeedbackBox = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await submitFeedback(formData);
      setStatus({ type: 'success', message: 'Thank you for your feedback!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit feedback. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light border border-border rounded p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Send Feedback</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {status.message && (
          <div className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-sm bg-primary text-white rounded hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackBox;
