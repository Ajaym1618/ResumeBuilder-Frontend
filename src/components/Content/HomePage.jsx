import React, { useState } from "react";
import HI from "../../assets/resume-builder-hero-banner.webp";
import Steps from "./Steps";
import Header from "../Content/Header";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import TemplateView from "./TemplateView";
import { Link } from "react-scroll";
import AllTemplates from "./AllTemplates";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="w-screen h-[85vh] bg-[#100f0f] flex text-white max-[426px]:flex-col-reverse max-[426px]:gap-10 max-[426px]:h-[100%]">
        <div className="w-[50%] flex items-center justify-center max-[768px]:w-full max-[376px]:items-start">
          <img
            src={HI}
            alt="Home-Image"
            className="w-[80%] max-[768px]:w-[90%]"
          />
        </div>
        <div className="w-[50%] flex justify-center items-start flex-col max-[768px]:w-full max-[426px]:w-[100%] max-[426px]:items-center max-[426px]:justify-start max-[426px]:text-center max-[426px]:pt-10">
          <h1 className="text-[48px] font-medium leading-[60px] w-[70%] mb-[40px] max-[768px]:text-[32px] max-[768px]:mb-[20px] max-[768px]:leading-[35px] max-[426px]:w-[100%] max-[426px]:text-[24px] max-[426px]:leading-[0px] max-[376px]:text-[16px]">
            The Best Online Resume Builder
          </h1>
          <p className="text-[24px] leading-[36px] w-[90%] mb-[40px] max-[768px]:text-[15px] max-[768px]:mb-[30px] max-[768px]:leading-[20px] max-[426px]:w-[100%] max-[426px]:text-[14px]">
            Easily create the perfect resume for any job using our best-in-class
            resume builder platform.
          </p>
          <Link to="templateView" spy={true} smooth={true} offset={0} duration={200}>
            <button className="w-[450px] block bg-gradient-to-r from-[#135c4d] to-[#407179] py-5 text-[20px] rounded-[12px] active:scale-95 duration-150 max-[768px]:w-[250px] max-[768px]:text-[16px] max-[768px]:py-3 max-[426px]:w-[200px] max-[426px]:text-[14px] max-[426px]:mb-[20px]">
              Choose your Resume Now
            </button>
          </Link>
        </div>
      </div>
      <Steps />
      <TemplateView />
      <Footer />
    </>
  );
};

export default HomePage;
