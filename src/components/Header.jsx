import React, { useEffect, useState } from "react";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";

const Header = () => {
  const [theme, setTheme] = useState("Light");
  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSwitch = () => {
    setTheme(theme === "Dark" ? "Light" : "Dark");
  };
  return (
    <>
      <div className="flex justify-between mx-10 font-nunito font-normal py-5 dark:text-rose-200">
        <h1>
          <a href="#home">Agastya Joshi</a>
        </h1>
        <div className="flex sm:gap-3 md:gap-6 lg:gap-12 dark:text-rose-200">
          <span>
            <a href="#home">Home</a>
          </span>
          <span>
            <a href="#skills">Skills</a>
          </span>
          <span>
            <a href="#work">Work</a>
          </span>
          <span>
            <a href="#contact">Contact Us</a>
          </span>
          <span>
            <a href="#drop">Drop me a line</a>
          </span>
        </div>
        <button onClick={handleSwitch} className="flex space-x-2">
          {theme === "Dark" ? (
            <img src={moon} className="flex h-5 w-5" alt="" />
          ) : (
            <img src={sun} className="flex h-5 w-5" alt="" />
          )}

          <span className="dark-text text-sm">
            {theme === "Dark" ? "Light" : "Dark"}
          </span>
        </button>
      </div>
    </>
  );
};

export default Header;
