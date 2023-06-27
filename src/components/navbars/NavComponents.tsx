"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const UserButton = () => {
  const { data: session } = useSession();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef2 = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let clickHandler = (e: any) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  });

  return (
    <div className=" relative ">
      <button
        ref={dropdownRef2}
        type="button"
        className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 "
        aria-expanded="false"
        data-dropdown-toggle="dropdown"
        onClick={() => setOpenDropdown((prev) => !prev)}
      >
        <span className="sr-only">Open user menu</span>
        <Image
          className="w-9 h-9 rounded-full"
          src="https://res.cloudinary.com/jondexter/image/upload/v1686663209/149071_h1ybbf.png"
          alt="user photo"
          height={150}
          width={150}
        />
      </button>
      {openDropdown && (
        <div
          ref={dropdownRef}
          className="absolute  right-0 z-50 my-4 w-56 text-base list-none bg-white  divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
        >
          <div className="py-3 px-4">
            <span className="block text-sm font-semibold text-gray-900 dark:text-white">
              {session?.user.firstName}
            </span>
            <span className="block text-sm text-gray-900 truncate dark:text-white">
              {session?.user.email}
            </span>
          </div>
          <ul
            className="py-1 text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdown"
          >
            <li>
              <a className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                Settings
              </a>
            </li>
          </ul>

          <ul
            className="py-1 text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdown"
          >
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="block text-left py-2 px-4 text-sm w-full font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out{" "}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex items-center  rounded-lg  ">
      <button onClick={toggleDarkMode} className="p-0.5">
        {isDarkMode ? (
          <SunIcon className="h-6 w-6 text-white" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-800" />
        )}
      </button>
    </div>
  );
};

export { UserButton, DarkModeToggle };
