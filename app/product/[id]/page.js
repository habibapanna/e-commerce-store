"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/app/context/cartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from URL
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="mx-auto w-full h-[400px] object-contain"
          />
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center md:text-left"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold mt-4 text-blue-600">${product.price}</p>
          <p className="font-semibold mt-4">{product.category}</p>
          <p className="font-semibold mt-4">{product.rating.rate} ⭐ ({product.rating.count} reviews)</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="mt-4 bg-gradient-to-r from-black via-blue-950 to-black text-white px-6 py-2 rounded flex items-center text-center mx-auto justify-center space-x-2 md:mx-0"
          >
            <ShoppingCartIcon className="w-6 h-6 text-white" />
            <span>Add to Cart</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
