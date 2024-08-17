import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { PlusOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const Skills = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const[skills, setSkills] = useState("");

  const [details, setDetails] = useState({
    skills: [],
  });

  const getData = async () => {
    try {
      const res = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user?._id}`);
      const userData = res.data;
      if (userData && userData.skills) {
        setDetails({ ...details, skills: userData.skills });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, [user?._id]);

  const handleSkills = (e, index) => {
    const { value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      skills: prevDetails.skills.map((skill, idx) =>
        idx === index ? { ...skill, skill: value } : skill
      ),
    }));
  };

  const addSkill = () => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      skills: [...prevDetails.skills, { skill: "" }],
    }));
  };


  const deleteSkill = async (index) => {
    try {
      // Remove the skill locally
      const updatedSkills = details.skills.filter((_, idx) => idx !== index);
      setDetails({ skills: updatedSkills });

      // Make a DELETE request to the server
      await axios.delete(`https://swiftresume-backend.onrender.com/SignUpData/skill/${user._id}/${index}`);

      // Set success state
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting skill", error);
      setSaveError("Failed to delete skill. Please try again.");
    }
  };  


  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user._id}`);
      const userData = response.data;

      const updateSkills = {
        ...userData,
        skills: details.skills,
      };

      await axios.put(`https://swiftresume-backend.onrender.com/SignUpData/skill/${user._id}`, updateSkills);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setSaveError("Failed to save details. Please try again.");
    }
  };

  return (
    <div className="w-[90%] h-[500px] bg-[#d7f3ee] px-5 py-4 rounded-xl">
      <h1 className="text-xl font-semibold mb-1">Skills</h1>
      <p className="text-[14px] mb-5">
        Add relevant professional key skills and proficiencies.
      </p>
      <form className="text-[14px] font-light" onSubmit={handleAdd}>
        {details.skills.map((skill, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div>
              <label className="mr-3" htmlFor={`skill-${index}`}>
                {`Skill ${index+1}`}
              </label>
              <input
                type="text"
                id={`skill-${index}`}
                value={skill.skill}
                onChange={(e) => handleSkills(e, index)}
                className="w-[480px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[768px]:w-[80%] max-[426px]:w-[60%] mr-2"
              />
              <button
              type="button"
              className="text-[14px] text-red-600 cursor-pointer px-3 py-2 text-white bg-red-600 rounded-md"
              onClick={() => deleteSkill(index)}
            >
              <DeleteOutlined/>
            </button>
            </div>
            
          </div>
        ))}
        <div className="flex items-center gap-1 cursor-pointer" onClick={addSkill}>
          <PlusOutlined /> Add more skills
        </div>
        <div className="w-[100%] flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[#135c4d] text-white rounded-md text-[16px] font-semibold active:scale-95 duration-150"
          >
            save
          </button>
        </div>
      </form>
      {saveSuccess && (
        <div className="absolute top-0 right-6 m-4 p-4 z-50 bg-[#d7f3ee] text-black rounded-md shadow-md max-[426px]:p-2 max-[426px]:text-[12px]">
          <CheckCircleOutlined className="text-green-600 pr-2" />
          Skills saved successfully!
        </div>
      )}
    </div>
  );
};

export default Skills;

