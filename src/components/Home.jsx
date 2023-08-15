import Header from "./Header";
import profile from "../assets/profile.png";

const Home = () => {
  return (
    <>
      <div className=" h-screen  bg-rose-200 dark:bg-black font-nunito max-h-full relative">
        <Header />
        <div className="mx-10">
          <h1 className="text-7xl text-black dark:text-rose-200 leading-12 absolute bottom-9">
            Website Developer
          </h1>
          <img
            src={profile}
            alt="profile"
            className="h-40 w-40 border-4 border-black rounded-full dark:border-rose-200"
          />
          <p className="h-20 w-80 absolute right-24 bottom-16  text-black dark:text-rose-200">
            Specializing in Web Development as a fresher, I have honed a diverse
            skill set encompassing React, Node.js, JavaScript, and a variety of
            other UI libraries.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
