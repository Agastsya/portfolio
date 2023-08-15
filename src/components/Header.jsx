import React, { useEffect } from "react";
import mainlogo from "../assets/squarylines.svg";
import moon from "../assets/moon.svg";

const Header = () => {
  useEffect(() => {
    const hamburger = document.querySelector("#hamburger");
    const menu = document.querySelector("#menu");
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  });

  return (
    <>
      <nav className="bg-transparent flex justify-between max-w-full">
        <div className="flex justify-start items-center  mx-10 py-5 ">
          <span>
            <img src={mainlogo} alt="mainlogo" className="h-14 w-14 " />
          </span>
          <span className="text-2xl font-bold text-indigo-900 ">Portfolio</span>
        </div>
        <ul className="hidden md:flex space-x-10 my-auto mx-auto  items-center">
          <li>
            <a href="#1" className=" hover:text-gray-500">
              Home
            </a>
          </li>
          <li>
            <a href="#1" className=" hover:text-gray-500">
              My Work
            </a>
          </li>
          <li>
            <a href="#1" className=" text-white hover:text-gray-500">
              About Me
            </a>
          </li>
          <li>
            <a href="#1" className="text-white hover:text-gray-500 ">
              Contact Me
            </a>
          </li>{" "}
        </ul>
        <img
          src={moon}
          alt="moon"
          className=" hidden md:block h-7 w-7 my-auto mx-10"
        />

        <ul
          id="hamburger"
          className="my-auto md:hidden space-y-1 z-20 bg-white p-2 rounded-xl"
        >
          <li className="w-6 h-0.5 bg-black"></li>
          <li className="w-6 h-0.5 bg-black"></li>
          <li className="w-6 h-0.5 bg-black"></li>
        </ul>
        <ul
          id="menu"
          className="md:hidden bg-indigo-400 text-white absolute h-full w-60 pl-10 py-10 flex-row-reverse "
        >
          <li className="py-10">
            <a href="#1">Home</a>
          </li>
          <li className="py-10">
            <a href="#1">My Work</a>
          </li>
          <li className="py-10">
            <a href="#1">About Me</a>
          </li>
          <li className="py-10">
            <a href="#1">Contact Me</a>
          </li>{" "}
        </ul>
      </nav>
    </>
  );
};

export default Header;
