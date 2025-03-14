import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

function Cart() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Savatingiz bo'sh</h2>
          <p className="text-gray-600 mb-4">Mahsulotlarni savatga qo'shing</p>
          <Link to="/" className="btn btn-primary">
            Xarid qilishni davom ettirish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Savat</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-lg font-bold mt-2">
                    {(item.price * item.quantity).toLocaleString()} so'm
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                  <div className="flex items-center gap-2 border rounded-lg p-1">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Buyurtma ma'lumotlari</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Mahsulotlar ({items.length})</span>
                <span>{total.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between">
                <span>Yetkazib berish</span>
                <span>Bepul</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold">
                  <span>Jami</span>
                  <span>{total.toLocaleString()} so'm</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Oyiga {Math.round(total / 12).toLocaleString()} so'mdan
                </div>
              </div>
            </div>

            <button className="btn btn-primary w-full mt-6">
              Rasmiylashtirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;