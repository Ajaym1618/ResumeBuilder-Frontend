import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import usePasswordToggle from "../../../hooks/usePasswordToggle";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [emailValid, setEmailValid] = useState(true);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordType, PasswordIcon] = usePasswordToggle();
  const [confirmPasswordType, ConfirmPasswordIcon] = usePasswordToggle();

  const navigate = useNavigate();

  const [signUpError, setsignUpError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://swiftresume-backend.onrender.com/SignUpData"
      );
      setUserInfo(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  });

  const postData = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setsignUpError("*Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "https://swiftresume-backend.onrender.com/SignUpData",
        signupData
      );
      console.log(response.data);
      setsignUpError(""); // Clear the error message on successful signup
      setSignupSuccess(true); // Set signup success state to true
      setTimeout(() => navigate("/login"), 1000); // Navigate after 2 seconds
    } catch (error) {
      console.error("There was an error signing up!", error);
      setsignUpError("Sign Up Failed! Please try again.");
    }
  };
  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [id]: value }));
    if (id === "password" || id === "confirmPassword") {
      setsignUpError("");
    }
  };

  return (
    <>
      <form className="w-[100%]" onSubmit={postData}>
        <div className="mt-[30px] w-[80%] h-auto flex flex-col justify-center m-auto gap-2">
          <label htmlFor="email" className="block text-[12px]">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={signupData.email}
            onChange={handleSignupChange}
            required
            pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
            className="py-[8px] px-2 pl-5 border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d]"
            placeholder="Enter your email"
          />
          {!emailValid && (
            <p className="text-red-500 text-sm">
              Please enter a valid email address.
            </p>
          )}
          <div className="w-[100%] relative">
            <label htmlFor="password" className="block text-[12px]">
              Password
            </label>
            <input
              type={passwordType}
              id="password"
              value={signupData.password}
              onChange={handleSignupChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Password must contain at least 8 characters, including uppercase, lowercase letters, and numbers."
              className="w-[100%] py-[8px] px-2 pl-5 border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d] "
              placeholder="Enter your password"
            />
            <span className="absolute top-6 right-3 max-md:top-7">
              {PasswordIcon}
            </span>
          </div>
          <div className="w-[100%] relative">
            <label htmlFor="confirmPassword" className="block text-[12px]">
              Confirm Password
            </label>
            <input
              type={confirmPasswordType}
              id="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              className="py-[8px] px-2 pl-5 border border-[#135c4d] rounded-md text-[14px] mb-2 text-[#135c4d] outline-[#135c4d]"
              placeholder="Confirm your password"
            />
             <span className="absolute top-6 right-3 max-md:top-7">
              {ConfirmPasswordIcon}
            </span>
          </div>
          {signUpError && (
            <p className="text-red-500 text-[12px]">{signUpError}</p>
          )}
        </div>
        <div className="w-[100%] flex justify-end items-center mt-5">
          <button
            className="border border-[#135c4d] bg-[#135c4d] text-white px-12 py-2 text-[12px] rounded-md"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
      {signupSuccess && (
        <div className="fixed top-4 right-80 m-4 px-4 py-2 bg-white text-black rounded-md shadow-md max-[768px]:right-4 max-[768px]:top-0 max-[768px]:px-2 max-[768px]:py-2 max-[768px]:text-[12px]">
          <span className="flex gap-3 max-[768px]:gap-1">
            <CheckCircleOutlined className="text-green-600" />
            Sign Up Successful!
          </span>
        </div>
      )}
      {signUpError && (
        <div className="fixed top-4 right-80 m-4 px-4 py-2 bg-white text-black rounded-md shadow-md max-[768px]:right-4 max-[768px]:top-0 max-[768px]:px-2 max-[768px]:py-2 max-[768px]:text-[12px]">
          <span className="flex gap-3 max-[768px]:gap-1">
            <CloseCircleOutlined className="text-green-600" />
            {signUpError}
          </span>
        </div>
      )}
    </>
  );
};

export default SignUp;
