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
  UserPen,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 font-light bg-white shadow-lg fixed w-full z-50">
      <div className="text-2xl font-bold text-green-700">Ohh Dank!!</div>
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
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 border-gray-700 border-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <User />
              <span className="hidden md:inline">{session.user.name}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <UserPen />
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <LogOut />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="border-gray-700 border-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={() => signIn()}
          >
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
