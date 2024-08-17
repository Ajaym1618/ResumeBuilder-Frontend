import React from "react";
import {
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const Template4 = ({ userInfo, formatMonthYear }) => {
  return (
    <div className="w-[816.5px] h-[100%] overflow-y-scroll overflow-x-none bg-white  ">
      {/* header */}
      <div className="bg-[#b2436f] px-8 text-white">
        <div className="w-[100%] pt-14 flex justify-between">
          <div>
            <h1 className="text-[30px] font-semibold ">
              {userInfo?.personalInfo?.firstName &&
              userInfo?.personalInfo.lastName
                ? `${userInfo.personalInfo.firstName} ${userInfo.personalInfo.lastName}`
                : "Chris Gayle"}
            </h1>
            <h2 className="text-[22px] ">
              {userInfo?.personalInfo?.jobTitle
                ? userInfo?.personalInfo.jobTitle
                : "Human Resource Manager"}
            </h2>
          </div>
          <div>
            <p className="text-[12px] pb-1 flex items-center gap-1">
              <HomeOutlined />
              {userInfo?.personalInfo?.address
                ? userInfo?.personalInfo.address
                : "Add your address here"}
            </p>
            <p className="text-[12px] pb-1 font-semibold flex items-center gap-1">
              <MailOutlined  />
              {userInfo?.personalInfo?.email
                ? userInfo?.personalInfo.email
                : "Email"}
            </p>
            <p className="text-[12px] pb-1 font-semibold flex items-center gap-1">
              <PhoneOutlined className=" rotate-[100deg] " />
              {userInfo?.personalInfo?.phoneNumber
                ? userInfo?.personalInfo.phoneNumber
                : "Phone number"}
            </p>
            <p className="text-[12px] flex items-center gap-1">
              <GlobalOutlined  />
              {userInfo?.personalInfo?.links[0]
                ? userInfo?.personalInfo.links
                : "Social links"}
              ,
            </p>
          </div>
        </div>
        {/* Objective */}
        <div className="w-[100%] pt-5 text-[14px] break-words pb-5">
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
      {/* Experience */}
      <div className="w-[100%] m-auto pt-2 font-semibold px-8">
        <h1 className="text-[22px] border-b-2 border-[#b2436f] mb-3 text-[#b2436f]">
          Experience
        </h1>
        {userInfo?.experience?.length > 0 ? (
          userInfo?.experience.map((exp, index) => (
            <div key={index}>
              <h2 className="text-[18px]">
                {exp.positionTitle || "Human Resource Manager"}
              </h2>
              <h3 className="font-light text-[12px] mb-1 font-semibold">
                {exp.companyName && exp.city && exp.state
                  ? `${exp.companyName}, ${exp.city}, ${exp.state}`
                  : "Zoho, Chennai, Tamilnadu"}{" "}
                |{" "}
                {exp.startDate && exp.endDate
                  ? `${formatMonthYear(exp.startDate)} - ${formatMonthYear(
                      exp.endDate
                    )}`
                  : "Date"}
              </h3>
              <p className="list-disc list-inside indent-3 font-light text-[14px] break-words mb-2">
                {exp.workSummary ||
                  `Implement effective company policies to ensure that all practices comply with labor and employment regulations`}
              </p>
            </div>
          ))
        ) : (
          <div className="w-[100%]">
            <h2 className="text-[18px]">Human Resource Manager</h2>
            <h3 className="font-light text-[12px] mb-1 font-semibold">
              Zoho, Chennai, Tamilnadu
            </h3>
            <h3 className="font-light text-[12px] mb-1">Date</h3>
            <p className="list-disc list-inside indent-3 font-light text-[14px] break-words mb-2">
              Implement effective company policies to ensure that all practices
              comply with labor and employment regulations
            </p>
          </div>
        )}
      </div>
      {/* Education and achievements */}
      <div className="flex gap-6 px-8">
        <div className="w-[80%] font-semibold">
          <h1 className="text-[22px] border-b-2 border-[#b2436f] mb-3 text-[#b2436f]">
            Education
          </h1>
          {userInfo?.education?.length > 0 ? (
            userInfo?.education.map((edu, index) => (
              <div key={index}>
                <h2 className="text-[14px]">
                  {edu.degree &&
                  edu.fieldOfStudy &&
                  edu.startDate &&
                  edu.endDate
                    ? `${edu.degree} | ${edu.fieldOfStudy} | ${formatMonthYear(
                        edu.startDate
                      )} - ${formatMonthYear(edu.endDate)}`
                    : "Degree, Field of study and date"}
                </h2>
                <h3 className="font-light text-[12px] mb-1">
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
            <div>
              <h2 className="text-[14px]">Degree, Field of study and date</h2>
              <h3 className="font-light text-[14px] mb-1">
                School name and location
              </h3>
              <p className="indent-3 text-[14px]">Percentage - 90%</p>
            </div>
          )}
        </div>
        <div className="w-[80%]">
          <h1 className="text-[22px] border-b-2 font-semibold border-[#b2436f] mb-3 text-[#b2436f]">
            Achievements
          </h1>
          {userInfo?.achievements?.length > 0 ? (
            userInfo?.achievements.map((achievement, index) => (
              <div key={index}>
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
            <div>
              <h2 className="text-[14px]">Course Name</h2>
              <h3 className="font-semibold text-[14px] mb-1">Academy name</h3>
              <h3 className="font-light text-[14px] mb-1">Date</h3>
            </div>
          )}
        </div>
      </div>
      {/* project */}
      <div className="w-[100%] m-auto pt-3 mb-3 break-words px-8">
        <h1 className="text-[22px] border-b-2 border-[#b2436f] font-semibold mb-3 text-[#b2436f]">
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
      {/* Skills language hobbies */}
      <div className="flex gap-6 mb-6 px-8">
        <div className="w-[90%] font-semibold ">
          <h1 className="text-[22px] border-b-2 border-[#b2436f] mb-3 text-[#b2436f]">
            Skills
          </h1>
          <ul className="list-disc list-inside pl-6 font-light text-[16px]">
            {userInfo?.skills?.length > 0 ? (
              userInfo?.skills.map((skill, index) => (
                <li key={index}>{skill.skill || "Skill"}</li>
              ))
            ) : (
              <li>Skill</li>
            )}
          </ul>
        </div>
        <div className="w-[90%] font-semibold ">
          <h1 className="text-[22px] border-b-2 border-[#b2436f] mb-3 text-[#b2436f]">
            Hobbies
          </h1>
          <ul className="list-disc list-inside pl-6 font-light text-[16px]">
            {userInfo?.hobbies?.length > 0 ? (
              userInfo?.hobbies.map((hobby, index) => (
                <li key={index}>{hobby.name || "Hobby"}</li>
              ))
            ) : (
              <li>Hobby</li>
            )}
          </ul>
        </div>
        <div className="w-[90%] font-semibold ">
          <h1 className="text-[22px] border-b-2 border-[#b2436f] mb-3 text-[#b2436f]">
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
  );
};

export default Template4;
