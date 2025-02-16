"use client"; // Required for using hooks in Next.js App Router
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const pathname = usePathname(); // Get the current route
  const { getCartItemCount } = useCart();

  return (
    <nav className="bg-black text-white p-4 flex flex-col md:flex-row justify-between items-center sticky z-50 top-0">
      <div className="flex items-center gap-2">
        <img
          src="https://i.postimg.cc/JzxT3CCN/shopping-bag.png"
          alt="E-Commerce Logo"
          className="w-8 h-8"
        />
        <h1 className="text-xl font-bold">E-Commerce Store</h1>
      </div>
      <div className="flex gap-4">
        <Link
          href="/"
          className={`hover:text-blue-400 ${
            pathname === "/" ? "text-blue-400 font-semibold" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={`hover:text-blue-400 ${
            pathname === "/products" ? "text-blue-400 font-semibold" : ""
          }`}
        >
          Products
        </Link>
        <Link
          href="/cart"
          className={`hover:text-blue-400 flex items-center ${
            pathname === "/cart" ? "text-blue-400 font-semibold" : ""
          }`}
        >
          <ShoppingCartIcon className="w-5 h-5 ml-1 hover:text-blue-400" />
          <span>{getCartItemCount()}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
