import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-blue-950 to-black text-white py-8">
      <div className="container mx-auto flex flex-col items-center text-center px-4 md:flex-row md:justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src="https://i.postimg.cc/JzxT3CCN/shopping-bag.png" alt="Logo" className="w-12 h-12 object-cover" />
          <h2 className="text-xl font-semibold">E-Commerce Store</h2>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-500"><FaFacebook size={24} /></a>
          <a href="#" className="hover:text-blue-400"><FaTwitter size={24} /></a>
          <a href="#" className="hover:text-pink-500"><FaInstagram size={24} /></a>
          <a href="#" className="hover:text-blue-600"><FaLinkedin size={24} /></a>
        </div>

        {/* Contact Info */}
        <div className="mt-4 md:mt-0">
          <p className="flex items-center gap-2"><FaPhoneAlt /> +123 456 7890</p>
          <p className="flex items-center gap-2 mt-2"><FaEnvelope /> contact@ecommerce.com</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} E-Commerce Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
