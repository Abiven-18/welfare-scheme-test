import { useNavigate } from 'react-router-dom';
import SearchBar from '../common/SearchBar';

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="bg-light border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-primary mb-3">
          Welfare Scheme Repository
        </h1>
        <p className="text-base text-secondary max-w-2xl mb-6">
          Browse and search through a comprehensive collection of Indian Government welfare schemes. 
          Find schemes by year, ministry, theme, or Prime Minister.
        </p>
        <div className="max-w-2xl">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
