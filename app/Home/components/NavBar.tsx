"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/Images/Logos/NovarisLogoWhite.png";
import SideBar from "./SideBar";
import { signOut, useSession } from "next-auth/react";

export const NavBar = () => {

  const { data: session } = useSession();

  const [open, setOpen] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <div className="fixed w-full z-10">
        <nav className="bg-violet-800 dark:bg-violet-900 border-b border-violet-200 dark:border-violet-400">
          <div className="min-h-[70px] flex flex-wrap items-center justify-between mx-auto p-2 px-6">

            <div
              className="flex items-center"
            >
              <Link href="/Home" className="flex items-center">
                <Image src={logo} width={40} height={40} alt="Logo" />
                <span className="text-white self-center text-2xl pl-1 font-semibold whitespace-nowrap ">
                  Novaris
                </span>
              </Link>
            </div>

            <ul className="text-white flex flex-row font-medium bg-violet-800 dark:bg-violet-900 space-x-2 dark:border-gray-700 max-sm:hidden z-10">
              <li>
                <a href="/Home" className="block py-2 pl-3 pr-4 rounded hover:text-gray-300" aria-current="page">Home</a>
              </li>
              <li>
                <a href="/Home/About" className="block py-2 pl-3 pr-4 rounded hover:text-gray-300 md:dark:hover:bg-transparent dark:border-gray-700">About</a>
              </li>
              <li>
                <a href="/Home/Contact" className="block py-2 pl-3 pr-4 rounded hover:text-gray-300 md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
              </li>
              <div>
                <li>
                  <button
                    className="flex p-2 rounded-lg"
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Services
                    </span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                </li>

                <div className={`absolute justify-center ml-1 transition bg-violet-800 rounded-lg top-[80px] w-[100px] -z-10
                    ${dropdown ? "translate-y-0" : "-translate-y-44"}`}>
                    <div>
                      <li>
                        <Link
                          href="/Home/Transfer"
                          className="flex rounded-lg py-2 pl-3"
                        >
                          <span className="flex whitespace-nowrap">Transfer</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/Home/Deposit"
                          className="flex rounded-lg pl-3"
                        >
                          <span className="flex whitespace-nowrap">Deposit</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/Home/Buy"
                          className="flex rounded-lg py-2 pl-3"
                        >
                          <span className="flex whitespace-nowrap">Buy</span>
                        </Link>
                      </li>
                    </div>
                    
                </div>
              </div>

              
            </ul>

            {/*User Menu*/}

            <div className="z-50 flex items-center">
                <div className="flex">
                  <button
                    onClick={() => setOpen(!open)}
                    type="button"
                    className="flex  text-sm rounded-full "
                  >
                    <Image
                      src={"https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"}
                      className="w-9 h-10 rounded-full"
                      width={45}
                      height={50}
                      alt="user photo"
                    />
                  </button>
                </div>

                <div
                  className={`absolute border border-gray-200 dark:border-violet-400 top-[70px] right-0 max-sm:hidden m-3 transition-transform text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-violet-900 dark:divide-gray-600 
                   ${open ? "translate-x-0" : "translate-x-52"}`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-xs text-gray-900 dark:text-white">
                      {session?.user.username}
                    </span>
                    <span className="block text-xs  text-gray-500 truncate dark:text-gray-400">
                    {session?.user.email}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/Home"
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Notifications
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Home"
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        onClick={() => signOut()}
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
              </div>
            </div>
                      
          </div>
        </nav>
      </div>

      <div className={`fixed z-20 sm:hidden top-0 right-0 w-[50%] max-xsm:w-[70%] h-full transition duration-500 border-l border-violet-200 dark:border-zinc-800 
          ${open ? 'max-sm:translate-x-0' : 'max-sm:translate-x-[650px]'}`}
        >
          <SideBar close={() => setOpen(false)}/>
      </div>
    </>
  );
};

export default NavBar;
