import React, { useEffect, useRef, useState } from "react";
import Template1 from "../../assets/template-1.png";
import Template2 from "../../assets/template-2.png";
import Template3 from "../../assets/template-3.png";
import Template4 from "../../assets/template-4.png";
import Template5 from "../../assets/template-5.png";
import Template6 from "../../assets/template-6.png";
import { useNavigate, useLocation } from "react-router-dom";
import { CloseCircleOutlined, CaretLeftOutlined , CaretRightOutlined  } from "@ant-design/icons";

const TemplateView = () => {
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
  const [tempError, setTempError] = useState("");
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [index, setIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % templates.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [templates.length]);

  return (
    <>
      <div className="w-full h-screen bg-[#100f0f] py-4 max-md:h-auto templateView overflow-hidden">
        <div className="w-screen flex justify-center text-white pb-4">
          <h1 className="w-[700px] text-center text-[34px] font-light max-[426px]:text-[20px] max-[426px]:w-[90%]">
            Pick one of many world-class templates and build your resume in
            minutes
          </h1>
        </div>
        <div className="relative w-full px-8 h-[70vh] flex items-center justify-center max-[768px]:h-[60vh] max-[426px]:px-0">
          <button 
            onClick={scrollLeft}
            className="text-4xl w-12 h-12 flex justify-center items-center rounded-full bg-[#135c4d] absolute top-[50%] left-6 transform -translate-y-1/2 text-white max-lg:hidden"
          >
            <CaretLeftOutlined />
          </button>
          <button
            onClick={scrollRight}
            className="text-4xl px-2 py-2 flex justify-center items-center rounded-full bg-[#135c4d] absolute top-[50%] right-6 transform -translate-y-1/2 text-white max-lg:hidden"
          >
            <CaretRightOutlined />
          </button>
          <div className="w-[90%] h-[60vh] py-2 px-6 flex gap-5 transition-transform duration-1000 ease-in-out overflow-x-scroll max-lg:w-[100%] max-[426px]:h-[100%]" ref={scrollContainerRef}>
            {[...templates, ...templates.slice(0, 3)].map((template, i) => (
              <div
                key={i}
                className="w-[25%] h-full flex-shrink-0 relative rounded-md hover:scale-95 transition-transform duration-150 max-[768px]:w-[35%] max-[426px]:w-[80%]"
                onMouseEnter={() => handleMouseEnter(template)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={template.src}
                  alt={template.name}
                  className="w-full h-full rounded-md hover:shadow-[#9ce2d8] shadow-xl"
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
        <div className="w-[100%] text-white flex justify-center items-center ">
          <button
            className="mt-2 px-4 py-4 bg-[#135c4d] rounded-md max-[768px]:mt-4 max-[426px]:py-2"
            onClick={() => navigate("/AllTemplate", { state: { user } })}
          >
            See all templates
          </button>
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

export default TemplateView;
