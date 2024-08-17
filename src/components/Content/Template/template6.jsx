import React from "react";
import {
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const Template6 = ({ userInfo, formatMonthYear }) => {
  return (
    <div className="w-[816.5px] h-[100%] overflow-y-scroll overflow-x-none bg-white ">
      <div className="w-[100%] border-b-2 border-black px-6 bg-[#0d183a] text-white">
        <div className="w-[100%] flex justify-between">
          <div className="w-[70%] m-auto pt-14">
            <h1 className="text-[30px] font-semibold">
              {userInfo?.personalInfo?.firstName &&
              userInfo?.personalInfo.lastName
                ? `${userInfo.personalInfo.firstName} ${userInfo.personalInfo.lastName}`
                : "Chris Gayle"}
            </h1>
            <h2 className="text-[22px]">
              {userInfo?.personalInfo?.jobTitle
                ? userInfo?.personalInfo.jobTitle
                : "Human Resource Manager"}
            </h2>
          </div>
          <div className="w-[30%] m-auto pt-14">
            <p className="text-[12px] pb-1 flex items-center gap-1">
              <HomeOutlined />
              {userInfo?.personalInfo?.address
                ? userInfo?.personalInfo.address
                : "Add your address here"}
            </p>
            <p className="text-[12px] pb-1 font-semibold flex items-center gap-1">
              <MailOutlined />
              {userInfo?.personalInfo?.email
                ? userInfo?.personalInfo.email
                : "Email"}
            </p>
            <p className="text-[12px] pb-1 font-semibold flex items-center gap-1">
              <PhoneOutlined className=" rotate-[100deg]" />
              {userInfo?.personalInfo?.phoneNumber
                ? userInfo?.personalInfo.phoneNumber
                : "Phone number"}
            </p>
            <p className="text-[12px] flex items-center gap-1">
              <GlobalOutlined />
              {userInfo?.personalInfo?.links[0]
                ? userInfo?.personalInfo.links
                : "Social links"}
              ,
            </p>
          </div>
        </div>
        <div className="w-[100%] m-auto pt-5 mb-3 text-[14px] break-words">
          <p className="indent-4">
            {userInfo?.personalInfo?.summary
              ? userInfo?.personalInfo.summary
              : ` Human resources generalist with 8 years of experience in HR,
              including hiring and terminating, disciplining employees and
              helping department managers improve employee performance. Worked
              with labor unions to negotiate compensation packages for
              workers.`}
          </p>
        </div>
      </div>
      <div className="w-[100%] flex">
        <div className="border-r-2 border-[#0d183a]">
          <div className="h-[100%] w-[100%] ">
            <div className="w-[100%] pt-5 font-semibold border-b-2 border-[#0d183a]">
              <h1 className="text-[22px] mb-3 pl-6 text-[#0d183a]">
                Experience
              </h1>
              {userInfo?.experience?.length > 0 ? (
                userInfo?.experience.map((exp, index) => (
                  <div key={index} className="pl-6">
                    <h2 className="text-[18px]">
                      {exp.positionTitle || "Human Resource Manager"}
                    </h2>
                    <h3 className="text-[12px] mb-1 font-semibold">
                      {exp.companyName && exp.city && exp.state
                        ? `${exp.companyName}, ${exp.city}, ${exp.state}`
                        : "Zoho, Chennai, Tamilnadu"}
                    </h3>
                    <h3 className="font-light text-[12px] mb-1 ">
                      {exp.startDate && exp.endDate
                        ? `${formatMonthYear(
                            exp.startDate
                          )} - ${formatMonthYear(exp.endDate)}`
                        : "Date"}
                    </h3>
                    <p className="list-disc list-inside indent-3 font-light text-[14px] break-words mb-2">
                      {exp.workSummary ||
                        `Implement effective company policies to ensure that all practices comply with labor and employment regulations`}
                    </p>
                  </div>
                ))
              ) : (
                <div className="pl-6">
                  <h2 className="text-[18px]">Human Resource Manager</h2>
                  <h3 className="text-[12px] mb-1 font-semibold">
                    Zoho, Chennai, Tamilnadu
                  </h3>
                  <h3 className="font-light text-[12px] mb-1 ">Date</h3>
                  <p className="list-disc list-inside indent-3 font-light text-[14px] break-words mb-2">
                    Implement effective company policies to ensure that all
                    practices comply with labor and employment regulations
                  </p>
                </div>
              )}
            </div>
            <div className="w-[100%] pt-2 font-semibold border-b-2 pb-2 border-[#0d183a]">
              <h1 className="text-[22px] mb-3 pl-6 text-[#0d183a]">
                Education
              </h1>
              {userInfo?.education?.length > 0 ? (
                userInfo?.education.map((edu, index) => (
                  <div key={index} className="pl-6">
                    <h2 className="text-[14px]">
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
                    <h3 className="font-light text-[14px] mb-1">
                      {edu.schoolName && edu.schoolLocation
                        ? `${edu.schoolName}, ${edu.schoolLocation}`
                        : "School name and location"}
                    </h3>
                    <p className="indent-3 text-[14px] mb-3">
                      {edu.percentage
                        ? `Percentage - ${edu.percentage}%`
                        : "Percentage - 90%"}
                    </p>
                  </div>
                ))
              ) : (
                <div className="pl-6">
                  <h2 className="text-[14px]">
                    Degree, Field of study and date
                  </h2>
                  <h3 className="font-light text-[14px] mb-1">
                    School name and location
                  </h3>
                  <p className="indent-3 text-[14px]">Percentage - 90%</p>
                </div>
              )}
            </div>
            <div className="w-[90%] m-auto pt-3 mb-3 break-words">
              <h1 className="text-[22px] font-semibold mb-3 text-[#0d183a]">
                Projects
              </h1>
              {userInfo?.projects?.length > 0 ? (
                userInfo?.projects.map((project, index) => (
                  <div key={index}>
                    <h2 className="text-[18px] font-semibold">
                      {project.projectName || "Project name"}
                    </h2>
                    <p className="text-[14px] indent-4">
                      {project.description || "Project description"}
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <h2 className="text-[18px] font-semibold">Project name</h2>
                  <p className="text-[14px] indent-4">Project description</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* second container */}
        <div className="h-auto w-[80%]">
          <div className="w-[100%] m-auto pt-6 font-semibold border-b-2 pb-2 border-[#0d183a]">
            <h1 className="text-[22px] mb-3 pl-6 text-[#0d183a]">Skills</h1>
            <ul className="list-disc list-inside pl-10 font-light text-[16px]">
              {userInfo?.skills?.length > 0 ? (
                userInfo?.skills.map((skill, index) => (
                  <li key={index}>{skill.skill || "Skill"}</li>
                ))
              ) : (
                <li>Skill</li>
              )}
            </ul>
          </div>

          <div className="w-[100%] pt-2 pb-2 border-b-2 border-[#0d183a]">
            <h1 className="text-[22px] font-semibold mb-3 pl-6 text-[#0d183a]">
              Achievements
            </h1>
            {userInfo?.achievements?.length > 0 ? (
              userInfo?.achievements.map((achievement, index) => (
                <div key={index} className="pl-6">
                  <h2 className="text-[14px]">
                    {achievement.courseName || "Course Name"}
                  </h2>
                  <h3 className="font-semibold text-[14px] mb-1">
                    {achievement.academyInstitution && achievement.location
                      ? `${achievement.academyInstitution}, ${achievement.location}`
                      : "Academy name"}
                  </h3>
                  <h3 className="font-light text-[14px] mb-1">
                    {achievement.startDate && achievement.endDate
                      ? `${formatMonthYear(
                          achievement.startDate
                        )} - ${formatMonthYear(achievement.endDate)}`
                      : "Date"}
                  </h3>
                </div>
              ))
            ) : (
              <div className="pl-6">
                <h2 className="text-[14px]">Course Name</h2>
                <h3 className="font-semibold text-[14px] mb-1">Academy name</h3>
                <h3 className="font-light text-[14px] mb-1">Date</h3>
              </div>
            )}
          </div>
          <div className="w-[100%] pt-2 font-semibold border-b-2 border-[#0d183a]">
            <h1 className="text-[22px] mb-3 pl-6 text-[#0d183a]">
              Hobbies
            </h1>
            <ul className="list-disc list-inside pl-10 font-light text-[16px]">
              {userInfo?.hobbies?.length > 0 ? (
                userInfo?.hobbies.map((hobby, index) => (
                  <li key={index}>{hobby.name || "Hobby"}</li>
                ))
              ) : (
                <li>Hobby</li>
              )}
            </ul>
          </div>
          <div className="w-[90%] m-auto pt-6 font-semibold ">
            <h1 className="text-[22px] mb-3 text-[#0d183a]">
              Languages
            </h1>
            <ul className="list-disc list-inside pl-6 font-light text-[16px]">
              {userInfo?.languages?.length > 0 ? (
                userInfo?.languages.map((language, index) => (
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
  );
};

export default Template6;
