"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/cartContext";
import { motion } from "framer-motion"; // Import Framer Motion

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="border p-4 rounded-lg shadow-lg bg-white flex flex-col justify-between h-full"
      initial={{ opacity: 0, scale: 0.9 }} // Start faded out and slightly smaller
      animate={{ opacity: 1, scale: 1 }} // Animate to full size
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }} // Lift effect on hover
    >
      <Image
        src={product.image}
        alt={product.title || "Product image"}
        width={200}
        height={200}
        className="mx-auto w-full h-[150px] object-contain"
      />
      <div className="flex flex-col flex-grow text-center">
        <h2 className="font-semibold mt-2">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
      </div>
      <div className="flex gap-2 mt-auto items-center justify-center">
        <motion.button
          onClick={() => addToCart(product)}
          className="bg-gradient-to-r from-black via-blue-950 to-black text-white px-4 py-2 rounded text-sm"
          whileHover={{ scale: 1.1 }} // Button scales up on hover
          whileTap={{ scale: 0.9 }} // Button shrinks slightly when clicked
        >
          Add to Cart
        </motion.button>
        <Link href={`/product/${product.id}`}>
          <motion.button
            className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 text-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
