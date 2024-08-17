import React from "react";
import PreviewTemplate1 from "./PreviewTemplate1";
import PreviewTemplate3 from "./PreviewTemplate3";
import PreviewTemplate2 from "./PreviewTemplate2";
import { useLocation } from "react-router-dom";
import PreviewTemplate4 from "./PreviewTemplate4";
import PreviewTemplate5 from "./PreviewTemplate5";
import PreviewTemplate6 from "./PreviewTemplate6";

const Preview = () => {

  const location = useLocation();
  const {temp} = location.state || {};
  const selectedTemplate = temp || "template1";
  return (
    <div className="w-[100%] h-[100vh]">
      {selectedTemplate === "template1" && <PreviewTemplate1/>}
      {selectedTemplate === "template2" && <PreviewTemplate2/>}
      {selectedTemplate === "template3" && <PreviewTemplate3/>}
      {selectedTemplate === "template4" && <PreviewTemplate4/>}
      {selectedTemplate === "template5" && <PreviewTemplate5/>}
      {selectedTemplate === "template6" && <PreviewTemplate6/>}
    </div>
  );
};

export default Preview;
