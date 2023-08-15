import React from "react";
import profile from "../assets/profile.png";
import Header from "./Header";
import { Typewriter, handleDone, handleType } from "react-simple-typewriter";

const Home = () => {
  return (
    <>
      <div className="h-screen">
        <div className="h-1/2 lg:h-screen bg-gradient-to-t from-black relative max-h-full">
          <Header />

          <div className="text-7xl leading-[11rem] absolute bottom-20">
            <span className="text-white pr-60">
              <Typewriter
                words={["Developer", "Coder", "React", "Javascript", "Nodejs"]}
                loop={5}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </div>
          <img
            src={profile}
            className="rounded-full p-4 absolute top-40 right-80 w-60"
            alt=""
          />
          <div className="hidden lg:block absolute h-full w-1/2 right-20 bottom-20 bg-gradient-to-b from-black rounded-full -z-10"></div>
        </div>
      </div>
      {/* WHAT TO I KNOW PAGE */}
      <div>
        <div className="flex flex-col">
          <h1 className="text-indigo-600 text-normal font-bold w-fit m-auto">
            Services
          </h1>
          <h3 className="text-normal w-fit m-auto">What Do I Know?</h3>
        </div>
      </div>
    </>
  );
};
export default Home;
