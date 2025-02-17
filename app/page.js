"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./context/cartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { motion } from 'framer-motion';

export default function Home() {
  const [products, setProducts] = useState([]);
  const featuredProductsRef = useRef(null);
  const { addToCart } = useCart();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  useEffect(() => {
    // Fetch data inside useEffect
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=8");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []); // Runs only once on mount
  const scrollToFeaturedProducts = () => {
    featuredProductsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleDealClick = () => {
    // Show success toast
    toast.success("🎉 You got a 50% discount! Shop now!", {
      position: "top-center",
      autoClose: 3000,
    });

    // Navigate to /products
    router.push("/products");
  };
  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter a valid email address!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    toast.success("🎉 Subscribed successfully!", {
      position: "top-center",
      autoClose: 3000,
    });

    // Clear input after subscribing
    setEmail("");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required!", { position: "top-center" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address!", { position: "top-center" });
      return;
    }

    // Show success message
    toast.success("📩 Message sent successfully!", { position: "top-center" });

    // Reset form fields
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <div className="text-center px-4">
      {/* Hero Section */}
      <section className="relative py-20 text-white flex flex-col items-center justify-center">
       {/* Background Image with Dark Overlay */}
       <div className="absolute inset-0">
          <img
            src="https://i.postimg.cc/L57x2qmX/tag-154930-1280.png"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-2xl md:text-4xl font-bold">Discover the Best Deals</h1>
          <p className="mt-2 text-sm md:text-lg">Shop your favorite products at unbeatable prices!</p>
          <button
            onClick={scrollToFeaturedProducts}
            className="mt-4 bg-gradient-to-r from-black via-blue-950 to-black text-white px-6 py-2 rounded-md text-sm md:text-lg"
          >
            Shop Now
          </button>
        </div>
      </section>
{/* Featured Products */}
<section ref={featuredProductsRef} className="py-16">
  <h2 className="text-2xl md:text-4xl font-semibold mb-6">Featured Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {products.map((product) => (
      <motion.div
        key={product.id}
        className="border p-4 rounded-lg shadow-lg bg-white flex flex-col justify-between h-full"
        initial={{ opacity: 0, y: 50 }} // Start from invisible and slightly below
        animate={{ opacity: 1, y: 0 }}  // Animate to fully visible and original position
        transition={{ duration: 0.5, ease: 'easeOut' }} // Animate over 0.5 seconds
      >
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
        <div className="flex gap-2 text-center items-center justify-center">
          <button
            onClick={() => addToCart(product)}
            className="bg-gradient-to-r from-black via-blue-950 to-black text-white px-4 py-2 mt-auto rounded text-sm"
          >
            Add to Cart
          </button>
          <Link href={`/product/${product.id}`}>
            <button className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 mt-2 text-sm">
              View Details
            </button>
          </Link>
        </div>
      </motion.div>
    ))}
  </div>
</section>
{/* Exclusive Discounts Section */}
<section className="relative py-16 text-white">
  {/* Background Image with Dark Overlay */}
  <div className="absolute inset-0">
    <img
      src="https://i.postimg.cc/MHZsMdXZ/pexels-max-fischer-5872357.jpg"
      alt="Discount Offers Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/30"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 text-center">
    <motion.h2
      className="text-2xl md:text-4xl font-semibold"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      🔥 Exclusive Discounts
    </motion.h2>
    <motion.p
      className="mt-2 text-sm md:text-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Up to 50% off on selected items! Limited Time Offer.
    </motion.p>
    <motion.button
      onClick={handleDealClick}
      className="mt-4 bg-white text-gray-500 px-6 py-2 rounded-md font-semibold hover:bg-gray-200 text-sm md:text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      Grab the Deal
    </motion.button>
  </div>
</section>

{/* Customer Reviews Section */}
<section className="py-16">
  <motion.h2
    className="text-2xl md:text-4xl font-semibold mb-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    What Our Customers Say
  </motion.h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[ 
      { name: "Alice", review: "Amazing products and fast delivery!" },
      { name: "Bob", review: "Great customer support and quality items." },
      { name: "Charlie", review: "Highly recommended! Will shop again." }
    ].map((review, index) => (
      <motion.div
        key={index}
        className="bg-white shadow-md rounded-lg p-6 border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
      >
        <p className="text-gray-700">{review.review}</p>
        <h3 className="text-lg font-semibold mt-4">- {review.name}</h3>
      </motion.div>
    ))}
  </div>
</section>

{/* Newsletter Subscription Section */}
<section className="relative py-16 text-white">
  {/* Background Image with Dark Overlay */}
  <div className="absolute inset-0">
    <img
      src="https://i.postimg.cc/rF80v7RY/pexels-n-voitkevich-6214370.jpg"
      alt="Newsletter Subscription Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50 md:bg-black/20"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 text-center">
    <motion.h2
      className="text-2xl md:text-4xl font-semibold"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Stay Updated!
    </motion.h2>
    <motion.p
      className="mt-2 text-sm md:text-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Subscribe to our newsletter for the latest offers.
    </motion.p>
    <div className="mt-4 flex justify-center">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 w-1/2 md:w-1/4 py-2 rounded-l-md text-black text-sm md:text-lg"
      />
      <motion.button
        onClick={handleSubscribe}
        className="bg-gradient-to-r from-black via-blue-950 to-black rounded-md px-6 py-2 rounded-r-m text-sm md:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Subscribe
      </motion.button>
    </div>
  </div>
</section>

{/* Contact Us Section */}
<section className="py-16 text-center">
  <motion.h2
    className="text-2xl md:text-4xl font-semibold"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    Contact Us
  </motion.h2>
  <motion.p
    className="mt-2 text-sm md:text-lg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    Have any questions? Reach out to us anytime.
  </motion.p>

  <form onSubmit={handleSubmit} className="mt-6 max-w-lg mx-auto">
    {/* Name Input */}
    <motion.input
      type="text"
      name="name"
      placeholder="Your Name"
      value={formData.name}
      onChange={handleChange}
      className="w-full px-4 py-2 mb-4 border rounded-md text-sm md:text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />

    {/* Email Input */}
    <motion.input
      type="email"
      name="email"
      placeholder="Your Email"
      value={formData.email}
      onChange={handleChange}
      className="w-full px-4 py-2 mb-4 border rounded-md text-sm md:text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    />

    {/* Message Input */}
    <motion.textarea
      name="message"
      placeholder="Your Message"
      value={formData.message}
      onChange={handleChange}
      rows="4"
      className="w-full px-4 py-2 mb-4 border rounded-md text-sm md:text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4 }}
    ></motion.textarea>

    {/* Submit Button */}
    <motion.button
      type="submit"
      className="w-full bg-gradient-to-r from-black via-blue-950 to-black text-white px-6 py-2 rounded-md text-sm md:text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6 }}
    >
      Send Message
    </motion.button>
  </form>
</section>

    </div>
  );
}
