"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  User,
  Home,
  Info,
  ShoppingCart,
  Mail,
  LogOut,
  Edit, // Replacing UserPen with Edit (a valid icon in lucide-react)
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex justify-between items-center p-4 font-light bg-white shadow-lg fixed w-full z-50">
      <motion.div
        className="text-2xl font-bold text-green-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Ohh Dank!!
      </motion.div>
      <nav className="hidden md:flex gap-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition-colors duration-300"
        >
          <Home />
          <span>HOME</span>
        </Link>
        <Link
          href="/about"
          className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition-colors duration-300"
        >
          <Info />
          <span>ABOUT</span>
        </Link>
        <Link
          href="/services"
          className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition-colors duration-300"
        >
          <ShoppingCart />
          <span>PRODUCTS</span>
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition-colors duration-300"
        >
          <Mail />
          <span>CONTACT</span>
        </Link>
      </nav>
      <div className="relative flex items-center gap-4">
        {session ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 border-gray-700 border-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <User />
              <span className="hidden md:inline">
                {session?.user?.name || "User"}
              </span>
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <Edit />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div>
            <button
              className="border-gray-700 border-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              onClick={() => signIn()}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
