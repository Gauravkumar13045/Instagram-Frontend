import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./signup.jsx"
import Login from "./login.jsx";
import Dashboard from "./dashboard.jsx";
import meta from "../src/images/meta.png";
import logo from "../src/images/logo.png";
import Loading from "./loading.jsx"


function App() {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("https://kz9sppkz-5000.inc1.devtunnels.ms/profile", {
                // const res = await fetch("http://localhost:5000/profile", {

                    credentials: "include"
                });

                if (res.ok) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            } catch (err) {
                setIsAuth(false);
            }
        };

        checkAuth();
    }, []);


    if (isAuth === null) {
        return <div className="min-h-screen bg-black flex items-center justify-center">
             <Loading />
        </div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={isAuth ? <Navigate to="/dashboard" replace /> : <Login />}
                />

                <Route
                    path="/dashboard"
                    element={isAuth ? <Dashboard /> : <Navigate to="/" replace />}
                />

               <Route path="/signup" element={<Signup/>}></Route>

               <Route path="/signin" element={<Login/>}></Route>
            </Routes>
        </BrowserRouter>

        

    );
}

export default App;