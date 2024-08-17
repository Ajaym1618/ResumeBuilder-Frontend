import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import axios from "axios";
import Logo from "../../../assets/Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import SignUp from "./signUp";

const LoginSignUp = ({ type }) => {
  const clientId = "1049418733146-on6erin6fladndijbu7uakauhf968l10.apps.googleusercontent.com";

  const [loSi, setLoSi] = useState(type || "login");
  const [userInfo, setUserInfo] = useState([]);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  }, [clientId]);

  useEffect(() => {
    if (location.pathname === '/signup') {
      setLoSi('signup');
    } else {
      setLoSi('login');
    }
  }, [location]);

  const getData = async () => {
    try {
      const res = await axios.get("https://swiftresume-backend.onrender.com/SignUpData");
      setUserInfo(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#100f0f] flex justify-center m-auto">
      <div className="w-[40%] h-screen flex flex-col text-white pt-[150px] max-[768px]:w-[40%] max-[768px]:pl-5 max-[426px]:hidden">
        <img
          src={Logo}
          alt="Logo"
          className="w-[300px] h-[70px] mb-6 max-[768px]:w-[250px] h-[60px]"
        />
        <h1 className="text-5xl w-[620px] leading-[70px] max-[768px]:text-2xl max-[768px]:w-[320px]">
          Your resume is an extension of yourself - make one that's truly you!
        </h1>
      </div>
      <div className="w-[40%] flex justify-center items-center max-[768px]:w-[60%] max-[426px]:w-[100%]">
        <div className="w-[70%] h-auto rounded-xl bg-[#d7f3ee] py-6 px-4 flex items-center flex-col max-[426px]:w-[90%]">
          <h1 className="text-xl mb-6">
            Welcome to
            <span className="text-[#135c4d] ml-1 font-semibold">
              Swift Resume
            </span>
          </h1>
          <div className="w-[180px] py-1 px-1 text-[12px] rounded-[30px] text-white flex justify-between bg-black mb-[20px]">
            <Link
              to="/signup"
              className={`px-5 py-[5px] rounded-[30px] text-[#9ce2d8] cursor-pointer ${loSi === "signup" ? "bg-[#135c4d] text-white" : ""}`}
            >
              SignUp
            </Link>
            <Link
              to="/login"
              className={`px-6 py-[5px] rounded-[30px] text-[#9ce2d8] cursor-pointer ${loSi === "login" ? "bg-[#135c4d] text-white" : ""}`}
            >
              Login
            </Link>
          </div>
          {/* <div className="border border-[#135c4d] pb-[3px] rounded-[2px]">
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                onSuccess={(response) => {
                  console.log("Login Success:", response);
                  const profile = gapi.auth2
                    .getAuthInstance()
                    .currentUser.get()
                    .getBasicProfile();
                  const userInfo = {
                    name: profile.getName(),
                    imageUrl: profile.getImageUrl(),
                  };
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div> */}
          {loSi === "login" ? (
            <Login/>
          ) : (
            <SignUp/>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;



