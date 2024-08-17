import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { PlusOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const Hobbies = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [hobbies, setHobbies] = useState({
    hobby: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user?._id}`);
        const userData = response.data;
        if (userData && userData.hobbies) {
          setHobbies({ hobby: userData.hobbies });
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [user?._id]);

  const handleHobbyChange = (e, index) => {
    const { value } = e.target;
    setHobbies((prevHobbies) => ({
      ...prevHobbies,
      hobby: prevHobbies.hobby.map((hobby, idx) =>
        idx === index ? { ...hobby, name: value } : hobby
      ),
    }));
  };

  const addHobby = () => {
    setHobbies((prevHobbies) => ({
      ...prevHobbies,
      hobby: [...prevHobbies.hobby, { name: "" }],
    }));
  };

  const deleteHobby = async (index) => {
    try {
      // Remove the hobby locally
      const updatedHobbies = hobbies.hobby.filter((_, idx) => idx !== index);
      setHobbies((prevHobbies) => ({
        ...prevHobbies,
        hobby: updatedHobbies,
      }));
  
      // Make a DELETE request to the server
      await axios.delete(`https://swiftresume-backend.onrender.com/SignUpData/hobby/${user._id}/${index}`);
  
      // Set success state
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting hobby", error);
      setSaveError("Failed to delete hobby. Please try again.");
    }
  };
  

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user._id}`);
      const userData = response.data;
      const updatedUserData = {
        ...userData,
        hobbies: hobbies.hobby,
      };

      await axios.put(`https://swiftresume-backend.onrender.com/SignUpData/hobby/${user._id}`, updatedUserData);
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
    <div className="w-[90%] h-[500px] bg-[#d7f3ee] px-5 py-4 rounded-xl">
      <h1 className="text-xl font-semibold mb-1">Hobbies</h1>
      <p className="text-[14px] mb-5">
        Add your hobbies..
      </p>
      <form className="text-[14px] font-light" onSubmit={handleAdd}>
        {hobbies.hobby.map((hobby, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div>
              <label className="mr-3" htmlFor={`hobby-${index}`}>
                {`Hobby ${index + 1}`}
              </label>
              <input
                type="text"
                id={`hobby-${index}`}
                value={hobby.name}
                onChange={(e) => handleHobbyChange(e, index)}
                className="w-[460px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[768px]:w-[80%] max-[426px]:w-[50%] mr-2"
              />
              <button
                type="button"
                className="text-[14px] text-red-600 cursor-pointer px-3 py-2 text-white bg-red-600 rounded-md"
                onClick={() => deleteHobby(index)}
              >
                <DeleteOutlined />
              </button>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-1 cursor-pointer" onClick={addHobby}>
          <PlusOutlined /> Add more hobbies
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
          <CheckCircleOutlined className="text-green-600 pr-2" /> Hobbies saved successfully!
        </div>
      )}
    </div>
  );
};

export default Hobbies;


