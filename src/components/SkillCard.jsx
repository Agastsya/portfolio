import React from "react";

const skillcard = ({ name, file }) => {
  return (
    <>
      <div className="box bg-transparent mx-auto dark:text-rose-400 hover:scale-125">
        <h1 className="flex justify-center font-semibold">{name}</h1>
        <img src={file} className="w-28" alt="" />
      </div>
    </>
  );
};

export default skillcard;
