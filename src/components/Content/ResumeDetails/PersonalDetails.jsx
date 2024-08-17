import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { PlusOutlined, MinusCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';


const PersonalDetails = () => {
  const location = useLocation();
  const { user } = location.state || {};
  console.log(user);

  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    nationality: "",
    phoneNumber: "",
    email: "",
    summary: "",
    links: [""]
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user?._id}`);
      const userData = res.data;
      console.log(userData);
      
      if (userData && userData.personalInfo) {
        setDetails({
          ...userData.personalInfo,
          links: Array.isArray(userData.personalInfo.links) ? userData.personalInfo.links : [""]
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  

  useEffect(() => {
    getData();
  }, [user?._id]);

  const handlePersonalDetails = (e) => {
    const { id, value } = e.target;
    setDetails((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...details.links];
    newLinks[index] = value;
    setDetails({ ...details, links: newLinks });
  };

  const handleAddLink = () => {
    setDetails((prevData) => ({
      ...prevData,
      links: [...prevData.links, ""]
    }));
  };

  const handleRemoveLink = (index) => {
    const newLinks = details.links.filter((_, i) => i !== index);
    setDetails({ ...details, links: newLinks });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // Fetch the existing user data
      const response = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user._id}`);
      const userData = response.data;
      console.log(userData);
  
      // Prepare the update data with only personal details
      const updatePersonalDetails = {
        ...userData,
        personalDetails: details, // Only send the personal details part
      };
  
      // Send the PUT request with the personal details
      await axios.put(`https://swiftresume-backend.onrender.com/SignUpData/personal/${user._id}`, updatePersonalDetails);
  
      setSaveSuccess(true); // Set success message state to true
      setTimeout(() => {
        setSaveSuccess(false); // Hide success message after a delay
      }, 2000);
    } catch (error) {
      console.error(error);
      setSaveError("Failed to save details. Please try again.");
    }
  };
  
  return (
    <div className="w-[90%] h-auto bg-[#d7f3ee] px-5 py-4 rounded-xl">
      <h1 className="text-xl font-semibold mb-1">Personal Details</h1>
      <p className="text-[14px] mb-5">
        Get started with the basics: your name and contact information.
      </p>
      <form className="text-[14px] font-light" onSubmit={handleAdd}>
        <div className="flex gap-20 mb-4 max-[426px]:block">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={details.firstName}
              onChange={handlePersonalDetails}
              className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={details.lastName}
              onChange={handlePersonalDetails}
              className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="jobTitle">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            value={details.jobTitle}
            onChange={handlePersonalDetails}
            className="w-[580px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
          />
        </div>
        <div className="flex gap-20 mb-4 max-[426px]:block">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={details.address}
              onChange={handlePersonalDetails}
              className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="nationality">
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              value={details.nationality}
              onChange={handlePersonalDetails}
              className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
            />
          </div>
        </div>
        <div className="flex gap-20 mb-4 max-[426px]:block">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={details.phoneNumber}
              onChange={handlePersonalDetails}
              className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={details.email}
              onChange={handlePersonalDetails}
              className="w-[250px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="summary">
            Objective
          </label>
          <textarea
            type="tel"
            id="summary"
            value={details.summary}
            rows={3}
            maxLength={250}
            onChange={handlePersonalDetails}
            className="w-[580px] h-[100px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] resize-none px-3 py-2 max-[426px]:w-[100%]"
            placeholder="e.g. Supported mentor teacher throughout lessons by preparing."
          />
        </div>
        <div className="w-[150px] flex items-center gap-1 mb-4 cursor-pointer" onClick={handleAddLink}>
          <PlusOutlined />
          <span>Add Social Links</span>
        </div>
        {details.links.map((link, index) => (
          <div key={index} className="w-[100%] mb-4 flex items-center gap-2">
            <input
              type="text"
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              className="flex-1 h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3"
            />
            <MinusCircleOutlined onClick={() => handleRemoveLink(index)} className="cursor-pointer text-red-500 text-[18px] mb-2" />
          </div>
        ))}
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
          <CheckCircleOutlined className="text-green-600 pr-2"/>Personal details saved successfully!
        </div>
      )}
      {saveError && (
        <div className="absolute top-4 right-80 m-4 px-4 py-2 bg-white text-black rounded-md shadow-md">
          {saveError}
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;

