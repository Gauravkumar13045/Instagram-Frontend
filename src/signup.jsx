import React, { useState, useEffect } from "react";
import flower from "../src/images/flower.png";


function Signup() {

    const [helpIcon, SetHelpIcon] = useState(false);

<<<<<<< HEAD:instagram-clone/src/signup.jsx
    const [form, setForm] = useState({
        contact: "",
        password: "",
        fullName: "",
        username: "",
        month: "Month",
        day: "Day",
        year: "Year",
    });

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedForm = {
            ...form,
            [name]: value,
        };

        setForm(updatedForm);

        let newErrors = { ...errors };





        if (name === "contact") {
            const isPhone = /^\d+$/.test(value);
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            if (!value.trim()) {
                newErrors.contact = "Please enter a valid mobile number or email address.";
            } else if (isPhone && value.length !== 10) {
                newErrors.contact = "Mobile number should be of 10 digits";
            } else if (!isPhone && !isEmail) {
                newErrors.contact = "Please enter a valid email address";
            } else {
                delete newErrors.contact;
            }
        }

        if (name === "password") {
            if (!value.trim()) {
                newErrors.password = "Enter a valid password";
            } else if (value.length < 6) {
                newErrors.password = "Password must be atleast 6 characters";
            } else {
                delete newErrors.password;
            }
        }

        if (name === "fullName") {
            if (!value.trim()) {
                newErrors.fullName = "Enter your Full name";
            } else {
                delete newErrors.fullName;
            }
        }
        if (name === "username") {
            if (!value.trim()) {
                newErrors.username = "Enter username";
            }
            else if (value.length < 4) {
                newErrors.username = "Username too short";
            }
            else if (value.length > 30) {
                newErrors.username = "Username too long";
            }
            else if (!/^[a-zA-Z0-9._]+$/.test(value)) {
                newErrors.username = "Only letters, numbers, . and _ allowed";
            }
            else if (value.startsWith(".") || value.endsWith(".")) {
                newErrors.username = "Username cannot start or end with dot";
            }
            else if (value.includes("..")) {
                newErrors.username = "Username cannot have multiple dots";
            }
            else {
                delete newErrors.username;
            }
        }


        if (
            updatedForm.month !== "Month" &&
            updatedForm.day !== "Day" &&
            updatedForm.year !== "Year"
        ) {
            delete newErrors.birthday;
        }

        setErrors(newErrors);
    };



    const validateForm = () => {
        let newErrors = {};

        if (!form.contact.trim()) {
            newErrors.contact = "Please enter a valid mobile number or email address.";
        }

        if (!form.password) {
            newErrors.password = "Enter a combination of at least six numbers, letters and punctuation marks (like ! and &).";
        }

        if (!form.fullName.trim()) {
            newErrors.fullName = "Enter name";
        }



        if (!form.username.trim()) {
            newErrors.username = "Enter username";
        }
        else if (form.username.length < 3) {
            newErrors.username = "Username too short";
        }
        else if (form.username.length > 30) {
            newErrors.username = "Username too long";
        }
        else if (!/^[a-zA-Z0-9._]+$/.test(form.username)) {
            newErrors.username = "Only letters, numbers, . and _ allowed";
        }
        else if (
            form.username.startsWith(".") ||
            form.username.endsWith(".")
        ) {
            newErrors.username = "Username cannot start or end with dot";
        }
        else if (form.username.includes("..")) {
            newErrors.username = "Username cannot have multiple dots";
        }




        if (
            form.month === "Month" ||
            form.day === "Day" ||
            form.year === "Year"
        ) {
            newErrors.birthday = "Select your birthday. You can change who can see this later.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        console.log("Wait !! Data sending to backend ....");

        try {
            const response = await fetch("http://127.0.0.1:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: form.contact,
                    password: form.password,
                    username: form.username,
                    fullName: form.fullName,
                    birthday: `${form.year}-${form.month}-${form.day}`
                })

            });

            const data = await response.json();
            console.log("Response:", data);

            if (response.ok) {
                alert("Account created successfully");
                

            } else {
                alert(data.error || "Something went wrong");
            }


        } catch (error) {
            console.error("Error:", error);
            alert("Server error");

        }
    };






