import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../store/slices/favoritesSlice';
import { addToCart } from '../store/slices/cartSlice';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
    toast.success('Mahsulot saralangandan olib tashlandi');
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Mahsulot savatga qo\'shildi');
  };

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Saralangan mahsulotlar yo'q</h2>
          <p className="text-gray-600 mb-4">Mahsulotlarni saralanganga qo'shing</p>
          <Link to="/" className="btn btn-primary">
            Xarid qilishni davom ettirish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Saralangan mahsulotlar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <button
                onClick={() => handleRemoveFromFavorites(product.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-red-50"
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">{product.title}</h3>
              <div className="flex items-center mb-2">
                <span className="text-xs text-gray-500">⭐ {product.rating}</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-lg font-bold">{product.price.toLocaleString()} so'm</p>
                  <p className="text-xs text-gray-500">
                    {Math.round(product.price / 12).toLocaleString()} so'm / 12 oy
                  </p>
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
    </div>
  );
}

export default Favorites;