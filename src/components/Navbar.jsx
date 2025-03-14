import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <nav className="container mx-auto flex justify-between items-center px-4">
 <div className="flex-1 mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/favorites" className="flex items-center space-x-2 hover:text-yellow-500">
            <FiHeart className="text-xl" />
            <span>Saralanganlar</span>
          </Link>
          
          <Link to="/cart" className="relative flex items-center space-x-2 hover:text-yellow-500">
            <FiShoppingCart className="text-xl" />
            <span>Cart</span>
            <span className="absolute -top-2 -right-3 text-white text-xs rounded-full px-2 py-1">
           
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
