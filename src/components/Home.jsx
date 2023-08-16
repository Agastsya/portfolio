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
import cryptocrash from "../assets/cryptocrash.png";
import thelysian from "../assets/thelysian.png";
import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";
import download from "../assets/download.png";
import { NavLink } from "react-router-dom";

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

          <div className="absolute right-24 bottom-32">
            <NavLink
              to={"https://github.com/agastsya"}
              className="text-black dark:text-rose-200"
            >
              <img src={github} className="w-14" alt="" />
              <h1 className="text-small text-center">Github</h1>
            </NavLink>
          </div>

          <div className="absolute right-44 bottom-32">
            <NavLink
              to={"https://www.linkedin.com/in/agastsya-joshi-b6a929202/"}
              className="text-black dark:text-rose-200"
            >
              <img src={linkedin} className="w-14" alt="" />
              <h1 className="text-small text-center">Linkedin</h1>
            </NavLink>
          </div>

          <div className="absolute right-64 bottom-32">
            <NavLink
              to={"https://www.linkedin.com/in/agastsya-joshi-b6a929202/"}
              className="text-black dark:text-rose-200"
            >
              <img src={download} className="w-14" alt="" />
              <h1 className="text-small text-center">Resume</h1>
            </NavLink>
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
      <div className="flex flex-col dark:bg-black font-nunito">
        <div className="h-72 md:h-screen max-w-screen flex justify-center mx-10">
          <img src={mountains} alt="" />
        </div>

        <div id="skills">
          <div className="text-black dark:text-rose-200 mx-10 flex md:flex-row items-center flex-col">
            <span className="text-justsmall md:text-7xl pt-16 pb-10">
              My Skills
            </span>
            <span className=" w-3/4 md:w-1/4 md:h-fit ">
              {" "}
              I craft interactive web experiences using JavaScript, ensure
              elegant structure with HTML/CSS, and build dynamic UIs through
              React.
            </span>
          </div>
          <div className="h-fit max-w-screen grid grid-cols-3 grid-rows-3 align-bottom gap-x-10 gap-y-10 mx-10 my-10 pb-52">
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
      <div className="bg-rose-200 dark:bg-black font-nunito">
        <h1 className="text-justsmall text-black md:text-7xl dark:text-rose-200 mx-10 pt-16">
          My Work
        </h1>

        <div className="mx-0 md:mx-10 pt-10">
          <a
            href="https://thelysian.vercel.app"
            className="flex flex-col md:mx-10 lg:flex-row"
          >
            <ul className="p-10 space-y-5 text-black md:mr-0  dark:text-rose-200">
              <h1 className="text-justsmall">Responsive Shopping Website</h1>
              <li>
                This web app provides cryptocurrency insights, allowing users to
                access the latest information about various cryptocurrencies and
                make informed investment decisions.
              </li>
              <li>
                This website leverages the CoinGecko API to provide users with
                real-time cryptocurrency information, which is then presented
                graphically using Chart.js. Additionally, users have the
                flexibility to customize the displayed currency according to
                their preference.
              </li>{" "}
              <li>
                The technology stack employed includes HTML, CSS, JavaScript,
                and ReactJS. These components work in tandem to interact with
                APIs, facilitating the utilization of the website's features.
              </li>
            </ul>
            <img
              src={thelysian}
              className=" shadow-2xl shadow-rose-700 w-80 md:w-1/2 ml-10"
              data-aos="flip-left"
              alt=""
              srcset=""
            />
          </a>
          <a href="https://github.com/Agastsya/the_elysian">
            <img src={github} className="w-14 ml-10  pt-5" alt="" />
          </a>
        </div>

        <div className="mx-0 md:mx-10 pt-28">
          <a
            href="https://cryptocrash.vercel.app"
            className="flex flex-col md:mx-10 lg:flex-row"
          >
            <ul className="p-10 space-y-5 text-black dark:text-rose-200">
              <h1 className="text-justsmall">
                Cryptocurrency Insights Web App
              </h1>
              <li>
                This web app provides cryptocurrency insights, allowing users to
                access the latest information about various cryptocurrencies and
                make informed investment decisions.
              </li>
              <li>
                This website leverages the CoinGecko API to provide users with
                real-time cryptocurrency information, which is then presented
                graphically using Chart.js. Additionally, users have the
                flexibility to customize the displayed currency according to
                their preference.
              </li>{" "}
              <li>
                The technology stack employed includes HTML, CSS, JavaScript,
                and ReactJS. These components work in tandem to interact with
                APIs, facilitating the utilization of the website's features.
              </li>
            </ul>
            <img
              src={cryptocrash}
              className=" shadow-2xl shadow-rose-700 w-80 md:w-1/2 ml-10 "
              data-aos="flip-left"
              alt=""
              srcset=""
            />
          </a>
          <a href="https://github.com/Agastsya/cryptowebapp">
            <img src={github} className="w-14 ml-10 pt-5" alt="" />
          </a>
        </div>
      </div>

      <div className="bg-rose-200 dark:bg-black font-nunito pt-16">
        <h1 className="text-justsmall text-black md:text-7xl dark:text-rose-200 mx-10">
          Other Projects
        </h1>
        <div className="text-black dark:text-rose-200 md:mx-10 mx-10 pt-32 md:space-y-16 md:no-underline md:px-60">
          <h1 className="text-black dark:text-rose-200 text-justsmall underline md:no-underline ">
            Work Mitra Showcased at RECKON 4.0 Hackathon Jodhpur
          </h1>
          <ul className="space-y-6">
            <li>
              "Labour Mitra" is your go-to registry for information on skilled
              professionals, encompassing laborers, electricians, and
              carpenters. The platform offers detailed profiles and online
              accessibility, making the hunt for skilled tradespeople a breeze.
            </li>{" "}
            <li>
              With "Labour Mitra," finding the right skilled workers is a
              breeze. Its detailed profiles and online presence simplify the
              process of locating professionals like laborers, electricians, and
              carpenters, saving visitors valuable time and effort in their
              search.
            </li>
            <li>Collabrators: @KushKaushik @ShubhamGoel @Tushar Gautam</li>
          </ul>
        </div>

        <div className="text-black dark:text-rose-200 md:mx-10 mx-10 pt-32 md:space-y-16 md:no-underline md:px-60">
          <h1 className="text-black dark:text-rose-200 text-justsmall underline md:no-underline">
            Article Publishing Website
          </h1>
          <ul className="space-y-6">
            <li>
              Developed a dynamic article publishing website that enables users
              to create and submit their articles. Utilized MongoDB for data
              management, HTML/CSS for frontend design, Javascript for
              interactivity, and Node.js for backend functionality. Implemented
              a seamless process for article submission, publication, and user
              access to view published content.
            </li>{" "}
            <a href="https://github.com/Agastsya/blogging-website">
              <img src={github} className="w-14 pt-5" alt="" />
            </a>
          </ul>
        </div>

        <div className="text-black dark:text-rose-200 md:mx-10 mx-10 pt-32 md:space-y-16 md:no-underline md:px-60">
          <h1 className="text-black dark:text-rose-200 text-justsmall underline md:no-underline">
            Chatting Website
          </h1>
          <ul className="space-y-6">
            <li>
              Developed ad chatting website where Muliple users can message each
              other and communicate with each other.This website is made using
              sockets,javascript,html ,css
            </li>{" "}
            <a href="https://github.com/Agastsya/Chatting-App001">
              <img src={github} className="w-14 pt-5" alt="" />
            </a>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
