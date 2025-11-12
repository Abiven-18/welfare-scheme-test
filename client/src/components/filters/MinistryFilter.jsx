import React from 'react';

const MinistryFilter = ({ value, onChange }) => {
  const ministries = [
    'Ministry of Personnel, Public Grievances and Pensions',
    'Department of Atomic Energy',
    'Department of Space',
    'Ministry of Defence',
    'Ministry of Home Affairs',
    'Ministry of Co-operation',
    'Ministry of Road Transport and Highways',
    'Ministry of Health and Family Welfare',
    'Ministry of Chemicals and Fertilizers',
    'Ministry of Agriculture and Farmers Welfare',
    'Ministry of Rural Development',
    'Ministry of Finance',
    'Ministry of Corporate Affairs',
    'Ministry of External Affairs',
    'Ministry of Power',
    'Ministry of Housing and Urban Affairs',
    'Ministry of Heavy Industries',
    'Ministry of Steel',
    'Ministry of Commerce and Industry',
    'Ministry of Education',
    'Ministry of Micro, Small and Medium Enterprises',
    'Ministry of Panchayati Raj',
    'Ministry of Ports, Shipping and Waterways',
    'Ministry of Social Justice and Empowerment',
    'Ministry of Civil Aviation',
    'Ministry of Consumer Affairs, Food and Public Distribution',
    'Ministry of New and Renewable Energy',
    'Ministry of Tribal Affairs',
    'Ministry of Textiles',
    'Ministry of Information and Broadcasting',
    'Ministry of Railways',
    'Ministry of Electronics and Information Technology',
    'Ministry of Development of North Eastern Region',
    'Ministry of Communications',
    'Ministry of Environment, Forest and Climate Change',
    'Ministry of Culture',
    'Ministry of Tourism',
    'Ministry of Women and Child Development',
    'Ministry of Parliamentary Affairs',
    'Ministry of Minority Affairs',
    'Ministry of Petroleum and Natural Gas',
    'Ministry of Labour and Employment',
    'Ministry of Youth Affairs and Sports',
    'Ministry of Coal',
    'Ministry of Mines',
    'Ministry of Food Processing Industries',
    'Ministry of Jal Shakti'
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-primary mb-2">
        Ministry
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:border-primary"
      >
        <option value="">All Ministries</option>
        {ministries.map((ministry) => (
          <option key={ministry} value={ministry}>
            {ministry}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MinistryFilter;
