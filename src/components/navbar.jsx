import React, { useRef, useState } from "react";
import {
  HiMenu,
  HiX,
  HiSearch,
  HiUserCircle,
  HiCollection,
  HiHeart,
  HiChat,
  HiPhone,
  HiKey,
  HiShoppingCart,
} from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import SearchResults from "./SearchResults";
import { Link } from "react-router-dom";
import { navbuttonData } from "../mockData/navButtons";
import NavButton from "./navBarComponents/NavButton";

function Navbar() {
  const navRef = useRef();
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAccountToggle = () => {
    setIsAccountOpen(!isAccountOpen);
    setIsHelpOpen(false);
  };
  const handleHelpToggle = () => {
    setIsHelpOpen(!isHelpOpen);
    setIsAccountOpen(false);
  };

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    value ? setIsSearchActive(true) : setIsSearchActive(false);
  };

  const handleBlur = () => {
    setIsSearchActive(false);
  };

  return (
    <header className="sticky top-0 left-0 flex items-center justify-between px-3 pt-4 py-2 z-10 bg-white text-black md:px-[2.5%] lg:pt-2 lg:px-[4%]">
      {isMobile && (
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center justify-between w-full">
            <button
              className="visible flex opacity-100 cursor-pointer bg-transparent border-none outline-none text-black text-3xl lg:hidden"
              onClick={handleMenuToggle}
            >
              <HiMenu />
            </button>
            <Link to="/">
              <button className="text-2xl lg:mr-10 uppercase">jumia</button>
            </Link>
          </div>
          <div className="lg:relative w-full lg:w-[400px]">
            <div className="relative">
              <input
                type="text"
                className="py-2 px-3 w-full text-sm bg-transparent border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
                placeholder="Search for products"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <HiSearch className="absolute top-3 right-3 text-lg text-gray-500" />
            </div>
            {isSearchActive && <SearchResults />}
          </div>
          <nav
            className={`fixed top-0 left-0 h-screen w-[80%] pt-20 flex flex-col z-20 gap-6 bg-white transition duration-200 transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            ref={navRef}
          >
            <button
              className="visible flex opacity-100 cursor-pointer bg-transparent border-none outline-none text-black text-3xl lg:hidden absolute top-3 left-2"
              onClick={handleMenuToggle}
            >
              <HiX className="absolute text-gray-500 top-[0.2rem] left-1" />
            </button>

            <div className="relative text-black">
              <NavButton
                handleMenuToggle={handleMenuToggle}
                {...navbuttonData[0]}
              />
              <div
                className={`bg-white z-1 gap-3  flex justify-center flex-col text-gray-500`}
              >
                <Link
                  onClick={handleMenuToggle}
                  to="/account/"
                  className=" mx-4 flex items-center gap-1"
                >
                  {" "}
                  <HiUserCircle />
                  My Account
                </Link>
                <Link
                  onClick={handleMenuToggle}
                  to="/orders/"
                  className=" mx-4 flex items-center gap-1"
                >
                  <HiCollection />
                  Orders
                </Link>
                <Link
                  onClick={handleMenuToggle}
                  to="/saved/"
                  className=" mx-4  flex items-center gap-1"
                >
                  <HiHeart /> Saved Items
                </Link>
                <Link
                  onClick={handleMenuToggle}
                  to="/signin/"
                  className=" mx-4  flex items-center gap-1"
                >
                  <HiKey /> Sign In
                </Link>
                <Link
                  onClick={handleMenuToggle}
                  to="/cart/"
                  className=" mx-4  flex items-center gap-1"
                >
                  <HiShoppingCart /> Cart
                </Link>
              </div>
            </div>
            <div className="relative text-black">
              <NavButton
                handleMenuToggle={handleMenuToggle}
                {...navbuttonData[1]}
              />
              <div
                className={`bg-white z-1 gap-3  flex justify-center flex-col text-gray-500`}
              >
                <Link
                  onClick={handleMenuToggle}
                  to="/chat/"
                  className="mx-4  flex items-center gap-1"
                >
                  <HiChat /> FAQ
                </Link>
                <Link
                  onClick={handleMenuToggle}
                  to="/contact/"
                  className=" mx-4  flex items-center gap-1"
                >
                  <HiPhone /> Contact Us
                </Link>
              </div>
            </div>
            {/* <div className="relative text-black">
              <NavButton
                handleMenuToggle={handleMenuToggle}
                {...navbuttonData[2]}
              />
            </div> */}
          </nav>
          {isMenuOpen && (
            <div
              className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-10"
              onClick={handleMenuToggle}
            ></div>
          )}
        </div>
      )}

      {!isMobile && (
        <>
          <div className="flex gap-10 items-center">
            <Link to="/">
              <button className="text-2xl uppercase">jumia</button>
            </Link>
            <div className="relative text-black">
              <NavButton
                handleMenuToggle={handleAccountToggle}
                {...navbuttonData[0]}
              />
              <div
                className={`dropdown-menu bg-white z-1 rounded-b-md overflow-hidden transition-height duration-300 ease-out flex justify-center flex-col absolute top-full left-0 shadow-lg ${
                  isAccountOpen ? "h-auto" : "h-0"
                }`}
              >
                <Link to="/account/" className="py-2 px-5 hover:bg-red-200 whitespace-nowrap">
                  My Account
                </Link>
                <Link to="/orders/" className="py-2 px-5 hover:bg-red-200">
                  Orders
                </Link>
                <Link to="/saved/" className="py-2 px-5 hover:bg-red-200  whitespace-nowrap">
                  Saved Items
                </Link>
                <Link to="/signin/" className="py-2 px-5 hover:bg-red-200">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="relative text-black">
              <NavButton
                handleMenuToggle={handleHelpToggle}
                {...navbuttonData[1]}
              />
              <div
                className={`dropdown-menu bg-white z-1 rounded-b-md overflow-hidden transition-height duration-300 ease-out flex justify-center flex-col absolute top-full left-0 shadow-lg ${
                  isHelpOpen ? "h-auto" : "h-0"
                }`}
              >
                <Link to="/chat/" className="py-2 px-5 whitespace-nowrap hover:bg-red-200">FAQ</Link>
                <Link to="/contact/" className="py-2 px-5 whitespace-nowrap hover:bg-red-200">Contact Us</Link>
              </div>
            </div>
            <div className="relative  text-black">
              <NavButton
                handleMenuToggle={handleMenuToggle}
                {...navbuttonData[2]}
              />
            </div>
          </div>
          <div className="relative w-full lg:w-[400px]">
            <div className="relative">
              <input
                type="text"
                className="py-2 px-3 w-full text-sm bg-transparent border border-gray-300 rounded-full focus:outline-none focus:ring-2  focus:ring-red-300 focus:border-transparent"
                placeholder="Search for products"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <HiSearch className="absolute top-3 right-3 text-lg text-gray-500" />
            </div>
            {isSearchActive && <SearchResults />}
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
