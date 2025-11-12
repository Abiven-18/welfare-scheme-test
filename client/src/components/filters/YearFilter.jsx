
const YearFilter = ({ value, onChange, options }) => {
  // Generate full range of years from 1951 to 2025 (descending)
  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i).reverse();

  return (
    <div>
      <label className="block text-sm font-medium text-primary mb-2">
        Year
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:border-primary"
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearFilter;
