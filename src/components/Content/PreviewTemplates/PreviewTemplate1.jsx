import React, { useEffect, useState } from "react";
import {
  EyeOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PreviewTemplate1 = () => {
  const [userInfo, setUserInfo] = useState("");
  const location = useLocation();
  const { user } = location.state || {};

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
  }, []); // Empty dependency array to ensure it runs only once when the component mounts
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

  const download = () => {
    const capture = document.querySelector(".download");
  
    // Force a reflow to ensure styles are fully applied
    window.getComputedStyle(capture);
  
    html2canvas(capture, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
      // Save the PDF
      pdf.save('Resume.pdf');
    });
  };
  
  
  return (
    <>
      <div className="h-[100vh] w-[100%] bg-[#000000bf] flex justify-center items-center relative text-white px-4 max-[426px]:h-auto max-[426px]:px-0">
        <div class="w-[600px] h-[100vh] flex gap-5 text-black bg-white download max-[426px]:w-[100%]">
          <div className="h-auto w-[60%] pt-5 max-[768px]:pt-3">
            <div className="w-[90%] m-auto pt-2">
              <h1 className="text-[20px] font-bold max-[768px]:text-[15px] max-[321px]:text-[14px]">
                {userInfo.personalInfo?.firstName &&
                userInfo.personalInfo.lastName
                  ? `${userInfo.personalInfo.firstName} ${userInfo.personalInfo.lastName}`
                  : "Chris Gayle"}
              </h1>
              <h2 className="text-[15px] max-[768px]:text-[12px] max-[321px]:text-[11px]">
                {userInfo.personalInfo?.jobTitle
                  ? userInfo.personalInfo.jobTitle
                  : "Human Resource Manager"}
              </h2>
            </div>
            <div className="w-[90%] m-auto pt-1 text-[10px] break-words max-[768px]:text-[8px] max-[321px]:text-[7px]">
              <h1 className="text-[15px] border-b-2 font-bold border-black mb-1 max-[768px]:text-[12px] max-[321px]:text-[11px]">
                Objective
              </h1>
              <p className="indent-4">
                {userInfo.personalInfo?.summary
                  ? userInfo.personalInfo.summary
                  : ` Human resources generalist with 8 years of experience in HR,
              including hiring and terminating, disciplining employees and
              helping department managers improve employee performance. Worked
              with labor unions to negotiate compensation packages for
              workers.`}
              </p>
            </div>
            <div className="w-[90%] m-auto pt-1 font-bold">
              <h1 className="text-[15px] border-b-2 border-black mb-1 max-[768px]:text-[12px] max-[321px]:text-[11px]">
                Experience
              </h1>
              {userInfo.experience?.length > 0 ? (
                userInfo.experience.map((exp, index) => (
                  <div key={index}>
                    <h2 className="text-[12px] font-bold max-[768px]:text-[10px] max-[321px]:text-[9px]">
                      {exp.positionTitle || "Human Resource Manager"}
                    </h2>
                    <h3 className="text-[8px] font-semibold max-[768px]:text-[8px] max-[321px]:text-[7px]">
                      {exp.companyName && exp.city && exp.state
                        ? `${exp.companyName}, ${exp.city}, ${exp.state}`
                        : "Zoho, Chennai, Tamilnadu"}
                    </h3>
                    <h3 className="font-semibold text-[8px] mb-1 max-[768px]:text-[6px]">
                      {exp.startDate && exp.endDate
                        ? `${formatMonthYear(
                            exp.startDate
                          )} - ${formatMonthYear(exp.endDate)}`
                        : "Date"}
                    </h3>
                    <p className="list-disc list-inside indent-3 font-light text-[10px] break-words mb-1 max-[768px]:text-[8px] max-[768px]:font-normal">
                      {exp.workSummary ||
                        `Implement effective company policies to ensure that all practices comply with labor and employment regulations`}
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <h2 className="text-[12px] max-[768px]:text-[10px]">Human Resource Manager</h2>
                  <h3 className=" text-[12px] mb-1 font-semibold max-[768px]:text-[10px]">
                    Zoho, Chennai, Tamilnadu
                  </h3>
                  <h3 className="font-light text-[8px] mb-1 max-[768px]:text-[6px]">Date</h3>
                  <p className="list-disc list-inside indent-3 font-light text-[10px] break-words">
                    Implement effective company policies to ensure that all
                    practices comply with labor and employment regulations
                  </p>
                </div>
              )}
            </div>
            <div className="w-[90%] m-auto mt-1">
              <h1 className="text-[15px] border-b-2 font-bold border-black mb-1 max-[768px]:text-[12px]">
                Education
              </h1>
              {userInfo.education?.length > 0 ? (
                userInfo.education.map((edu, index) => (
                  <div key={index}>
                    <h2 className="text-[10px] max-[768px]:text-[7px] max-[768px]:font-bold">
                      {edu.degree &&
                      edu.fieldOfStudy &&
                      edu.startDate &&
                      edu.endDate
                        ? `${edu.degree} | ${
                            edu.fieldOfStudy
                          } | ${formatMonthYear(
                            edu.startDate
                          )} - ${formatMonthYear(edu.endDate)}`
                        : "Degree, Field of study and date"}
                    </h2>
                    <h3 className="font-light text-[12px] max-[768px]:text-[8px] max-[768px]:font-bold">
                      {edu.schoolName && edu.schoolLocation
                        ? `${edu.schoolName}, ${edu.schoolLocation}`
                        : "School name and location"}
                    </h3>
                    <p className="indent-3 text-[8px] mb-1 max-[768px]:text-[7px]">
                      {edu.percentage
                        ? `Percentage - ${edu.percentage}%`
                        : "Percentage - 90%"}
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <h2 className="text-[10px] max-[768px]:text-[8px]">
                    Degree, Field of study and date
                  </h2>
                  <h3 className="font-light text-[12px] mb-1 max-[768px]:text-[10px]">
                    School name and location
                  </h3>
                  <p className="indent-3 text-[8px] max-[768px]:text-[7px]">Percentage - 90%</p>
                </div>
              )}
            </div>
            <div className="w-[90%] m-auto py-1 break-words max-[426px]:py-0">
              <h1 className="text-[15px] border-b-2 border-black font-bold mb-1 max-[768px]:text-[12px]">
                Projects
              </h1>
              {userInfo.projects?.length > 0 ? (
                userInfo.projects.map((project, index) => (
                  <div key={index}>
                    <h2 className="text-[12px] font-semibold max-[768px]:text-[10px]">
                      {project.projectName || "Project name"}
                    </h2>
                    <p className="text-[10px] indent-4 mb-2 max-[768px]:text-[8px]">
                      {project.description || "Project description"}
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <h2 className="text-[12px] font-semibold max-[768px]:text-[10px]">Project name</h2>
                  <p className="text-[10px] indent-4 max-[768px]:text-[8px]">Project description</p>
                </div>
              )}
            </div>
          </div>

          <div className="h-[100vh] w-[40%]">
            <div className="w-[90%] m-auto pt-6 max-[768px]:pt-3">
              <p className="text-[10px] pb-1 flex items-center gap-1 max-[768px]:text-[8px]">
                <HomeOutlined />
                {userInfo.personalInfo?.address
                  ? userInfo.personalInfo.address
                  : "Add your address here"}
              </p>
              <p className="text-[10px] pb-1 font-semibold flex items-center gap-1 max-[768px]:text-[8px]">
                <MailOutlined />
                {userInfo.personalInfo?.email
                  ? userInfo.personalInfo.email
                  : "Email"}
              </p>
              <p className="text-[8px] pb-1 font-semibold flex items-center gap-1 max-[768px]:text-[8px]">
                <PhoneOutlined className=" rotate-[100deg]" />
                {userInfo.personalInfo?.phoneNumber
                  ? userInfo.personalInfo.phoneNumber
                  : "Phone number"}
              </p>
              <p className="text-[10px] flex items-center gap-1 max-[768px]:text-[8px]">
                <GlobalOutlined />
                {userInfo.personalInfo?.links[0]
                  ? userInfo.personalInfo.links
                  : "Social links"}
              </p>
            </div>
            <div className="w-[90%] m-auto pt-3 font-semibold ">
              <h1 className="text-[15px] border-b-2 border-black mb-3 max-[768px]:text-[12px]">
                Skills
              </h1>
              <ul className="list-disc list-inside pl-6 font-light text-[12px] max-[768px]:text-[10px]">
                {userInfo.skills?.length > 0 ? (
                  userInfo.skills.map((skill, index) => (
                    <li key={index}>{skill.skill || "Skill"}</li>
                  ))
                ) : (
                  <li>Skill</li>
                )}
              </ul>
            </div>

            <div className="w-[90%] m-auto pt-3">
              <h1 className="text-[15px] border-b-2 font-semibold border-black mb-3 max-[768px]:text-[12px] max-[768px]:mb-1">
                Achievements
              </h1>
              {userInfo.achievements?.length > 0 ? (
                userInfo.achievements.map((achievement, index) => (
                  <div key={index}>
                    <h2 className="text-[12px] font-bold max-[768px]:text-[10px]">
                      {achievement.courseName || "Course Name"}
                    </h2>
                    <h3 className="font-semibold font-bold text-[10px] mb-1 max-[768px]:text-[8px] max-[768px]:mb-0 ">
                      {achievement.academyInstitution && achievement.location
                        ? `${achievement.academyInstitution}, ${achievement.location}`
                        : "Academy name"}
                    </h3>
                    <h3 className="font-light text-[9px] mb-1 max-[768px]:text-[8px]">
                      {achievement.startDate && achievement.endDate
                        ? `${formatMonthYear(
                            achievement.startDate
                          )} - ${formatMonthYear(achievement.endDate)}`
                        : "Date"}
                    </h3>
                  </div>
                ))
              ) : (
                <div>
                  <h2 className="text-[12px] max-[768px]:text-[10px]">Course Name</h2>
                  <h3 className="font-semibold text-[10px] mb-1 max-[768px]:text-[8px]">
                    Academy name
                  </h3>
                  <h3 className="font-light text-[9px] mb-1 max-[768px]:text-[8px]">Date</h3>
                </div>
              )}
            </div>
            <div className="w-[90%] m-auto pt-3 font-semibold ">
              <h1 className="text-[15px] border-b-2 border-black mb-3 max-[768px]:text-[12px] max-[768px]:mb-1">
                Hobbies
              </h1>
              <ul className="list-disc list-inside pl-6 font-light text-[12px] max-[768px]:text-[10px]">
                {userInfo.hobbies?.length > 0 ? (
                  userInfo.hobbies.map((hobby, index) => (
                    <li key={index}>{hobby.name || "Hobby"}</li>
                  ))
                ) : (
                  <li>Hobby</li>
                )}
              </ul>
            </div>
            <div className="w-[90%] m-auto pt-3 font-semibold ">
              <h1 className="text-[15px] border-b-2 border-black mb-3 max-[768px]:text-[12px] max-[768px]:mb-1">
                Languages
              </h1>
              <ul className="list-disc list-inside pl-6 font-light text-[12px] max-[768px]:text-[10px]">
                {userInfo.languages?.length > 0 ? (
                  userInfo.languages.map((language, index) => (
                    <li key={index}>{language.name || "Language"}</li>
                  ))
                ) : (
                  <li>Language</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button
        className="w-[100px] block z-20 absolute top-[90%] right-[34%] bg-gradient-to-r text-white from-[#135c4d] to-[#407179] py-2 text-[16px] rounded-md active:scale-95 duration-150 max-[426px]:text-[12px] max-[768px]:right-[23%] max-[426px]:right-[10%]"
        onClick={download}
      >
        Download
      </button>
    </>
  );
};

export default PreviewTemplate1;
