"use client";

import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { Icon } from "@iconify/react";

const categories = [
  { name: "All Products", icon: "mdi:cart", color: "text-purple-500" },
  { name: "electronics", icon: "mdi:laptop", color: "text-green-500" },
  { name: "men's clothing", icon: "mdi:tshirt-crew-outline", color: "text-blue-500" },
  { name: "jewelery", icon: "mdi:ring", color: "text-yellow-500" },
  { name: "women's clothing", icon: "mdi:hanger", color: "text-pink-500" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data); // Show all products by default
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products when a category is selected
  useEffect(() => {
    if (selectedCategory === "All Products") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  return (
    <div className="container mx-auto p-4">
      {/* Categories Section */}
      <section className="py-5 bg-white">
        <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-center">Shop by Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`bg-white shadow-md rounded-lg p-6 text-center border cursor-pointer hover:shadow-xl transition ${
                selectedCategory === category.name ? "bg-blue-200" : ""
              }`}
            >
              <Icon icon={category.icon} className={`text-4xl mb-4 ${category.color}`} />
              <h3 className="text-lg md:text-xl font-semibold capitalize">{category.name}</h3>
              <p className="text-gray-600 text-sm md:text-lg">Explore the latest {category.name.toLowerCase()} items</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="mt-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
          {selectedCategory} {selectedCategory !== "All Products" ? "Products" : ""}
        </h2>
        <ProductList products={filteredProducts} />
      </section>
    </div>
  );
}
