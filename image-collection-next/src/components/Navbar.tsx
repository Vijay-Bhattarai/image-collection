"use client"
import Link from "next/link";
import { useEffect, useState } from "react";


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        window.location.replace("/login");
      };
      
      useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set isLoggedIn based on whether token exists
      }, []);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-lg font-bold">
              My App
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              <Link  href="/" className="text-white text-lg font-bold" >Home</Link>
              <Link href="/bookmarks" className="text-white text-lg font-bold">Bookmark</Link>
              {!isLoggedIn && (
                <>
              <Link href="/login" className="text-white text-lg font-bold">Login</Link>
              <Link href="/register" className="text-white text-lg font-bold">Register</Link>
              </>
            )}
              {isLoggedIn && (
                <button onClick={handleLogout} className="text-white text-lg font-bold cursor-pointer">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};



export default Navbar;
