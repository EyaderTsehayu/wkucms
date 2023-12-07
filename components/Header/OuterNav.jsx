"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const OuterNav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white p-4 lg:pl-12 lg:pr-48 pr-8 w-full items-center">
      {/* Logo on the left */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/images/logo/logo.png"
            alt="Logo"
            width={60}
            height={40}
          />
          <h2 className="text-primary text-xl font-extrabold pl-4 ">WKUCMS</h2>
        </div>

        {/* Links on the right */}
        <div className=" hidden lg:block">
          <div className="flex gap-10 items-center">
            <Link
              href="/"
              className="font-bold text-lg text-black  hover:text-primary flex "
            >
              Home
            </Link>
            <Link
              href="/about"
              className="font-bold text-lg text-black hover:text-primary flex"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="font-bold text-lg text-black hover:text-primary flex"
            >
              Contact Us
            </Link>
            <Link
              href="/signIn"
              className="rounded-lg justify-center bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-95"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-black focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      {/* <div className="lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-black focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div> */}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border shadow-lg rounded-lg p-4 mt-2 border-primary">
          <a
            href="/"
            className="font-bold text-lg block py-2 text-black hover:text-primary "
          >
            Home
          </a>
          <a
            href="/contact"
            className="font-bold text-lg block py-2 text-black hover:text-primary"
          >
            Contact Us
          </a>
          <a
            href="/about"
            className="font-bold text-lg block py-2 text-black  hover:text-primary"
          >
            About
          </a>
        </div>
      )}
    </nav>
  );
};

export default OuterNav;
