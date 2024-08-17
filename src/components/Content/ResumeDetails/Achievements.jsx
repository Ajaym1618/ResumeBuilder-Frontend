import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  PlusOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const Achievements = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [details, setDetails] = useState([
    {
      courseName: "",
      academyInstitution: "",
      startDate: "",
      endDate: "",
      location: "",
    },
  ]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://swiftresume-backend.onrender.com/SignUpData/${user?._id}`
      );
      const userData = res.data;
      if (userData && userData.achievements) {
        setDetails(userData.achievements);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, [user?._id]);

  const handleAchievements = (index, e) => {
    const { id, value } = e.target;
    setDetails((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails[index][id] = value;
      return newDetails;
    });
  };

  const addAchievementForm = () => {
    setDetails([
      ...details,
      {
        courseName: "",
        academyInstitution: "",
        startDate: "",
        endDate: "",
        location: "",
      },
    ]);
  };

  // const removeAchievementForm = (index) => {
  //   setDetails(details.filter((_, i) => i !== index));
  // };

  const removeAchievementForm = async (index) => {
    try {
      // Remove the achievement locally
      const updatedAchievements = details.filter((_, idx) => idx !== index);
      setDetails(updatedAchievements);

      // Make a DELETE request to the server
      await axios.delete(`https://swiftresume-backend.onrender.com/SignUpData/achievement/${user._id}/${index}`);

      // Set success state
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting achievement", error);
      setSaveError("Failed to delete achievement. Please try again.");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://swiftresume-backend.onrender.com/SignUpData/${user._id}`
      );
      const userData = response.data;

      const updateAchievements = {
        ...userData,
        achievements: details,
      };

      await axios.put(
        `https://swiftresume-backend.onrender.com/SignUpData/achievement/${user._id}`,
        updateAchievements
      );
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
      <h1 className="text-xl font-semibold mb-1">
        Achievements / Certificates
      </h1>
      <p className="text-[14px] mb-5">
        Add your most relevant education related achievements and certificates.
      </p>
      <form className="text-[14px] font-light" onSubmit={handleAdd}>
        {details.map((detail, index) => (
          <div key={index} className="flex flex-col gap-4 mb-4">
            <div className="flex gap-20 mb-4 max-[426px]:block">
              <div>
                <label className="block mb-1" htmlFor={`courseName-${index}`}>
                  Course Name
                </label>
                <input
                  type="text"
                  id="courseName"
                  value={detail.courseName}
                  onChange={(e) => handleAchievements(index, e)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
              <div>
                <label
                  className="block mb-1"
                  htmlFor={`academyInstitution-${index}`}
                >
                  Academy / Institution
                </label>
                <input
                  type="text"
                  id="academyInstitution"
                  value={detail.academyInstitution}
                  onChange={(e) => handleAchievements(index, e)}
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
                  value={detail.startDate}
                  onChange={(e) => handleAchievements(index, e)}
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
                  value={detail.endDate}
                  onChange={(e) => handleAchievements(index, e)}
                  className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1" htmlFor={`location-${index}`}>
                Location
              </label>
              <input
                type="text"
                id="location"
                value={detail.location}
                onChange={(e) => handleAchievements(index, e)}
                className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
              />
            </div>
            {details.length > 1 && (
              <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => removeAchievementForm(index)}
                className="text-[16px] text-red-600 cursor-pointer px-3 py-2 text-white bg-red-600 rounded-md flex items-center gap-1"
              >
                <DeleteOutlined />
              </button>
              </div>
            )}
          </div>
        ))}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={addAchievementForm}
        >
          <PlusOutlined /> Add more Certificates
        </div>
        <div className="w-[100%] flex justify-end mt-4">
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
          Achievements saved successfully!
        </div>
      )}
    </div>
  );
};

export default Achievements;
