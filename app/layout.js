import "../app/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/cartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

export const metadata = {
  title: "E-Commerce Store",
  description: "A Next.js-powered online store",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white">
        <CartProvider> {/* Wrap with CartProvider */}
          <Navbar />
          <main className="container mx-auto p-4 flex-grow">{children}</main>
          <Footer />
        </CartProvider>
        
        {/* Toast Notification */}
        <ToastContainer position="top-right" autoClose={2000} />
      </body>
    </html>
  );
}
