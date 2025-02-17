"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/app/context/cartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
// Adjust import if necessary

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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="mx-auto w-full h-[400px] object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold mt-4 text-blue-600">${product.price}</p>
          <p className="font-semibold mt-4">{product.category}</p>
          <p className="font-semibold mt-4">{product.rating.rate} ⭐ ({product.rating.count} reviews)</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-gradient-to-r from-black via-blue-950 to-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            <ShoppingCartIcon  className="w-10 h-5 ml-1 hover:text-pink-500"></ShoppingCartIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
