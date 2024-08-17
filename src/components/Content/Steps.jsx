import React from "react";
import hares from "../../assets/step-1.png";
import choose from "../../assets/step-2.png";
import download from "../../assets/step-3.png";
import { Link } from "react-scroll";

const Steps = () => {
  return (
    <div className="h-[100vh] w-screen bg-[#100f0f] text-white px-4 py-10 max-[426px]:h-auto">
      <h1 className="text-center text-5xl mb-10 max-[768px]:text-3xl">
        Steps to make a perfect resume
      </h1>
      <div className="w-[90%] flex justify-around items-center m-auto mb-10 max-[768px]:w-[100%] max-[768px]:justify-between max-[768px]:mb-7 max-[426px]:flex-col max-[426px]:h-auto max-[426px]:gap-12 max-[426px]:mb-[60px]">
        <div className="w-[30%] flex flex-col justify-center items-center text-center gap-2">
          <div className="w-[300px] h-[250px] flex justify-center items-center max-[768px]:w-[200px] max-[768px]:h-[150px]">
            <img src={hares} alt="" className="w-[90%]" />
          </div>
          <h1 className="text-2xl w-[300px] font-semibold mb-2 max-[768px]:text-xl max-[768px]:w-[200px] max-[426px]:w-[250px]">
            Pick a template and follow the prompts
          </h1>
          <p className="w-[300px] max-[768px]:w-[200px] max-[768px]:text-[14px] max-[426px]:w-[250px]">
            Our builder will tailor your resume to the desired role once we know
            your details.
          </p>
        </div>
        <div className="w-[30%] flex flex-col justify-center items-center text-center gap-2">
          <div className="w-[300px] h-[250px] flex justify-center items-center max-[768px]:w-[200px] max-[768px]:h-[150px]">
            <img src={choose} alt="" className="w-[90%]" />
          </div>
          <h1 className="text-2xl w-[300px] font-semibold mb-2 max-[768px]:text-xl max-[768px]:w-[200px] max-[426px]:w-[250px]">
            Choose customized text that fits your story
          </h1>
          <p className="w-[300px] max-[768px]:w-[200px] max-[768px]:text-[14px] max-[426px]:w-[250px]">
            The builder features professionally written content and keywords
            that you can select.
          </p>
        </div>
        <div className="w-[30%] flex flex-col justify-center items-center text-center gap-2">
          <div className="w-[300px] h-[250px] flex justify-center items-center max-[768px]:w-[200px] max-[768px]:h-[150px]">
            <img src={download} alt="" className="w-[90%]" />
          </div>
          <h1 className="text-2xl w-[300px] font-semibold mb-2 max-[768px]:text-xl max-[768px]:w-[200px] max-[426px]:w-[250px]">
            Download and send to employers
          </h1>
          <p className="w-[300px] max-[768px]:w-[200px] max-[768px]:text-[14px] max-[426px]:w-[250px]">
            Save and send as a PDF, Word DOC or any other file format the
            employer wants.
          </p>
        </div>
      </div>
      <Link
        to="templateView"
        spy={true}
        smooth={true}
        offset={0}
        duration={200}
      >
        <div className="w-[100%] flex justify-center items-center">
          <button className="w-[300px] block bg-gradient-to-r from-[#135c4d] to-[#407179] py-4 text-[20px] rounded-[12px] active:scale-95 duration-150 max-[768px]:w-[250px] max-[768px]:text-[16px] max-[768px]:py-3 max-[426px]:w-[200px]">
            Get Started
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Steps;
