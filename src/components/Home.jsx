import Header from "./Header";
import profile from "../assets/profile.png";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  return (
    <>
      {/* HomePage of portfolio*/}

      <div className=" h-screen  bg-rose-200 dark:bg-black font-nunito max-h-full relative">
        <Header />
        <div className="mx-10">
          <div className="text-justsmall  text-black dark:text-rose-200 leading-5 absolute bottom-9 md:text-2xl lg:text-7xl lg:leading-12">
            <span>Website</span> Developer
          </div>

          <img
            src={profile}
            alt="profile"
            className="h-40 w-40 border-4 border-black rounded-full dark:border-rose-200 mx-5"
          />
          <div className="absolute left-0 text-justsmall mx-10 text-black dark:text-rose-200">
            <Typewriter
              words={[
                "Passionate",
                "Amazing",
                "Exciting",
                "Thrilling",
                "Enthusiastic",
                "Breathtaking",
                "Captivating",
                "Energetic",
                "Fascinating",
                "Incredible",
                "Spectacular",
                "Exhilarating",
                "Dynamic",
                "Stunning",
                "Unbelievable",
                "Impressive",
                "Mesmerizing",
                "Wonderful",
                "Electrifying",
                "Astounding",
              ]}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={10}
              delaySpeed={1000}
            />
          </div>
          <p className="h-20 w-80 absolute md:right-6 md:bottom-64 lg:right-32 lg:bottom:36 text-black dark:text-rose-200">
            Specializing in Web Development as a fresher, I have honed a diverse
            skill set encompassing React, Node.js, JavaScript, and a variety of
            other UI libraries.
          </p>
        </div>
      </div>
      {/* Skills Page of portfolio*/}
      <div className="bg-rose-200 h-screen dark:bg-black pt-12 border-t-8 border-black">
        <span className="text-xl flex justify-center">My Skills</span>
        <div className="grid grid-cols-2">
          <div>hello world</div>
          <div>bye world</div>
        </div>
      </div>
    </>
  );
};

export default Home;
