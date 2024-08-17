import React, { useState } from "react";
import Template1 from "../../assets/template-1.png";
import Template2 from "../../assets/template-2.png";
import Template3 from "../../assets/template-3.png";
import Template4 from "../../assets/template-4.png";
import Template5 from "../../assets/template-5.png";
import Template6 from "../../assets/template-6.png";
import { useNavigate, useLocation } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";

const AllTemplates = () => {
  const [tempError, setTempError] = useState("");
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location?.state || {};

  const templates = [
    { src: Template1, name: "template1" },
    { src: Template2, name: "template2" },
    { src: Template3, name: "template3" },
    { src: Template4, name: "template4" },
    { src: Template5, name: "template5" },
    { src: Template6, name: "template6" },
  ];

  const handleTemp = (temp) => {
    if (user) {
      navigate("/template", { state: { user, temp } });
    } else {
      setTempError("Sign in first to continue");

      setTimeout(() => {
        setTempError("");
      }, 2000);
    }
  };

  const handleMouseEnter = (template) => {
    setHoveredTemplate(template.name);
  };

  const handleMouseLeave = () => {
    setHoveredTemplate(null);
  };

  return (
    <>
      <div className="w-screen h-auto py-6 bg-[#100f0f] text-white">
        <h1 className="text-center text-[32px] max-[426px]:text-[18px]">
          Select a template to get started
        </h1>
        <div className="w-screen h-auto py-6  grid grid-cols-3 gap-4 max-[768px]:grid-cols-2 max-[426px]:grid-cols-1">
          {templates.map((template, i) => (
            <div
              key={i}
              className="w-[80%] m-auto h-full flex-shrink-0 relative rounded-md hover:scale-95 transition-transform duration-150 max-[426px]:w-[90%] max-[768px]:w-[90%] max-[375px]:w-[60%]"
              onMouseEnter={() => handleMouseEnter(template)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={template.src}
                alt={template.name}
                className="w-[100%] rounded-md hover:shadow-[#9ce2d8] shadow-xl"
              />
              {hoveredTemplate === template.name && (
                <button
                  className={`w-[200px] block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-gradient-to-r from-[#135c4d] to-[#407179] py-4 text-[20px] rounded-[12px] active:scale-95 transition-transform duration-150 max-md:w-[250px] max-md:text-[16px] max-md:py-3 max-[426px]:w-[150px]`}
                  onClick={() => handleTemp(template.name)}
                >
                  Use template
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {tempError && (
        <div className="fixed top-4 right-20 m-4 px-4 py-2 text-[14px] bg-[#d7f3ee] text-black rounded-md shadow-md max-[321px]:right-16">
          <span className="flex items-center gap-2">
            <CloseCircleOutlined className="text-red-600" />
            {tempError}
          </span>
        </div>
      )}
    </>
  );
};

export default AllTemplates;
