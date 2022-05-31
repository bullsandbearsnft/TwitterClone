import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import "./App.css";
import { useMoralis } from "react-moralis";
import { ConnectButton, Icon } from "web3uikit";

const App = () => {
  const { isAuthenticated, Moralis } = useMoralis();

  return (
    <>
    {isAuthenticated ? (
      <div className="page">
        <div className="sideBar">
          <Sidebar />
          <div
              className="logout"
              onClick={() => {
                Moralis.User.logOut().then(() => {
                  window.location.reload();
                });
              }}
            >
              Logout
            </div>
        </div>
        <div className="mainWindow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
      ) : (
        <div className="loginPage">
          <Icon fill="#ffffff" size={100} svg="bell"/>
          <ConnectButton />
          <div className="welcome">
            <h3>Write your message forever on the blockchain</h3>
            <h3>Powered by Moralis SKD</h3>
          </div>          
        </div>
      )}
    </>
  );  
};

export default App;
