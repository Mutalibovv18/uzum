import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, clearProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice';
import { toast } from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const { items: products, loading, total } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    dispatch(clearProducts());
    dispatch(fetchProducts({ limit: productsPerPage, skip: 0 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    dispatch(fetchProducts({ limit: productsPerPage, skip: products.length }));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast(
      <div className="flex items-center gap-4">
        <img src={product.thumbnail} alt={product.title} className="w-12 h-12 object-cover rounded" />
        <div className="flex-1">
          <p className="font-medium">{product.title}</p>
          <Link to="/cart" className="text-blue-600 hover:text-blue-700">Savatga o'tish</Link>
        </div>
      </div>,
      {
        duration: 3000,
      }
    );
  };

  const toggleFavorite = (product) => {
    const isFavorite = favorites.some(item => item.id === product.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      toast.success('Mahsulot saralangandan olib tashlandi');
    } else {
      dispatch(addToFavorites(product));
      toast.success('Mahsulot saralanganga qo\'shildi');
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Carousel />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Link to={`/product/${product.id}`} className="block">
              <div className="relative">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(product);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
                >
                  {favorites.some(item => item.id === product.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
                {product.discountPercentage > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                )}
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.id}`} className="block">
                <h3 className="text-sm font-medium text-gray-900 mb-2">{product.title}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-xs text-gray-500">⭐ {product.rating}</span>
                </div>
              </Link>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-lg font-bold">{product.price.toLocaleString()} so'm</p>
                  <p className="text-xs text-gray-500">{Math.round(product.price / 12).toLocaleString()} so'm / 12 oy</p>
                </div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-sm btn-primary"
                >
                  Savatga
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length < total && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="btn btn-outline btn-primary"
          >
            Ko'proq ko'rsatish
          </button>
        </div>
      )}
    </div>
  );
}

export default Home