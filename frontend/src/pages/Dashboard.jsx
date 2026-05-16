import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setUser } from "../redux/slices/authSlice";

import BASE_URL from "../services/axios";

import Navbar from "../components/Navbar";

import MainArea from "../components/MainArea";

import SideBar from "../components/Sidebar";

const Dashboard = () => {

  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchProfile = async () => {

    try {

      const response = await axios.get(
        BASE_URL + "profile/view",
        {
          withCredentials: true,
        }
      );

      setUserData(response.data.data);

      dispatch(setUser(response.data.data));

    } catch (error) {

      console.log(error);

      navigate("/");

    }

  };

  useEffect(() => {

    fetchProfile();

  }, []);

  if (!userData) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black">

      {/* Navbar */}
      <Navbar userData={userData} />

      {/* Dashboard Body */}
      <div className="flex">

        {/* Sidebar */}
        <SideBar />

        {/* Main Area */}
        <MainArea userData={userData} />

      </div>

    </div>

  );

};

export default Dashboard;