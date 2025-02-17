"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/cartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white flex flex-col justify-between h-full">
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
        <button
          onClick={() => addToCart(product)}
          className="bg-gradient-to-r from-black via-blue-950 to-black text-white px-4 py-2 rounded text-sm"
        >
          Add to Cart
        </button>
        <Link href={`/product/${product.id}`}>
          <button className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 text-sm">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
