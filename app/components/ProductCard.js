"use client";
import Image from "next/image";
import { useCart } from "../context/cartContext"; // Import cart context

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Get addToCart function from context

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white flex flex-col justify-between h-full">
      <Image
        src={product.image}
        alt={product.title || "Product image"}
        width={200}
        height={200}
        className="mx-auto w-full h-[150px] object-contain"
      />
      <div className="flex flex-col flex-grow">
        <h2 className="font-semibold mt-2">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
      </div>
      <button
        onClick={() => addToCart(product)} // Add product to cart on click
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-auto rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
