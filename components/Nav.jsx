"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";

const Nav = () => {
  const isUserLoggedIn = true; // is User logged in/out=true/false

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggledropdown] = useState(false); //for mobile dropdown menu

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* Logo Section */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation Section */}
      <div className="sm:flex hidden">
        {/* if User logged in Section */}
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-propmt" className="black_btn">
              Create Post
            </Link>
            {/* Signout Button */}
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            {/* Dynamic User Profile Image Section */}
            <Link href="/profile">
              <Image
                src="/assets/images/profile.svg"
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          // Else the user is not logged in/Sign Out
          <>
            {providers &&
              object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation Section */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            {/* User Profile Image Section */}
            <Image
              src="/assets/images/profile.svg"
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggledropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link 
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggledropdown(false)}
                  >
                    My Profile
                </Link>
                <Link 
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggledropdown(false)}
                  >
                    Create Prompt
                </Link>
                <button 
                type="button"
                onClick={() => {
                  setToggledropdown(false);
                  signOut();
                }}
                className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
