"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./context/cartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            src="https://i.postimg.cc/sgCF59xj/colorful-shopping-bags.jpg"
            alt="Hero Background"
            objectFit="cover"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold">Discover the Best Deals</h1>
          <p className="mt-2 text-lg">Shop your favorite products at unbeatable prices!</p>
          <button
            onClick={scrollToFeaturedProducts}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Shop Now
          </button>
        </div>
      </section>
      {/* Featured Products */}
      <section ref={featuredProductsRef} className="py-16">
        <h2 className="text-4xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg bg-white flex flex-col justify-between h-full">
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
              <button onClick={() => addToCart(product)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-auto rounded">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
{/* Discount Offers */}
<section className="relative py-16 text-white">
  {/* Background Image with Dark Overlay */}
  <div className="absolute inset-0">
    <img
      src="https://i.postimg.cc/MHZsMdXZ/pexels-max-fischer-5872357.jpg"
      alt="Discount Offers Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 text-center">
    <h2 className="text-4xl font-semibold">🔥 Exclusive Discounts</h2>
    <p className="mt-2">Up to 50% off on selected items! Limited Time Offer.</p>
    <button  onClick={handleDealClick} className="mt-4 bg-white text-gray-500 px-6 py-2 rounded-md font-semibold hover:bg-gray-200">
      Grab the Deal
    </button>
  </div>
</section>
      {/* Customer Reviews */}
      <section className="py-16">
        <h2 className="text-4xl font-semibold mb-6">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "Alice", review: "Amazing products and fast delivery!" },
            { name: "Bob", review: "Great customer support and quality items." },
            { name: "Charlie", review: "Highly recommended! Will shop again." },
          ].map((review, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 border">
              <p className="text-gray-700">{review.review}</p>
              <h3 className="text-lg font-semibold mt-4">- {review.name}</h3>
            </div>
          ))}
        </div>
      </section>
      {/* Newsletter Subscription */}
<section className="relative py-16 text-white">
  {/* Background Image with Dark Overlay */}
  <div className="absolute inset-0">
    <img
      src="https://i.postimg.cc/rF80v7RY/pexels-n-voitkevich-6214370.jpg"
      alt="Newsletter Subscription Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50"></div>
  </div>
  {/* Content */}
  <div className="relative z-10 text-center">
    <h2 className="text-4xl font-semibold">Stay Updated!</h2>
    <p className="mt-2">Subscribe to our newsletter for the latest offers.</p>
    <div className="mt-4 flex justify-center">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded-l-md text-black"
      />
      <button onClick={handleSubscribe} className="bg-blue-500 px-6 py-2 rounded-r-md hover:bg-blue-600">
        Subscribe
      </button>
    </div>
  </div>
</section>
      {/* Contact Us Section */}
      <section className="py-16 text-center">
      <h2 className="text-4xl font-semibold">Contact Us</h2>
      <p className="mt-2">Have any questions? Reach out to us anytime.</p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-lg mx-auto">
        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        {/* Message Input */}
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 mb-4 border rounded-md"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>
    </section>

    </div>
  );
}
