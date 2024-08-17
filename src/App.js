import React from "react";
import Header from "./components/Content/Header";
import HomePage from "./components/Content/HomePage";
import LoginSignUp from "./components/Content/LoginSignUp/LoginSignUp";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import DataEntryPage from "./components/Content/Template/DataEntryTemplate";
import TemplateView from "./components/Content/TemplateView";
import AllTemplates from "./components/Content/AllTemplates";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginSignUp type="login" />} />
        <Route path="/signUp" element={<LoginSignUp type="signUp" />} />
        <Route path="/template" element={<DataEntryPage/>}></Route>
        <Route path="/templateView" element={<TemplateView/>}></Route>
        <Route path="/AllTemplate" element={<AllTemplates/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
