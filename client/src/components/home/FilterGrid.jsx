import { useFilterContext } from '../../context/FilterContext';
import MinistryFilter from '../filters/MinistryFilter';
import PMFilter from '../filters/PMFilter';
import ThemeFilter from '../filters/ThemeFilter';
import YearFilter from '../filters/YearFilter';

const FilterGrid = () => {
  const { filters, filterOptions, updateFilter, resetFilters } = useFilterContext();

  const hasActiveFilters = filters.year || filters.ministry || filters.theme || filters.primeMinister;

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-sm text-secondary hover:text-primary underline"
            >
              Clear All
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <YearFilter
            value={filters.year}
            onChange={(value) => updateFilter('year', value)}
            options={filterOptions.years || []}
          />
          <MinistryFilter
            value={filters.ministry}
            onChange={(value) => updateFilter('ministry', value)}
            options={filterOptions.ministries || []}
          />
          <ThemeFilter
            value={filters.theme}
            onChange={(value) => updateFilter('theme', value)}
            options={filterOptions.themes || []}
          />
          <PMFilter
            value={filters.primeMinister}
            onChange={(value) => updateFilter('primeMinister', value)}
            options={filterOptions.primeMinisters || []}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterGrid;
