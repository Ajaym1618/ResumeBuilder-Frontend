import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { PlusOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Project = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user?._id) {
      getData();
    }
  }, [user?._id]);

  const getData = async () => {
    try {
      const response = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user?._id}`);
      const userData = response.data;
      if (userData && Array.isArray(userData.projects)) {
        setProjects(userData.projects.length ? userData.projects : [{
          projectName: "",
          description: ""
        }]);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    setProjects([...projects, {
      projectName: "",
      description: ""
    }]);
  };

  const handleRemoveProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://swiftresume-backend.onrender.com/SignUpData/${user._id}`);
      const userData = response.data;

      const updatedUserData = {
        ...userData,
        projects: projects,
      };

      await axios.put(`https://swiftresume-backend.onrender.com/SignUpData/project/${user._id}`, updatedUserData);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[90%] h-auto bg-[#d7f3ee] px-5 py-4 rounded-xl">
      <h1 className="text-xl font-semibold mb-1">Projects</h1>
      <p className="text-[14px] mb-5">Describe your projects</p>
      <form className="text-[14px] font-light" onSubmit={handleSave}>
        {projects.map((project, index) => (
          <div key={index} className="mb-4">
            <div className="mb-4">
              <label className="block mb-1" htmlFor={`projectName-${index}`}>
                Project Name
              </label>
              <input
                type="text"
                id={`projectName-${index}`}
                value={project.projectName}
                onChange={(e) => handleProjectChange(index, 'projectName', e.target.value)}
                className="w-[580px] h-[30px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 max-[426px]:w-[100%]"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor={`description-${index}`}>
                Description
              </label>
              <textarea
                id={`description-${index}`}
                value={project.description}
                rows={2}
                maxLength={250}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                className="w-[580px] h-[100px] border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] px-3 py-2 resize-none max-[426px]:w-[100%]"
                placeholder="Describe the project..."
              />
            </div>
            {index > 0 && (
              <div className="flex justify-end mb-4">
                <button className="px-4 py-2 bg-red-600 text-white rounded-md text-[16px] font-semibold active:scale-95 duration-150">
                  <DeleteOutlined onClick={() => handleRemoveProject(index)} />
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-1 mb-4 cursor-pointer" onClick={handleAddProject}>
          <PlusOutlined />
          <span>Add more projects</span>
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
          <CheckCircleOutlined className="text-green-600 pr-2"/>Projects saved successfully!
        </div>
      )}
    </div>
  );
};

export default Project;

