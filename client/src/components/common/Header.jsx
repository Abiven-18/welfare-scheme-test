import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-semibold text-primary hover:text-secondary">
            Welfare Schemes
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm text-secondary hover:text-primary">
              Home
            </Link>
            <Link to="/about" className="text-sm text-secondary hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-sm text-secondary hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
