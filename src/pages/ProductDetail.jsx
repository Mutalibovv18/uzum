import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Mahsulot ma\'lumotlarini yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
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
    }
  };

  const toggleFavorite = () => {
    if (product) {
      const isFavorite = favorites.some(item => item.id === product.id);
      if (isFavorite) {
        dispatch(removeFromFavorites(product.id));
        toast.success('Mahsulot saralangandan olib tashlandi');
      } else {
        dispatch(addToFavorites(product));
        toast.success('Mahsulot saralanganga qo\'shildi');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Mahsulot topilmadi</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="relative">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 p-3 rounded-full bg-white shadow-md"
              >
                {favorites.some(item => item.id === product.id) ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-400 text-xl" />
                )}
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-20 object-cover rounded cursor-pointer"
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <div className="flex items-center mb-4">
              <span className="text-sm text-gray-500">⭐ {product.rating}</span>
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="text-3xl font-bold mb-2">
                {product.price.toLocaleString()} so'm
              </div>
              <div className="text-sm text-gray-500">
                Oyiga {Math.round(product.price / 12).toLocaleString()} so'mdan
              </div>
            </div>

            {product.discountPercentage > 0 && (
              <div className="mb-4">
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                  Chegirma {Math.round(product.discountPercentage)}%
                </span>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-lg w-full"
            >
              Savatga qo'shish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;