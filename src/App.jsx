import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./login.jsx";
import Dashboard from "./dashboard.jsx";

function App() {
    const [isAuth, setIsAuth] = useState(null);   // null = loading state

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        setIsAuth(auth === "true");
    }, []);

    
    if (isAuth === null) {
        return <div className="min-h-screen bg-black flex items-center justify-center">
            <p className="text-white">Loading...</p>
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;