import Header from "./Header";
import profile from "../assets/profile.png";
import { Typewriter } from "react-simple-typewriter";
import "../styles/Home.css";
import landfall from "../assets/landfall.png";
import SkillCard from "./SkillCard";
import react from "../assets/react.png";
import cplus from "../assets/cplus.png";
import css from "../assets/css.png";
import html from "../assets/html.png";
import javascript from "../assets/javascript.png";
import nodejs from "../assets/nodejs.png";
import mongodb from "../assets/mongodb.png";
import linux from "../assets/linux.png";
import java from "../assets/java.png";
import mountains from "../assets/mountains.png";

const Home = () => {
  return (
    <>
      {/* HomePage of portfolio*/}

      <div className=" h-screen  bg-rose-200 dark:bg-black font-nunito max-h-full relative max-w-screen">
        <Header />
        <div className="mx-10">
          <div className="text-justsmall leading-small mr-5  text-black dark:text-rose-200 md:leading-5 absolute bottom-9 md:text-2xl lg:text-7xl lg:leading-12">
            <span>Website</span> Developer
          </div>

          <img
            src={profile}
            alt="profile"
            className="h-40 w-40 border-4 border-black rounded-full dark:border-rose-200 mx-5 hover:scale-125"
          />
          <div className="right-10 text-small sm:text-normal md:bottom-0 md:top-60 absolute left-0 mx-10 text-black dark:text-rose-200">
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
          <p className="bottom-60 h-20 w-80 absolute md:right-6 sm:bottom-64 lg:right-32 lg:bottom:28 text-black dark:text-rose-200 hover:after:url(https://w.wallhaven.cc/full/3k/wallhaven-3kmwj9.jpg)">
            Specializing in Web Development as a fresher, I have honed a diverse
            skill set encompassing React, Node.js, JavaScript, and a variety of
            other UI libraries.
          </p>
        </div>
      </div>
      {/* Skills Page of portfolio*/}
      <div className="flex flex-col dark:bg-black">
        <div className="h-72 md:h-screen max-w-screen flex justify-center mx-10">
          <img src={mountains} alt="" />
        </div>

        <div id="skills">
          <div className="h-fit max-w-screen grid grid-cols-3 grid-rows-4 align-bottom gap-x-10 gap-y-10 mx-10 my-10">
            <div className=" font-semibold col-span-3 bg-transparent my-auto mx-auto text-xl dark:text-rose-400">
              My Skills
            </div>
            <SkillCard name="React" file={react} />
            <SkillCard name="Javascript" file={javascript} />
            <SkillCard name="Nodejs" file={nodejs} />
            <SkillCard name="HTML" file={html} />
            <SkillCard name="CSS" file={css} />
            <SkillCard name="Linux" file={linux} />
            <SkillCard name="MongoDB" file={mongodb} />
            <SkillCard name="C++" file={cplus} />
            <SkillCard name="Java" file={java} />{" "}
          </div>
        </div>
        <div className="max-w-screen mx-10 object-cover">
          <img src={landfall} alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
