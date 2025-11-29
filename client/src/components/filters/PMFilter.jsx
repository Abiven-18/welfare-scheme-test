
const PMFilter = ({ value, onChange, options = [] }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-primary mb-2">
        Prime Minister
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:border-primary"
      >
        <option value="">All</option>
        {options.map((pm) => (
          <option key={pm} value={pm}>
            {pm}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PMFilter;
