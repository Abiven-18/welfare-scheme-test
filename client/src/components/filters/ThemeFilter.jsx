
const ThemeFilter = ({ value, onChange, options = [] }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-primary mb-2">
        Theme
      </label>
      <select
        key={`theme-filter-${options.length}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:border-primary"
      >
        <option value="">All Themes</option>
        {options.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeFilter;
