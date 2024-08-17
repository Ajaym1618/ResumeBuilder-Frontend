import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { PlusOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Experience = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [experiences, setExperiences] = useState([{
    positionTitle: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummary: "",
  }]);

  const getData = async () => {
    try {
      const res = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user?._id}`);
      const userData = res.data;
      if (userData && Array.isArray(userData.experience)) {
        setExperiences(userData.experience.length ? userData.experience : [{
          positionTitle: "",
          companyName: "",
          city: "",
          state: "",
          startDate: "",
          endDate: "",
          workSummary: "",
        }]);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getData();
    }
  }, [user?._id]);

  const handleExperienceChange = (index, e) => {
    const { id, value } = e.target;
    setExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index] = { ...updatedExperiences[index], [id]: value };
      return updatedExperiences;
    });
  };

  const handleAddExperience = () => {
    setExperiences((prevExperiences) => [
      ...prevExperiences,
      {
        positionTitle: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
      },
    ]);
  };

  const handleRemoveExperience = (index) => {
    setExperiences((prevExperiences) => prevExperiences.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user._id}`);
      const userData = response.data;

      const updatedUserData = {
        ...userData,
        experience: experiences,
      };

      await axios.put(`https://swiftresume-backend.onrender.com/SignUpData/experience/${user._id}`, updatedUserData);
      setSaveSuccess(true); // Set success message state to true
      setTimeout(() => {
        setSaveSuccess(false); // Hide success message after a delay
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[90%] h-auto bg-[#d7f3ee] px-5 py-4 rounded-xl">
      <h1 className="text-xl font-semibold mb-1">Experience</h1>
      <p className="text-[14px] mb-5">Tell us about your most recent job.</p>
      <form className="text-[14px] font-light" onSubmit={handleSave}>
        {experiences.map((experience, index) => (
          <div key={index} className="mb-4">
            <div className="flex gap-20 mb-4 max-[426px]:block">
              <div>
                <label className="block mb-1" htmlFor="positionTitle">Position Title</label>
                <input
                  type="text"
                  id="positionTitle"
                  value={experience.positionTitle}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  value={experience.companyName}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
            </div>
            <div className="flex gap-20 mb-4 max-[426px]:block">
              <div>
                <label className="block mb-1" htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={experience.city}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  value={experience.state}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
            </div>
            <div className="flex gap-20 mb-4 max-[426px]:block">
              <div>
                <label className="block mb-1" htmlFor="startDate">Start Date</label>
                <input
                  type="month"
                  id="startDate"
                  value={experience.startDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="endDate">End Date</label>
                <input
                  type="month"
                  id="endDate"
                  value={experience.endDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="workSummary">Work Summary</label>
              <textarea
                id="workSummary"
                value={experience.workSummary}
                rows={2}
                maxLength={250}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-[580px] h-[100px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] resize-none px-3 py-2 max-[426px]:w-[100%]"
                placeholder="e.g. Supported mentor teacher throughout lessons by preparing."
              />
            </div>
            {index > 0 && (
              <div className="flex justify-end mb-4">
                <button className='px-4 py-2 bg-red-600 text-white rounded-md text-[16px] font-semibold active:scale-95 duration-150'><DeleteOutlined
                  onClick={() => handleRemoveExperience(index)}
                  className="cursor-pointer   "
                />
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-1 mb-4 cursor-pointer" onClick={handleAddExperience}>
          <PlusOutlined />
          <span>Add more Experience</span>
        </div>
        <div className="w-[100%] flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[#135c4d] text-white rounded-md text-[16px] font-semibold active:scale-95 duration-150"
          >
            Save
          </button>
        </div>
      </form>
      {saveSuccess && (
        <div className="absolute top-0 right-6 m-4 p-4 z-50 bg-[#d7f3ee] text-black rounded-md shadow-md max-[426px]:p-2 max-[426px]:text-[12px]">
          <CheckCircleOutlined className="text-green-600 pr-2"/>Experience saved successfully!
        </div>
      )}
    </div>
  );
};

export default Experience;
