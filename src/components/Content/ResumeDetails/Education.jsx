import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { PlusOutlined, CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const Education = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [educationList, setEducationList] = useState([
    {
      schoolName: "",
      schoolLocation: "",
      startDate: "",
      endDate: "",
      degree: "",
      fieldOfStudy: "",
      percentage: ""
    }
  ]);

  const getData = async () => {
    try {
      const res = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user?._id}`);
      const userData = res.data;
      if (userData && Array.isArray(userData.education)) {
        setEducationList(userData.education);
      } else {
        setEducationList([
          {
            schoolName: "",
            schoolLocation: "",
            startDate: "",
            endDate: "",
            degree: "",
            fieldOfStudy: "",
            percentage: ""
          }
        ]);
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

  const handleEducationChange = (e, index) => {
    const { id, value } = e.target;
    setEducationList((prevList) =>
      prevList.map((edu, i) => (i === index ? { ...edu, [id]: value } : edu))
    );
  };

  const handleAdd = () => {
    setEducationList((prevList) => [
      ...prevList,
      {
        schoolName: "",
        schoolLocation: "",
        startDate: "",
        endDate: "",
        degree: "",
        fieldOfStudy: "",
        percentage: ""
      }
    ]);
  };

  const handleDelete = (index) => {
    setEducationList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user._id}`);
      const userData = response.data;

      const updateEducation = {
        ...userData,
        education: educationList
      };

      await axios.put(`https://swiftresume-backend.onrender.com/SignUpData/education/${user._id}`, updateEducation);
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
    <div className="w-[90%] h-auto bg-[#d7f3ee] px-5 py-4 rounded-xl">
      <h1 className="text-xl font-semibold mb-1">Education</h1>
      <p className="text-[14px] mb-5">
        Add your most relevant education, including programs you're currently enrolled in.
      </p>
      <form className="text-[14px] font-light" onSubmit={handleSave}>
        {educationList.map((details, index) => (
          <div key={index} className="mb-4">
            <div className="flex gap-20 mb-4 max-[426px]:block">
              <div>
                <label className="block mb-1" htmlFor={`schoolName-${index}`}>
                  School Name
                </label>
                <input
                  type="text"
                  id="schoolName"
                  value={details.schoolName}
                  onChange={(e) => handleEducationChange(e, index)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor={`schoolLocation-${index}`}>
                  School Location
                </label>
                <input
                  type="text"
                  id="schoolLocation"
                  value={details.schoolLocation}
                  onChange={(e) => handleEducationChange(e, index)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
            </div>
            <div className="flex gap-20 mb-4 max-[426px]:block">
              <div>
                <label className="block mb-1" htmlFor={`startDate-${index}`}>
                  Start Date
                </label>
                <input
                  type="month"
                  id="startDate"
                  value={details.startDate}
                  onChange={(e) => handleEducationChange(e, index)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor={`endDate-${index}`}>
                  End Date
                </label>
                <input
                  type="month"
                  id="endDate"
                  value={details.endDate}
                  onChange={(e) => handleEducationChange(e, index)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
            </div>
            <div className="flex gap-20 mb-4 max-[426px]:block">
              <div>
                <label className="block mb-1" htmlFor={`degree-${index}`}>
                  Degree
                </label>
                <input
                  type="text"
                  id="degree"
                  value={details.degree}
                  onChange={(e) => handleEducationChange(e, index)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor={`fieldOfStudy-${index}`}>
                  Field of Study
                </label>
                <input
                  type="text"
                  id="fieldOfStudy"
                  value={details.fieldOfStudy}
                  onChange={(e) => handleEducationChange(e, index)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
            </div>
            <div className="flex gap-20 mb-4 max-[426px]:block">
              <div>
                <label className="block mb-1" htmlFor={`percentage-${index}`}>
                  Percentage
                </label>
                <input
                  type="number"
                  id="percentage"
                  value={details.percentage}
                  onChange={(e) => handleEducationChange(e, index)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
            </div>
            {educationList.length > 1 && (
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-[16px] font-semibold active:scale-95 duration-150"
                >
                  <DeleteOutlined />
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="w-[160px] flex items-center gap-1 mb-4 cursor-pointer" onClick={handleAdd}>
          <PlusOutlined  /> Add more Education
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
          <CheckCircleOutlined className="text-green-600 pr-2" />
          Education saved successfully!
        </div>
      )}
      {saveError && <div className="text-red-600 mt-4">{saveError}</div>}
    </div>
  );
};

export default Education;
