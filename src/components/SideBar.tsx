import useSideBarHook from "@/hooks/useSideBarHook";
import {
  BanknotesIcon,
  HomeModernIcon,
  InboxStackIcon,
  TicketIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface CustomNavButtonProps {
  children: ReactNode;
  title: string;
  href?: string;
}

const CustomNavButton = ({ children, title, href }: CustomNavButtonProps) => {
  return (
    <li>
      <a
        href={href}
        className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {children}
        <span className="ml-3">{title}</span>
      </a>
    </li>
  );
};

const SideBar = () => {
  const { isOpen, toggleOpen } = useSideBarHook();
  const sideBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let clickHandler = (e: any) => {
      if (!sideBarRef.current?.contains(e.target)) {
        toggleOpen(false);
      }
    };

    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  });

  return (
    <aside
      ref={sideBarRef}
      className={`fixed top-0 left-0 z-40 w-52 h-screen pt-14 transition-transform  ${
        !isOpen && "-translate-x-full"
      } md:translate-x-0 bg-white border-r    dark:bg-gray-800 dark:border-gray-700 `}
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <ul className="space-y-2">
          <CustomNavButton title="Settlement" href="/">
            <BanknotesIcon className="h-6 w-6 " />
          </CustomNavButton>
          {/* <CustomNavButton title="Old Settlements" href="/settlements">
            <BanknotesIcon className="h-6 w-6 " />
          </CustomNavButton> */}

          <CustomNavButton title="Merchants" href="/merchants">
            <HomeModernIcon className="h-6 w-6 " />
          </CustomNavButton>

          <CustomNavButton title="Routes" href="/routes">
            <TicketIcon className="h-6 w-6" />
          </CustomNavButton>
        </ul>
      </div>
      {/* sidebar footer */}
      <div className=" absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
        <button className=" flex justify-start  items-center w-full text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">
          <a
            data-tooltip-target="tooltip-settings"
            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <div>Settings</div>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