=======

    
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx


    return (
        <div className="min-h-screen flex flex-col items-center bg-black ">
            <header >
                <div className="p-2 mt-5 ">
                    <div className="p-1 ">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 transition-all duration-200 cursor-pointer">
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                            <svg viewBox="0 0 24 24" className="text-[#9FA4AB] cursor-pointer w-6 " fill="currentColor" aria-hidden="true"><path  d="M16.753 4.341a1 1 0 0 0-1.412-.094l-8 7a1 1 0 0 0 0 1.506l8 7a1 1 0 0 0 1.318-1.506L9.518 12l7.14-6.247a1 1 0 0 0 .094-1.412z"></path></svg>
=======
                            <svg viewBox="0 0 24 24" className="text-[#9FA4AB] cursor-pointer w-6 " fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.753 4.341a1 1 0 0 0-1.412-.094l-8 7a1 1 0 0 0 0 1.506l8 7a1 1 0 0 0 1.318-1.506L9.518 12l7.14-6.247a1 1 0 0 0 .094-1.412z"></path></svg>
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                        </div>
                    </div>

                    <div className="p-2 pl-5  ">
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                        <svg aria-label="Meta logo" className="text-[#DEE3E9] w-15" role="img" viewBox="0 0 500 100"><path  d="M185.508 3.01h18.704l31.803 57.313L267.818 3.01h18.297v94.175h-15.264v-72.18l-27.88 49.977h-14.319l-27.88-49.978v72.18h-15.264V3.01ZM336.281 98.87c-7.066 0-13.286-1.565-18.638-4.674-5.352-3.12-9.527-7.434-12.528-12.952-2.989-5.517-4.483-11.835-4.483-18.973 0-7.214 1.461-13.608 4.385-19.17 2.923-5.561 6.989-9.908 12.187-13.05 5.198-3.13 11.176-4.707 17.923-4.707 6.715 0 12.484 1.587 17.319 4.74 4.847 3.164 8.572 7.598 11.177 13.291 2.615 5.693 3.923 12.371 3.923 20.046v4.171h-51.793c.945 5.737 3.275 10.258 6.989 13.554 3.715 3.295 8.407 4.937 14.078 4.937 4.549 0 8.461-.667 11.747-2.014 3.286-1.347 6.374-3.383 9.253-6.12l8.099 9.886c-8.055 7.357-17.934 11.036-29.638 11.036Zm11.143-55.867c-3.198-3.252-7.385-4.872-12.56-4.872-5.045 0-9.264 1.653-12.66 4.97-3.407 3.318-5.55 7.784-6.451 13.39h37.133c-.451-5.737-2.275-10.237-5.462-13.488ZM386.513 39.467h-14.044V27.03h14.044V6.447h14.715V27.03h21.341v12.437h-21.341v31.552c0 5.244.901 8.988 2.703 11.233 1.803 2.244 4.88 3.36 9.253 3.36 1.935 0 3.572-.076 4.924-.23a97.992 97.992 0 0 0 4.461-.645v12.316c-1.67.493-3.549.898-5.637 1.205-2.099.317-4.286.47-6.583.47-15.89 0-23.836-8.649-23.836-25.957V39.467ZM500 97.185h-14.44v-9.82c-2.571 3.678-5.835 6.513-9.791 8.506-3.968 1.993-8.462 3-13.506 3-6.209 0-11.715-1.588-16.506-4.752-4.803-3.153-8.572-7.51-11.308-13.039-2.748-5.54-4.121-11.879-4.121-19.006 0-7.17 1.395-13.52 4.187-19.038 2.791-5.518 6.648-9.843 11.571-12.985 4.935-3.13 10.594-4.707 16.99-4.707 4.813 0 9.132.93 12.956 2.791a25.708 25.708 0 0 1 9.528 7.905v-9.01H500v70.155Zm-14.715-45.61c-1.571-3.985-4.066-7.138-7.461-9.448-3.396-2.31-7.33-3.46-11.781-3.46-6.308 0-11.319 2.102-15.055 6.317-3.737 4.215-5.605 9.92-5.605 17.09 0 7.215 1.802 12.94 5.396 17.156 3.604 4.215 8.484 6.317 14.66 6.317 4.538 0 8.593-1.16 12.154-3.492 3.549-2.332 6.121-5.475 7.692-9.427V51.575Z" fill="#DEE3E9"></path><path d="M107.666 0C95.358 0 86.865 4.504 75.195 19.935 64.14 5.361 55.152 0 42.97 0 18.573 0 0 29.768 0 65.408 0 86.847 12.107 99 28.441 99c15.742 0 25.269-13.2 33.445-27.788l9.663-16.66a643.785 643.785 0 0 1 2.853-4.869 746.668 746.668 0 0 1 3.202 5.416l9.663 16.454C99.672 92.72 108.126 99 122.45 99c16.448 0 27.617-13.723 27.617-33.25 0-37.552-19.168-65.75-42.4-65.75ZM57.774 46.496l-9.8 16.25c-9.595 15.976-13.639 19.526-19.67 19.526-6.373 0-11.376-5.325-11.376-17.547 0-24.51 12.062-47.451 26.042-47.451 7.273 0 12.678 3.61 22.062 17.486a547.48 547.48 0 0 0-7.258 11.736Zm64.308 35.776c-6.648 0-11.034-4.233-20.012-19.39l-9.663-16.386c-2.79-4.737-5.402-9.04-7.88-12.945 9.73-14.24 15.591-17.984 23.002-17.984 14.118 0 26.204 20.96 26.204 49.158 0 11.403-4.729 17.547-11.651 17.547Z" fill="#DEE3E9"></path></svg>
                        <h1 className="text-white text-[1.600rem]  font-medium mt-3 font-[Helvetica Neue] ">Get started on Instagram</h1>
                        <p className="text-[#F2F4F6] font-medium">Sign up to see photos and videos from your friends.</p>

                        <form onSubmit={handleSubmit} className="mt-2" method="POST">
=======
                        <svg aria-label="Meta logo" className="text-[#DEE3E9] w-15" role="img" viewBox="0 0 500 100"><path class="xt3erj5" d="M185.508 3.01h18.704l31.803 57.313L267.818 3.01h18.297v94.175h-15.264v-72.18l-27.88 49.977h-14.319l-27.88-49.978v72.18h-15.264V3.01ZM336.281 98.87c-7.066 0-13.286-1.565-18.638-4.674-5.352-3.12-9.527-7.434-12.528-12.952-2.989-5.517-4.483-11.835-4.483-18.973 0-7.214 1.461-13.608 4.385-19.17 2.923-5.561 6.989-9.908 12.187-13.05 5.198-3.13 11.176-4.707 17.923-4.707 6.715 0 12.484 1.587 17.319 4.74 4.847 3.164 8.572 7.598 11.177 13.291 2.615 5.693 3.923 12.371 3.923 20.046v4.171h-51.793c.945 5.737 3.275 10.258 6.989 13.554 3.715 3.295 8.407 4.937 14.078 4.937 4.549 0 8.461-.667 11.747-2.014 3.286-1.347 6.374-3.383 9.253-6.12l8.099 9.886c-8.055 7.357-17.934 11.036-29.638 11.036Zm11.143-55.867c-3.198-3.252-7.385-4.872-12.56-4.872-5.045 0-9.264 1.653-12.66 4.97-3.407 3.318-5.55 7.784-6.451 13.39h37.133c-.451-5.737-2.275-10.237-5.462-13.488ZM386.513 39.467h-14.044V27.03h14.044V6.447h14.715V27.03h21.341v12.437h-21.341v31.552c0 5.244.901 8.988 2.703 11.233 1.803 2.244 4.88 3.36 9.253 3.36 1.935 0 3.572-.076 4.924-.23a97.992 97.992 0 0 0 4.461-.645v12.316c-1.67.493-3.549.898-5.637 1.205-2.099.317-4.286.47-6.583.47-15.89 0-23.836-8.649-23.836-25.957V39.467ZM500 97.185h-14.44v-9.82c-2.571 3.678-5.835 6.513-9.791 8.506-3.968 1.993-8.462 3-13.506 3-6.209 0-11.715-1.588-16.506-4.752-4.803-3.153-8.572-7.51-11.308-13.039-2.748-5.54-4.121-11.879-4.121-19.006 0-7.17 1.395-13.52 4.187-19.038 2.791-5.518 6.648-9.843 11.571-12.985 4.935-3.13 10.594-4.707 16.99-4.707 4.813 0 9.132.93 12.956 2.791a25.708 25.708 0 0 1 9.528 7.905v-9.01H500v70.155Zm-14.715-45.61c-1.571-3.985-4.066-7.138-7.461-9.448-3.396-2.31-7.33-3.46-11.781-3.46-6.308 0-11.319 2.102-15.055 6.317-3.737 4.215-5.605 9.92-5.605 17.09 0 7.215 1.802 12.94 5.396 17.156 3.604 4.215 8.484 6.317 14.66 6.317 4.538 0 8.593-1.16 12.154-3.492 3.549-2.332 6.121-5.475 7.692-9.427V51.575Z" fill="#DEE3E9"></path><path class="xt3erj5" d="M107.666 0C95.358 0 86.865 4.504 75.195 19.935 64.14 5.361 55.152 0 42.97 0 18.573 0 0 29.768 0 65.408 0 86.847 12.107 99 28.441 99c15.742 0 25.269-13.2 33.445-27.788l9.663-16.66a643.785 643.785 0 0 1 2.853-4.869 746.668 746.668 0 0 1 3.202 5.416l9.663 16.454C99.672 92.72 108.126 99 122.45 99c16.448 0 27.617-13.723 27.617-33.25 0-37.552-19.168-65.75-42.4-65.75ZM57.774 46.496l-9.8 16.25c-9.595 15.976-13.639 19.526-19.67 19.526-6.373 0-11.376-5.325-11.376-17.547 0-24.51 12.062-47.451 26.042-47.451 7.273 0 12.678 3.61 22.062 17.486a547.48 547.48 0 0 0-7.258 11.736Zm64.308 35.776c-6.648 0-11.034-4.233-20.012-19.39l-9.663-16.386c-2.79-4.737-5.402-9.04-7.88-12.945 9.73-14.24 15.591-17.984 23.002-17.984 14.118 0 26.204 20.96 26.204 49.158 0 11.403-4.729 17.547-11.651 17.547Z" fill="#DEE3E9"></path></svg>
                        <h1 className="text-white text-[1.600rem]  font-medium mt-3 font-[Helvetica Neue] ">Get started on Instagram</h1>
                        <p className="text-[#F2F4F6] font-medium">Sign up to see photos and videos from your friends.</p>

                        <form className="mt-2" method="POST">
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                            <label className="text-white text-[1.125rem] font-medium ">Mobile number or email</label>

                            <div className="relative w-full mt-3">

                                <input
                                    type="text"
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                    name="contact"
                                    value={form.contact}
                                    onChange={handleChange}
                                    placeholder=" "
                                    minLength={10}
                                    className={`peer w-full md:w-140 p-3 pt-6 bg-transparent rounded-[15px] outline-none
                                          ${errors.contact
                                            ? "border border-[#FB7D87] text-[#FB7D87] focus:border-[#FB7D87]"
                                            : "border border-[#50545B] text-white focus:border-blue-500 hover:border-white"
                                        }`}

                                />

                                {errors.contact && <p className="text-[#FB7D87] text-sm mt-2 ml-1 mb-2">{errors.contact}</p>}

                                <label
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-base transition-all
                                          ${errors.contact
                                            ? "text-[#FB7D87]  peer-placeholder-shown:top-7.5"
                                            : "text-gray-400 peer-focus:text-blue-500"
                                        }
                                          peer-placeholder-shown:top-1/2
                                          peer-placeholder-shown:text-base
                                          peer-focus:top-4
                                          peer-focus:text-sm
                                          peer-not-placeholder-shown:top-4
                                          peer-not-placeholder-shown:text-sm`}
=======
                                    name="loginId"
                                    placeholder=" "
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="peer w-full md:w-140 autofill:bg-[#1F1F22] p-3 pt-6 bg-transparent border border-[#50545B] rounded-[15px] text-white outline-none focus:border-blue-500 hover:border-white"
                                />

                                <label
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base transition-all
                                peer-placeholder-shown:top-1/2
                                peer-placeholder-shown:text-base
                                peer-focus:top-4
                                peer-focus:text-sm
                                peer-focus:text-blue-500
                                peer-not-placeholder-shown:top-4
                                peer-not-placeholder-shown:text-sm "
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                                >
                                    Mobile number or email
                                </label>

                            </div>

                            <p className="text-white mb-2 mt-2 text-base">You may receive notifications from us. <span className="text-[#708DFF] font-medium text-wrap hover:underline hover:underline-[#708DFF] cursor-pointer inline decoration-1">Learn why we ask for your contact<br></br>
                                information</span></p>



                            <label className="text-white text-[1.125rem] font-medium mt-5">Password</label>

                            <div className="relative w-full mt-3">

                                <input
                                    type="password"
                                    name="password"
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className={`peer w-full md:w-140 autofill:bg-[#1F1F22] p-3 pt-6 bg-transparent border border-[#50545B] rounded-[15px] text-white outline-none focus:border-blue-500 hover:border-white
                                         ${errors.password
                                            ? "border border-[#FB7D87] text-[#FB7D87] focus:border-[#FB7D87]"
                                            : "border border-[#50545B] text-white focus:border-blue-500 hover:border-white"
                                        }`}
                                />

                                {errors.password && <p className="text-[#FB7D87] text-sm mt-2 ml-1 mb-">{errors.password}</p>}

                                <label
                                    className={`absolute left-4 top-1/2 -translate-y-1/2  text-base transition-all
                                         ${errors.password
                                            ? "text-[#FB7D87] peer-placeholder-shown:top-7.5"
                                            : "text-gray-400 peer-focus:text-blue-500"
                                        }
=======
                                    placeholder=" "
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="peer w-full md:w-140 autofill:bg-[#1F1F22] p-3 pt-6 bg-transparent border border-[#50545B] rounded-[15px] text-white outline-none focus:border-blue-500 hover:border-white"
                                />

                                <label
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base transition-all
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                                peer-placeholder-shown:top-1/2
                                peer-placeholder-shown:text-base
                                peer-focus:top-4
                                peer-focus:text-sm
                                peer-focus:text-blue-500
                                peer-not-placeholder-shown:top-4
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                peer-not-placeholder-shown:text-sm`}
=======
                                peer-not-placeholder-shown:text-sm"
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                                >
                                    Password
                                </label>

                            </div>

                            <div className="mt-3  ">
                                <label className="text-white text-[1.125rem] font-medium inline">Birthday&nbsp;</label>
                                <svg viewBox="0 0 24 24" onClick={() => SetHelpIcon(!helpIcon)} className="text-white inline w-6 cursor-pointer hover:bg-gray-900 hover:rounded-full" fill="currentColor" aria-hidden="true"><path d="M12 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10zm0-18.5a8.5 8.5 0 1 0 8.5 8.5A8.51 8.51 0 0 0 12 3.5z"></path><circle cx="12" cy="16" r="1"></circle><path d="M12 14a.75.75 0 0 1-.75-.75v-1a.75.75 0 0 1 .75-.75 1.5 1.5 0 1 0-1.5-1.5.75.75 0 0 1-1.5 0 3 3 0 1 1 3.75 2.9v.345A.75.75 0 0 1 12 14z"></path></svg>
                                {helpIcon && (
                                    <div className="absolute font-semibold text-wrap items-center mt-2 max-w-110 p-3 bg-black text-[#E4E6EB] text-sm md:text-base rounded-xl shadow-lg z-50">

<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                        <p> Providing your birthday improves the features and ads you see, and helps to keep the Instagram community safe. You can find your birthday in your personal information account settings. &nbsp;

                                            <span className="text-[#4A8DFF] cursor-pointer hover:underline inline mt-1">
                                                Learn more about how we use your info in our Privacy Policy.
                                            </span>
=======
                                       <p> Providing your birthday improves the features and ads you see, and helps to keep the Instagram community safe. You can find your birthday in your personal information account settings. &nbsp;

                                        <span className="text-[#4A8DFF] cursor-pointer hover:underline inline mt-1">
                                             Learn more about how we use your info in our Privacy Policy.
                                        </span>
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                                        </p>

                                    </div>
                                )}

                                <div className="flex gap-3 mt-4 mb-3">

                                    {/* MONTH */}
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                    <select
                                        name="month"
                                        value={form.month}
                                        onChange={handleChange}
                                        className={`w-full bg-black p-3 rounded-xl outline-none
                                             ${errors.birthday
                                                ? "border border-[#FB7D87] text-[#FB7D87] focus:border-[#FB7D87]"
                                                : "border border-[#50545B] text-white focus:border-blue-500  hover:border-white"

                                            } `}>
                                        <option className="text-white">Month</option>
                                        <option className="text-white">January</option>
                                        <option className="text-white">February</option>
                                        <option className="text-white">March</option>
                                        <option className="text-white">April</option>
                                        <option className="text-white">May</option>
                                        <option className="text-white">June</option>
                                        <option className="text-white">July</option>
                                        <option className="text-white">August</option>
                                        <option className="text-white">September</option>
                                        <option className="text-white">October</option>
                                        <option className="text-white">November</option>
                                        <option className="text-white">December</option>
=======
                                    <select className="w-full bg-black text-white block p-3 border hover:border-white border-[#50545B] rounded-xl " >
                                        <option>Month</option>
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        <option>April</option>
                                        <option>May</option>
                                        <option>June</option>
                                        <option>July</option>
                                        <option>August</option>
                                        <option>September</option>
                                        <option>October</option>
                                        <option>November</option>
                                        <option>December</option>
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx

                                    </select>

                                    {/* DAY */}
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                    <select
                                        name="day"
                                        value={form.day}
                                        onChange={handleChange}
                                        className={`w-full bg-black block p-3 hover:border-white border border-[#50545B] rounded-xl 
                                    
                                        ${errors.birthday
                                                ? "border border-[#FB7D87] text-[#FB7D87] focus:border-[#FB7D87]"
                                                : "border border-[#50545B] text-white focus:border-blue-500 hover:border-white"

                                            } `}>
=======
                                    <select className="w-full text-white bg-black block p-3 hover:border-white border border-[#50545B] rounded-xl ">
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                                        <option>Day</option>
                                        {[...Array(31)].map((_, i) => (
                                            <option key={i} >{i + 1}</option>
                                        ))}
                                    </select>



                                    {/* YEAR */}
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                    <select
                                        name="year"
                                        value={form.year}
                                        onChange={handleChange}
                                        className={`w-full peer  bg-black hover:border-white   block p-3 border border-[#50545B] rounded-xl                             
                                           ${errors.birthday
                                                ? "border border-[#FB7D87] text-[#FB7D87] focus:border-[#FB7D87]"
                                                : "border border-[#50545B] text-white focus:border-blue-500 hover:border-white"

                                            } `}>
=======
                                    <select className="w-full peer text-white bg-black hover:border-white   block p-3 border border-[#50545B] rounded-xl ">
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                                        <option>Year</option>
                                        {[...Array(200)].map((_, i) => {
                                            const year = new Date().getFullYear() - i;
                                            return <option key={year}>{year}</option>;
                                        })}
                                    </select>


                                </div>
<<<<<<< HEAD:instagram-clone/src/signup.jsx

                                {errors.birthday && <p className="text-[#FB7D87] text-sm mt-1 mb-2">{errors.birthday}</p>}
=======
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                            </div>
                            <div>
                                <label className="text-white text-[1.125rem] font-medium ">Name</label>

                                <div className="relative w-full mt-3 mb-3">

                                    <input
                                        type="text"
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                        name="fullName"
                                        placeholder=" "
                                        value={form.fullName}
                                        onChange={handleChange}
                                        className={`peer w-full md:w-140 autofill:bg-[#1F1F22] p-3 pt-6 bg-transparent border border-[#50545B] rounded-[15px] text-white outline-none focus:border-blue-500 hover:border-white
                                             ${errors.fullName
                                                ? "border border-[#FB7D87] text-[#FB7D87] focus:border-[#FB7D87]"
                                                : "border border-[#50545B] text-white focus:border-blue-500 hover:border-white"
                                            }`}
                                    />

                                    {errors.fullName && <p className="text-[#FB7D87] text-sm mt-2 ml-1 ">{errors.fullName}</p>}

                                    <label
                                        className={`absolute left-4 top-1/2 -translate-y-1/2  text-base transition-all
                                            ${errors.fullName
                                                ? "text-[#FB7D87] peer-placeholder-shown:top-7.5"
                                                : "text-gray-400 peer-focus:text-blue-500"
                                            }
=======
                                        name="loginId"
                                        placeholder=" "
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="peer w-full md:w-140 autofill:bg-[#1F1F22] p-3 pt-6 bg-transparent border border-[#50545B] rounded-[15px] text-white outline-none focus:border-blue-500 hover:border-white"
                                    />

                                    <label
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base transition-all
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                                peer-placeholder-shown:top-1/2
                                peer-placeholder-shown:text-base
                                peer-focus:top-4
                                peer-focus:text-sm
                                peer-font-medium
                                peer-focus:text-blue-500
                                peer-not-placeholder-shown:top-4
                                peer-not-placeholder-shown:text-sm "
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                        `}>
=======
                                    >
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                                        Full name
                                    </label>

                                </div>
                            </div>

                            <label className="text-white text-[1.125rem] font-medium ">Username</label>

                            <div className="relative w-full mt-3">

                                <input
                                    type="text"
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className={`peer w-full md:w-140 autofill:bg-[#1F1F22] p-3 pt-6 bg-transparent border border-[#50545B] rounded-[15px] text-white outline-none focus:border-blue-500 hover:border-white
                                         ${errors.username
                                            ? "border border-[#FB7D87] text-[#FB7D87] focus:border-[#FB7D87]"
                                            : "border border-[#50545B] text-white focus:border-blue-500 hover:border-white"
                                        }`}
                                />
                                {errors.username && <p className="text-[#FB7D87] text-sm ml-1 mt-2">{errors.username}</p>}

                                <label
                                    className={`absolute left-4 top-1/2 -translate-y-1/2  text-base transition-all
                                        ${errors.username
                                            ? "text-[#FB7D87] peer-placeholder-shown:top-7.5"
                                            : "text-gray-400 peer-focus:text-blue-500"
                                        }
=======
                                    name="loginId"
                                    placeholder=" "
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="peer w-full md:w-140 autofill:bg-[#1F1F22] p-3 pt-6 bg-transparent border border-[#50545B] rounded-[15px] text-white outline-none focus:border-blue-500 hover:border-white"
                                />

                                <label
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base transition-all
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                                peer-placeholder-shown:top-1/2
                                peer-placeholder-shown:text-base
                                peer-focus:top-4
                                peer-focus:text-sm
                                peer-focus:text-blue-500
                                peer-not-placeholder-shown:top-4
                                peer-not-placeholder-shown:text-sm "
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                    `}>
=======
                                >
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                                    Username
                                </label>

                            </div>

                            <div className="w-full" >
                                <p className="text-white mt-5 font-medium ">People who use our service may have uploaded your contact information to <br></br>Instagram.<span className="text-[#708DFF] font-medium hover:underline hover:underline-[#708DFF] cursor-pointer decoration-1"> Learn more</span>.</p>
                                <p className="text-white font-medium mt-3">By tapping Submit, you agree to create an account and to Instagram's <span className="text-[#708DFF] font-medium text-wrap hover:underline hover:underline-[#708DFF] cursor-pointer inline decoration-1" >Terms</span>,<br></br><span className="text-[#708DFF] font-medium text-wrap hover:underline hover:underline-[#708DFF] cursor-pointer inline decoration-1"> Privacy Policy</span> and <span className="text-[#708DFF] font-medium text-wrap hover:underline hover:underline-[#708DFF] cursor-pointer inline decoration-1">Cookies Policy</span>.</p>
                                <p className="text-white font-medium mt-3">The <span className="text-[#708DFF] font-medium text-wrap hover:underline hover:underline-[#708DFF] cursor-pointer inline decoration-1" >Privacy Policy </span>describes the ways we can use the information we collect<br></br> when you create an account. For example, we use this information to provide, <br></br> personalize and improve our products, including ads.</p>
                            </div>

                            <div className="mt-5">
<<<<<<< HEAD:instagram-clone/src/signup.jsx
                                <button type="submit" className="w-full  mx-auto py-3 rounded-full bg-[#1173f3] cursor-pointer  text-white text-sm font-semibold hover:bg-[#0f55b0] active:scale-[0.98] transition-all duration-200" >
                                    Submit
                                </button>

                                <button type="button" className="w-full  mx-auto mt-3 py-3 block rounded-full border cursor-pointer border-[#36393F] text-[#E4E6EB] text-sm font-semibold bg-transparent hover:bg-[#1A1A1D] active:scale-[0.98] transition-all duration-200">
=======
                                <button className="w-full  mx-auto py-3 rounded-full bg-[#1173f3] cursor-pointer  text-white text-sm font-semibold hover:bg-[#0f55b0] active:scale-[0.98] transition-all duration-200" type="submit">
                                    Submit
                                </button>

                                <button className="w-full  mx-auto mt-3 py-3 block rounded-full border cursor-pointer border-[#36393F] text-[#E4E6EB] text-sm font-semibold bg-transparent hover:bg-[#1A1A1D] active:scale-[0.98] transition-all duration-200">
>>>>>>> 7eb8cd19a756ac65dc5c1b94806c317373f217fa:src/signup.jsx
                                    I already have an account
                                </button>
                            </div>




                        </form>



                    </div>

                </div>
            </header>


            <footer>
                <nav className="block text-sm mt-6 mx-auto font-bold text-white ">
                    <ul className="flex flex-wrap justify-center gap-4 text-[#737476] text-xs list-none [&>a]:hover:underline p-2 ">
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
                        <a href="#">Contact Uploading & Non-Users</a>
                        <a href="#">Meta Verified</a>

                    </ul>
                </nav>
                <div className="flex justify-center items-center gap-4 text-[#737476] text-xs mt-3">
                    <div className="font-bold">
                        <select className="bg-black text-[#737476] text-xs px-3 py-1 rounded-md outline-none cursor-pointer w-20 ">
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


                        <h6 className="mx-auto text-center text-xs mt-3 text-[#737476] inline" > &nbsp; © 2026 Instagram from Meta</h6>
                        <h6 className="mx-auto text-center text-xs mt-3 text-[#737476] mb-5" >Made with ❤️ by Gaurav</h6>


                    </div>
                </div>
            </footer>


        </div>

    )
}

export default Signup;