import { useState, useEffect } from 'react';
import { getSchemes } from '../services/api';

export const useFilters = (initialFilters = {}) => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalSchemes: 0
  });

  const fetchSchemes = async (filters) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getSchemes(filters);
      setSchemes(data.schemes);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalSchemes: data.totalSchemes
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch schemes');
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes(initialFilters);
  }, []);

  return {
    schemes,
    loading,
    error,
    pagination,
    refetch: fetchSchemes
  };
};
