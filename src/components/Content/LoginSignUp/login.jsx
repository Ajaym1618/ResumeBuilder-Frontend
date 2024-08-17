import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import usePasswordToggle from "../../../hooks/usePasswordToggle";

const Login = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [passwordType, PasswordIcon] = usePasswordToggle();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      await axios
        .get("https://swiftresume-backend.onrender.com/SignUpData")
        .then((res) => setUserInfo(res.data));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  });

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [id]: value }));
  };

  const compareLoginData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://swiftresume-backend.onrender.com/LoginData",
        loginData
      );
      if (response.status === 200) {
        const user = await userInfo.find(
          (user) => user.email === loginData.email && user.password
        );
        if (user) {
          setLoginSuccess(true); // Set signup success state to true
          setTimeout(() => navigate("/", { state: { user } }), 1000);
        }
      }
    } catch (error) {
      setLoginError("Invalid email or password");
      setTimeout(() => {
        setLoginError("");
      }, 2000);
    }
  };

  return (
    <>
      <form className="w-[100%]" onSubmit={compareLoginData}>
        <div className="mt-[30px] w-[80%] h-auto flex flex-col justify-center m-auto gap-2">
          <label htmlFor="email" className="block text-[12px]">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
            className=" py-[8px] px-2 pl-5 border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d]"
            placeholder="Enter your email"
          />
          <div className="w-[100%] relative">
            <label htmlFor="password" className="block text-[12px]">
              Password
            </label>
            <input
              type={passwordType}
              id="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              className="w-[100%] py-[8px] px-2 pl-5 border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d]"
              placeholder="Enter your password"
            />
            <span className="absolute top-6 right-3 max-md:top-7">
              {PasswordIcon}
            </span>
          </div>
        </div>
        <div className="w-[100%] flex justify-end items-center mt-5">
          <button
            className="border border-[#135c4d] bg-[#135c4d] text-white px-12 py-2 text-[12px] rounded-md"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      {loginSuccess && (
        <div className="fixed top-4 right-80 m-4 px-4 py-2 bg-white text-black rounded-md shadow-md max-[768px]:right-4 max-[768px]:top-0 max-[768px]:px-2  max-[768px]:py-2 max-[768px]:text-[12px]">
          <span className="flex gap-3 max-[768px]:gap-1">
            <CheckCircleOutlined className="text-green-600" />
            Login Successful!
          </span>
        </div>
      )}
      {loginError && (
        <div className="fixed top-4 right-80 m-4 px-4 py-2 bg-white text-black rounded-md shadow-md max-[768px]:right-4 max-[768px]:top-0 max-[768px]:px-2  max-[768px]:py-2 max-[768px]:text-[12px]">
          <CloseCircleOutlined className="text-red-600 pr-2" />
          {loginError}
        </div>
      )}
    </>
  );
};

export default Login;
