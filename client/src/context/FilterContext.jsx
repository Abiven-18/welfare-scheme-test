import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFilterOptions } from '../services/api';

const FilterContext = createContext();

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    year: '',
    ministry: '',
    theme: '',
    primeMinister: '',
    search: '',
    page: 1
  });

  const [filterOptions, setFilterOptions] = useState({
    years: [],
    ministries: [],
    themes: [],
    primeMinsters: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const options = await getFilterOptions();
      setFilterOptions(options);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value // Reset to page 1 when filters change
    }));
  };

  const resetFilters = () => {
    setFilters({
      year: '',
      ministry: '',
      theme: '',
      primeMinister: '',
      search: '',
      page: 1
    });
  };

  const value = {
    filters,
    filterOptions,
    loading,
    updateFilter,
    resetFilters
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};
