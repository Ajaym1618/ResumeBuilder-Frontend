import React, { useEffect, useRef, useState } from "react";
import logo from "../../../assets/Logo.png";
import PersonalDetails from "../ResumeDetails/PersonalDetails";
import Experience from "../ResumeDetails/Experience";
import Education from "../ResumeDetails/Education";
import Skills from "../ResumeDetails/Skills";
import Project from "../ResumeDetails/Project";
import Achievements from "../ResumeDetails/Achievements";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Hobbies from "../ResumeDetails/Hobbies";
import Languages from "../ResumeDetails/Languages";
import {
  EyeOutlined,
  CloseOutlined,
  DownloadOutlined
} from "@ant-design/icons";

import Template1 from "./template1";
import Preview from "../PreviewTemplates/Preview";
import Template3 from "./template3";
import Template2 from "./template2";
import Template4 from "./template4";
import Template5 from "./template5";
import Template6 from "./template6";

const DataEntryPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [preview, setPreview] = useState(false);

  const location = useLocation();
  const {user} = location.state || {};

  const {temp} = location.state || {};

  const selectedTemplate = temp || "template1";
  
  
  console.log(user);

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://swiftresume-backend.onrender.com/SignUpData/${user._id}`
      );
      setUserInfo(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, [userInfo]); 
  console.log(userInfo);

  const formatMonthYear = (date) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  };

  return (
    <>
      <div className="w-[100%] h-screen bg-[#100f0f] flex items-center overscroll-y-none overscroll-x-none relative">
        <div className="w-[45%] h-[92%] overflow-y-scroll overflow-x-none flex flex-col items-center gap-4  max-[768px]:w-[100%]">
          <div className="sticky top-[-1px] w-[100%] py-4 px-6 bg-[#100f0f] ">
            <div className="w-[100%] flex justify-between items-center">
              <img
                src={logo}
                alt="logo"
                width={"200px"}
                height={"100px"}
                className="max-[426px]:w-[100px] max-[426px]:h-[40px]"
              />
              <div className="flex gap-3 items-center">
                <button
                  className="w-auto px-2 h-[40px] text-center bg-gradient-to-r text-white from-[#135c4d] to-[#407179] rounded-md flex justify-center items-center text-[#9ce2d8] cursor-pointer hover:border-[#407179] hover:text-[#9ce2d8] max-[427px]:hidden"
                  onClick={() => setPreview(true)}
                >
                  Preview & Download
                </button>
                <button className="text-center bg-gradient-to-r text-white from-[#135c4d] to-[#407179] flex justify-center gap-3 text-[18px] items-center cursor-pointer hover:border-[#407179] hover:text-[#407179] w-[100px] h-[35px] rounded-md min-[426px]:hidden" onClick={() => setPreview(true)}>
                  <EyeOutlined /> | <DownloadOutlined />
                </button>
              </div>
            </div>
          </div>
          <PersonalDetails />
          <Experience />
          <Education />
          <Project />
          <Skills />
          <Achievements />
          <Hobbies />
          <Languages />
        </div>
        <div className="h-[92%] w-[55%] overflow-y-scroll overflow-x-none flex justify-center items-center max-[768px]:hidden">
          {selectedTemplate === "template1"&&<Template1 userInfo={userInfo} formatMonthYear={formatMonthYear} />}
          {selectedTemplate === "template2"&&<Template2 userInfo={userInfo} formatMonthYear={formatMonthYear} />}
          {selectedTemplate === "template3"&&<Template3 userInfo={userInfo} formatMonthYear={formatMonthYear} />}
          {selectedTemplate === "template4"&&<Template4 userInfo={userInfo} formatMonthYear={formatMonthYear} />}
          {selectedTemplate === "template5"&&<Template5 userInfo={userInfo} formatMonthYear={formatMonthYear} />}
          {selectedTemplate === "template6"&&<Template6 userInfo={userInfo} formatMonthYear={formatMonthYear} />}  
        </div>
      </div>
      {preview && (
        <div className="w-screen h-screen absolute top-0">
          <Preview />
          <div
            className="absolute top-[1%] right-[31%] w-[25px] h-[25px] text-[15px] flex justify-center items-center bg-[#135c4d] text-white rounded-[50%] font-bold cursor-pointer max-[768px]:right-[12%] max-[426px]:right-[3%] max-[321px]:right-1"
            onClick={() => setPreview(false)}
          >
            <CloseOutlined />
          </div>
        </div>
      )}
    </>
  );
};

export default DataEntryPage;
