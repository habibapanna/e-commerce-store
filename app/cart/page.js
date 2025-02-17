"use client";

import { useState } from "react";
import { useCart } from "../context/cartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [purchasedItems, setPurchasedItems] = useState([]); // Track purchased items as an array
  // Handle Buy button click
  const handleBuy = (item) => {
    if (!purchasedItems.includes(item.id)) {
      // Mark the item as purchased
      setPurchasedItems((prev) => [...prev, item.id]);

      // Show the toast
      toast.success(`Successfully purchased ${item.title}! 🎉`);
    }
  };
  // Handle Remove button click
  const handleRemove = (id, title) => {
    removeFromCart(id);
    toast.success(`Removed ${title} from cart! 🗑️`);
    setPurchasedItems((prev) => prev.filter((itemId) => itemId !== id)); // Allow re-purchase if item is added back
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center font-bold mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div>
            <p className="text-gray-600 text-center">Your cart is empty.</p>
            <img className="w-[200px] mt-5 mx-auto rounded-full h-[200px] object-cover" src="https://i.postimg.cc/pXWjLVmV/shopping-venture-1026501-1280.jpg">
            </img>
        </div>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li
              key={`${item.id}-${index}`} // Composite key to avoid duplicate key error
              className="border p-4 rounded flex flex-col md:flex-row items-center justify-between bg-white shadow"
            >
              {/* Product Image */}
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                className="w-16 h-16 object-contain mr-4"
              />

              {/* Product Details */}
              <div className="flex-1">
                <span className="text-lg font-medium">{item.title}</span>
                <p className="text-gray-600">${item.price}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* Buy Button */}
                <button
                  onClick={() => handleBuy(item)}
                  disabled={purchasedItems.includes(item.id)} // Disable after purchase
                  className={`px-3 py-1 rounded flex items-center gap-1 transition ${
                    purchasedItems.includes(item.id)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-black via-blue-950 to-black text-white"
                  }`}
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  {purchasedItems.includes(item.id) ? "Purchased" : "Purchase"}
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id, item.title)}
                  className="text-red-500 p-2 rounded hover:text-red-600 transition"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
