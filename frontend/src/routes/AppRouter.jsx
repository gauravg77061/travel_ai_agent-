import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import axios from "axios";

import AuthPage from "../pages/AuthPage";

import Dashboard from "../pages/Dashboard";

import ChatPage from "../pages/ChatPage";

import BASE_URL from "../services/axios";

import { setUser } from "../redux/slices/authSlice";

const AppRoutes = () => {

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();

  const fetchProfile = async () => {

    try {

      const response = await axios.get(
        BASE_URL + "profile/view",
        {
          withCredentials: true,
        }
      );

      dispatch(setUser(response.data.data));

      setIsAuthenticated(true);

    } catch (error) {

      console.log(error);

      setIsAuthenticated(false);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProfile();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">

        Loading...

      </div>

    );

  }

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Route */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" />
              : <AuthPage />
          }
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated
              ? <Dashboard />
              : <Navigate to="/" />
          }
        />

        {/* Protected Chat */}
        <Route
          path="/chat/:groupId"
          element={
            isAuthenticated
              ? <ChatPage />
              : <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>

  );

};

export default AppRoutes;