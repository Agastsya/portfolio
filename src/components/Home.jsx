import React from "react";

const Home = () => {
  return (
    <div className="h-screen w-screen">
      <div className="h-1/2 lg:h-screen bg-gradient-to-t from-indigo-200">
        <nav className="w-full fixed top-0 bg-white">
          <div className="container py-5 flex justify-between">
            <div className="flex items-center gap-2">
              <span>Portfolio</span>
            </div>
            <span>HELLO</span>
            <span>world</span>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Home;
