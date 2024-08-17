import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Logo from "../../assets/Logo.png";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-scroll";

const Header = () => {
  const [logOut, setLogOut] = useState(false);
  const location = useLocation();
  const { user } = location.state || {};
  console.log(user);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const getName = (name) => {
    return name?.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    setLogOut(true);
    navigate("/");
    setTimeout(() => setLogOut(false), 800); // Reset logOut to false after 1000ms
  };

  return (
    <>
      <div className="w-screen h-[15vh] relative bg-[#100f0f] text-white px-20 py-3 flex justify-between items-center max-[426px]:px-6">
        <img
          src={Logo}
          alt="Logo"
          className="w-[250px] h-[60px] cursor-pointer max-[426px]:w-[150px] max-[426px]:h-[40px]"
        />
        <div className="flex items-center gap-10 max-[768px]:gap-1">
          {user ? (
            <>
              <p
                className="cursor-pointer flex justify-center text-[20px] bg-[#125e4b] w-[50px] h-[50px] rounded-[25px] items-center hover:border-[#9ce2d8] hover:text-[#9ce2d8]"
                onClick={() => setShow(!show)}
              >
                {getName(user.email)}
              </p>
              {show && (
                <div className="absolute w-[120px] h-[100px] top-24 right-[245px] bg-[#125e4b] text-white rounded-md px-4 py-4 flex justify-center items-center flex-col gap-2 max-[768px]:right-11 max-[426px]:right-0">
                  <div className="text-[12px] border-y border-gray-400 py-2">
                    <h1>{user?.email && user.email}</h1>
                  </div>
                  <div className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <p
                className="cursor-pointer flex justify-center border border-white px-4 py-2 rounded-[20px] items-center hover:border-[#9ce2d8] hover:text-[#9ce2d8] max-[768px]:hidden"
                onClick={() => navigate("/login")}
              >
                <UserOutlined className="mr-2" />
                Sign in
              </p>
              <p
                className="border border-[#9ce2d8] text-[#9ce2d8] rounded-[50%] w-[30px] h-[30px] flex justify-center items-center min-[769px]:hidden"
                onClick={() => navigate("/login")}
              >
                <UserOutlined />
              </p>
            </>
          )}

          <Link to="templateView" spy={true} smooth={true} offset={0} duration={200}>
            <div className="border-2 rounded-md p-3 border-[#9ce2d8] text-[#9ce2d8] cursor-pointer hover:border-[#407179] hover:text-[#407179] max-[768px]:hidden">
              Build My Resume
            </div>
          </Link>
        </div>
      </div>
      {logOut && (
        <div className="fixed top-4 right-96 m-4 px-4 py-2 bg-white text-black rounded-md shadow-md max-[768px]:right-4 max-[768px]:top-0 max-[768px]:px-2  max-[768px]:py-2 max-[768px]:text-[12px]">
          <span className="flex gap-3 max-[768px]:gap-1">
            <CheckCircleOutlined className="text-green-600" />
            Logout Successful!
          </span>
        </div>
      )}
    </>
  );
};

export default Header;
