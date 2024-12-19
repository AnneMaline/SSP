"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Authentication from "./Authentication";

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  return (
    <nav
      className="bg-white border border-b-[#DCDCDC] text-white p-4 shadow-md "
      style={{ height: "var(--navbar-height)" }}
    >
      <div className="grid grid-cols-[30px_auto_30px]">
        {/* Logo and title */}
        <Link href="/" aria-label="logo">
          <Image
            src="/images/Equinor_Symbol_Favicon_RED_64x64px.png"
            alt="Logo"
            width={24}
            height={24}
          />
        </Link>
        <Link href="/" aria-label="title">
          <h1 className="text-bold text-black">OSDU Self-service Portal</h1>
        </Link>

        <div className="self-end">
          <button
            onClick={toggleProfileMenu}
            className="focus:outline-none"
            aria-label="profile"
          >
            <Image
              src="/icons/profile.svg"
              alt="Profile Icon"
              width={24}
              height={24}
            />
          </button>
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-fit bg-white border border-gray-300 shadow-lg rounded-md p-4">
              <Authentication />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
