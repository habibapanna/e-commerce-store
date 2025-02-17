"use client"; // Required for using hooks in Next.js App Router
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const pathname = usePathname(); // Get the current route
  const { getCartItemCount } = useCart();

  return (
    <nav className="bg-gradient-to-r from-black via-blue-950 to-black text-white p-4 flex flex-col md:flex-row justify-between items-center sticky z-50 top-0">
      <div className="flex items-center gap-2">
        <img
          src="https://i.postimg.cc/JzxT3CCN/shopping-bag.png"
          alt="E-Commerce Logo"
          className="w-6 h-6 md:w-8 md:h-8"
        />
        <h1 className="text-lg md:text-xl font-bold">E-Commerce Store</h1>
      </div>
      <div className="flex gap-4">
        <Link
          href="/"
          className={`text-sm md:text-lg hover:text-yellow-400 ${
            pathname === "/" ? "text-yellow-400" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={`text-sm md:text-lg hover:text-yellow-400 ${
            pathname === "/products" ? "text-yellow-400" : ""
          }`}
        >
          Products
        </Link>
        <Link
          href="/cart"
          className={`hover:text-pink-500 flex items-center ${
            pathname === "/cart" ? "text-pink-500" : ""
          }`}
        >
          <ShoppingCartIcon className="w-5 h-5 ml-1 hover:text-pink-500" />
          <span>{getCartItemCount()}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
