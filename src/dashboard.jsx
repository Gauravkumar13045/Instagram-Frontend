import React, { useEffect, useState, useRef } from "react";
import logo from "../src/images/logo.png";
import back from "../src/images/icons/backSlide.png";
import next from "../src/images/icons/nextSlide.png";
import flower from "../src/images/flower.png";
import { Link, useNavigate } from "react-router-dom";


const stories = [
    { username: "smart_adya__01", image: "https://picsum.photos/seed/adya/200/200" },
    { username: "gaurav_yt", image: "https://picsum.photos/seed/gaurav/200/200" },
    { username: "crazyman_07", image: "https://picsum.photos/seed/crazyboy/200/200" },
    { username: "tech_guru", image: "https://picsum.photos/seed/techguru/200/200" },
    { username: "coding_king", image: "https://picsum.photos/seed/codingking/200/200" },
    { username: "insta_star", image: "https://picsum.photos/seed/instastar/200/200" },
    { username: "bihar_buzz", image: "https://picsum.photos/seed/bihar/200/200" },
    { username: "design_dream", image: "https://picsum.photos/seed/design/200/200" },
    { username: "react_rider", image: "https://picsum.photos/seed/react/200/200" },
    { username: "tailwind_tiger", image: "https://picsum.photos/seed/tailwind/200/200" },
    { username: "sneha_kitchen", image: "https://picsum.photos/seed/sneha/200/200" },
    { username: "travel_with_rahul", image: "https://picsum.photos/seed/travelrahul/200/200" },
    { username: "fitness_guru_jk", image: "https://picsum.photos/seed/fitnessjk/200/200" },
    { username: "meme_king_09", image: "https://picsum.photos/seed/memeking/200/200" },
    { username: "photography_by_anika", image: "https://picsum.photos/seed/anikaphoto/200/200" },
    { username: "bihar_wale_bhaiya", image: "https://picsum.photos/seed/biharwale/200/200" },
    { username: "code_with_karan", image: "https://picsum.photos/seed/codekaran/200/200" },
    { username: "fashion_diary_jiya", image: "https://picsum.photos/seed/fashionjiya/200/200" },
    { username: "cricket_addict_07", image: "https://picsum.photos/seed/cricketaddict/200/200" },
    { username: "music_vibes_only", image: "https://picsum.photos/seed/musicvibes/200/200" }


]





function Dashboard() {

    // stories slider
    const [page, setPage] = useState(0);
    const [storiesPerPage, setstoriesPerPage] = useState(5);

    useEffect(() => {
        const handlesize = () => {
            if (window.innerWidth < 640) {
                setstoriesPerPage(3);
            } else {
                setstoriesPerPage(5);
            }
            setPage(0);
        };

        handlesize();
        window.addEventListener('resize', handlesize);

        return () => window.removeEventListener('resize', handlesize);
    }, []);

    const start = page * storiesPerPage;
    const end = start + storiesPerPage;
    const visibleStories = stories.slice(start, end);

    const nextSlide = () => {
        if (end < stories.length) {
            setPage(page + 1);
        }
    };

    const prevSlide = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };


    // posts fetcher

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(`${import.meta.env.VITE_API_URL}/posts`, {
                credentials: "include"
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch posts");
                    }
                    return res.json();
                })

                .then(data => {
                    setPosts(data.posts || []);
                    setLoading(false);

                })
                .catch(err => {
                    setError("Failed to load posts. Please try again.")
                    setLoading(false)
                });
        }, 2000);

    }, []);

    // likes
    const [likedPosts, setLikedPosts] = useState([]);

    const handleLike = (postId) => {

        if (likedPosts.includes(postId)) {

            setLikedPosts(
                likedPosts.filter(id => id !== postId)
            );

        } else {

            setLikedPosts([
                ...likedPosts,
                postId
            ]);

        }
    };

    // rightPanel

    const [suggest, setSuggest] = useState([])
    const [suggestloading, setSuggestloading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            fetch(`${import.meta.env.VITE_API_URL}/suggestions`, {
                credentials: "include"
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Check Internet connection");
                    } else {
                        return res.json();
                    }
                })

                .then(data => {
                    setSuggest(data.suggestion || [])
                    setSuggestloading(false);

                })
                .catch(err => {
                    setSuggestloading(false);
                });
        }, 2000);
    }, []);

    const [more, setMore] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutsideMore = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target)
            ) {
                setMore(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideMore);

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMore);
        };

    }, []);



    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // const res = await fetch("https://kz9sppkz-5000.inc1.devtunnels.ms/logout", {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {


                method: "POST",
                credentials: "include"
            });

            navigate("/");
            window.location.reload();
        } catch (err) {
            console.log("Logout error:", err);
            navigate("/");
            window.location.reload();
        }
    };


    useEffect(() => {
        if (showLogoutModal) {
            setTimeout(() => {
                handleLogout();
            }, 1500);
        }
    }, [showLogoutModal]);

    const [create, setCreate] = useState(false);
    const [postPopup, setPostPopup] = useState(false);
    const [sharePost, setSharePost] = useState(false);

    useEffect(() => {
        if (create || more || showLogoutModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto";
        };

    }, [create, more, showLogoutModal]);

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {

            console.log(file);
            setSelectedFile(file);

            const urlBlob = URL.createObjectURL(file);


            console.log(urlBlob);
            setPostPopup(false)

            setPreview(urlBlob);
            setCreate(false);

        }

    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };

    }, [preview]);

    const [caption, setCaption] = useState("")

    const handleUploadImage = async () => {

        if (!selectedFile) {
            alert("No file Selected !!");
            return;
        }

        const formData = new FormData();


        formData.append("image", selectedFile);
        formData.append("caption", caption);

        try {
            const responseImage = await fetch(`${import.meta.env.VITE_API_URL}/upload`, { method: "POST", body: formData, credentials: "include" });



            const data = await responseImage.json();

            console.log(data);

            if (!responseImage.ok) {
                throw new Error("Upload failed");
            }



            alert("Post uploaded successfully 🔥");

            setPreview(null);

            setSelectedFile(null);

            setCaption("");

            window.location.reload();






        } catch (err) {
            console.log(err);
            alert("Upload failed");

        }




    };

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        fetch(`${import.meta.env.VITE_API_URL}/profile`, {
            credentials: "include"
        })

            .then(res => res.json())

            .then(data => {
                console.log(data);
                setCurrentUser(data);
            })

            .catch(err => {
                console.log(err);
            });

    }, []);











    return (

        <div className=" min-h-screen block md:flex bg-transparent">

            {showLogoutModal && (
                <div className="fixed inset-0  bg-black bg-opacity-70  flex items-center justify-center z-50">

                    <div className="bg-[#2c2c2c] rounded-xl w-96 text-center p-6">

                        <h2 className="text-white text-xl font-semibold">
                            Logging Out
                        </h2>

                        <p className="text-gray-400 mt-2">
                            You need to log back in.
                        </p>

                        <hr className="my-4 border-gray-700" />

                        <button
                            onClick={handleLogout}
                            className="text-blue-400 font-semibold w-full py-2 hover:bg-gray-700 rounded-lg"
                        >
                            Log in
                        </button>

                    </div>
                </div>
            )}


            <div className="md:hidden items-center justify-between px-6 py-3 bg-black flex space-x-15 ">

                {/* LEFT LOGO */}
                <svg aria-label="Instagram" className="text-white cursor-pointer w-27 " fill="currentColor" role="img" viewBox="32 4 113 32" ><title>Instagram</title><path d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z" fill="currentColor" ></path></svg>


                {/* RIGHT SEARCH */}
                <div className="bg-gray-800 px-4 py-2  rounded-full w-62.5">
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent outline-none text-white w-full"
                    />
                </div>

            </div>


            {/* LEFT SIDEBAR */}
            <div className={`hidden md:flex w-20 hover:w-62.5 flex-col p-4 h-screen fixed space-y-2 pb-6 group transition-all duration-300 overflow-hidden ${!more && "hover:w-62.5"}`}>

                <img src={logo} className="w-10 cursor-pointer p-2 border-w hover:bg-[#25282D] rounded"></img>
                <div className=" h-full content-center space-y-0 ">

                    <div className="flex items-center gap-4  py-2 hover:bg-gray-800 rounded-lg cursor-pointer">
                        <svg aria-label="Home" className="text-white shrink-0 cursor-pointer w-10 p-2" fill="currentColor" role="img" viewBox="0 0 24 24"><title>Home</title><path d="m21.762 8.786-7-6.68a3.994 3.994 0 0 0-5.524 0l-7 6.681A4.017 4.017 0 0 0 1 11.68V19c0 2.206 1.794 4 4 4h3.005a1 1 0 0 0 1-1v-7.003a2.997 2.997 0 0 1 5.994 0V22a1 1 0 0 0 1 1H19c2.206 0 4-1.794 4-4v-7.32a4.02 4.02 0 0 0-1.238-2.894Z"></path></svg>
                        <Link to="" className="text-white whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ">Home </Link>
                    </div>

                    <div className="flex items-center gap-4 py-2 hover:bg-gray-800 rounded-lg cursor-pointer">
                        <svg aria-label="Reels" className="text-white shrink-0 cursor-pointer w-10 p-2" fill="currentColor" role="img" viewBox="0 0 24 24"><title>Reels</title><path d="M22.935 7.468c-.063-1.36-.307-2.142-.512-2.67a5.341 5.341 0 0 0-1.27-1.95 5.345 5.345 0 0 0-1.95-1.27c-.53-.206-1.311-.45-2.672-.513C15.333 1.012 14.976 1 12 1s-3.333.012-4.532.065c-1.36.063-2.142.307-2.67.512-.77.298-1.371.69-1.95 1.27a5.36 5.36 0 0 0-1.27 1.95c-.206.53-.45 1.311-.513 2.672C1.012 8.667 1 9.024 1 12s.012 3.333.065 4.532c.063 1.36.307 2.142.512 2.67.297.77.69 1.372 1.27 1.95.58.581 1.181.974 1.95 1.27.53.206 1.311.45 2.672.513C8.667 22.988 9.024 23 12 23s3.333-.012 4.532-.065c1.36-.063 2.142-.307 2.67-.512a5.33 5.33 0 0 0 1.95-1.27 5.356 5.356 0 0 0 1.27-1.95c.206-.53.45-1.311.513-2.672.053-1.198.065-1.555.065-4.531s-.012-3.333-.065-4.532Zm-1.998 8.972c-.05 1.07-.228 1.652-.38 2.04-.197.51-.434.874-.82 1.258a3.362 3.362 0 0 1-1.258.82c-.387.151-.97.33-2.038.379-1.162.052-1.51.063-4.441.063s-3.28-.01-4.44-.063c-1.07-.05-1.652-.228-2.04-.38a3.354 3.354 0 0 1-1.258-.82 3.362 3.362 0 0 1-.82-1.258c-.151-.387-.33-.97-.379-2.038C3.011 15.28 3 14.931 3 12s.01-3.28.063-4.44c.05-1.07.228-1.652.38-2.04.197-.51.434-.875.82-1.26a3.372 3.372 0 0 1 1.258-.819c.387-.15.97-.329 2.038-.378C8.72 3.011 9.069 3 12 3s3.28.01 4.44.063c1.07.05 1.652.228 2.04.38.51.197.874.433 1.258.82.385.382.622.747.82 1.258.151.387.33.97.379 2.038C20.989 8.72 21 9.069 21 12s-.01 3.28-.063 4.44Zm-4.584-6.828-5.25-3a2.725 2.725 0 0 0-2.745.01A2.722 2.722 0 0 0 6.988 9v6c0 .992.512 1.88 1.37 2.379.432.25.906.376 1.38.376.468 0 .937-.123 1.365-.367l5.25-3c.868-.496 1.385-1.389 1.385-2.388s-.517-1.892-1.385-2.388Zm-.993 3.04-5.25 3a.74.74 0 0 1-.748-.003.74.74 0 0 1-.374-.649V9a.74.74 0 0 1 .374-.65.737.737 0 0 1 .748-.002l5.25 3c.341.196.378.521.378.652s-.037.456-.378.651Z"></path></svg>
                        <Link to="" className="text-white whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ">Reels</Link>
                    </div>

                    <div className="flex items-center gap-4 py-2 hover:bg-gray-800 rounded-lg cursor-pointer">
                        <svg aria-label="Messages" className="text-white shrink-0 cursor-pointer w-10 p-2" fill="currentColor" role="img" viewBox="0 0 24 24"><title>Messages</title><path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor"  ></path><line fill="none" stroke="currentColor" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line></svg>
                        <Link to="" className="text-white whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ">Messages</Link>
                    </div>


                    <div className="flex items-center gap-4 py-2 hover:bg-gray-800 rounded-lg cursor-pointer" >
                        <svg aria-label="Search" className="text-white shrink-0 cursor-pointer w-10 p-2" fill="currentColor" role="img" viewBox="0 0 24 24" ><title>Search</title><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" ></path><line fill="none" stroke="currentColor" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
                        <Link className="text-white whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ">Search</Link>
                    </div>

                    <div className="flex items-center gap-4 py-2 hover:bg-gray-800 rounded-lg cursor-pointer" >
                        <svg aria-label="Notifications" className="text-white shrink-0 cursor-pointer w-10 p-2" fill="currentColor" role="img" viewBox="0 0 24 24"><title>Notifications</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                        <Link className="text-white whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ">Notifications</Link>
                    </div>



                    <div className="flex items-center gap-4 py-2 hover:bg-gray-800 rounded-lg cursor-pointer" ref={dropdownRef}>

                        <svg onClick={() => setPostPopup(true)} aria-label="New post" className="text-white shrink-0 cursor-pointer w-10 p-2" fill="currentColor" role="img" viewBox="0 0 24 24" ><title>New post</title><path d="M21 11h-8V3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2Z"></path></svg>
                        <button onClick={() => setPostPopup(true)} className={`text-white whitespace-nowrap opacity-0 -translate-x-4 cursor-pointer group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${create ? "font-bold scale-105" : "font-medium"}`}>Create</button>

                        {create && !preview && (


                            <div className="fixed inset-0 bg-black/80  z-100 flex items-center justify-center">


                                <div className="bg-[#1c1c1c] w-full max-w-140 rounded-2xl overflow-hidden">


                                    <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
                                        <button
                                            onClick={() => {
                                                setCreate(false)
                                                setPostPopup(false)
                                            }}


                                            className="text-gray-400 hover:text-white text-right cursor-pointer"
                                        >
                                            ✕
                                        </button>
                                        <h2 className="text-white font-semibold text-lg">Create new post</h2>
                                        <div className="w-6"></div>
                                    </div>


                                    <div className="p-12 flex flex-col items-center justify-center text-center">
                                        <div className="flex gap-2 mb-6">
                                            <svg aria-label="Icon to represent media such as images or videos" className="text-white" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                        </div>

                                        <p className="text-white text-xl font-light mb-8">
                                            Drag photos and videos here
                                        </p>

                                        <input type="file"
                                            id="fileUpload"
                                            className="hidden"
                                            accept="image/*,video/*"
                                            onChange={handleFileChange}
                                        />


                                        <label
                                            htmlFor="fileUpload"
                                            className="bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold px-6 py-2 rounded-lg transition-all cursor-pointer"
                                        >
                                            Select from computer
                                        </label>
                                    </div>
                                </div>

                            </div>

                        )}

                        {preview && (
                            <div className="fixed inset-0 bg-black/60  z-110 flex items-center justify-center   ">
                                <div className="bg-[#1c1c1c] w-full max-w-125 rounded-2xl overflow-hidden border-2 border-gray-900 max-h-130">


                                    <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3 ">
                                        <button
                                            onClick={() => {
                                                setPreview(null);
                                                setSelectedFile(null);
                                            }}
                                            className="text-gray-400 hover:text-white text-xl"
                                        >
                                            ✕
                                        </button>
                                        <h2 className="text-white font-semibold text-lg">Create new post</h2>
                                        <button className="bg-[#0095f6] hover:bg-[#1877f2] px-5 py-1.5 rounded-lg text-white font-semibold text-sm" onClick={() => { setSharePost(true) }}>
                                            Next
                                        </button>
                                    </div>


                                    <div className={`p-8 flex items-center justify-center bg-black min-h-100 ${preview ? "cursor-grab" : "cursor-pointer"}`}>
                                        {selectedFile?.type.startsWith("video") ? (
                                            <video src={preview} controls />
                                        ) : (
                                            <img src={preview} />
                                        )}
                                    </div>


                                </div>
                            </div>
                        )}






                        {postPopup && (
                            <div className="fixed transition-all bottom-60 bg-[#262626] rounded border-gray-700 p-3 shadow-xl z-50 cursor-pointer" onClick={() => setCreate(true)} >
                                <div className="flex items-center gap-30">
                                    <span className="text-white font-medium text-[15px]">Post</span>
                                    <svg
                                        aria-label="Post"
                                        className="text-white"
                                        fill="currentColor"
                                        height="22"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        width="22"
                                    >
                                        <title>Post</title>
                                        <path d="m18.509 14.757-4.285-2.474a.857.857 0 0 0-1.286.743v4.948a.857.857 0 0 0 1.286.742l4.285-2.474a.857.857 0 0 0 0-1.485ZM5.225 3.977a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 0 0 0-1.25-1.25ZM19.5 7.5h-3v-3a4.004 4.004 0 0 0-4-4h-8a4.004 4.004 0 0 0-4 4v8a4.004 4.004 0 0 0 4 4h3v3a4.004 4.004 0 0 0 4 4h8a4.004 4.004 0 0 0 4-4v-8a4.004 4.004 0 0 0-4-4Zm-12 7h-3a1.997 1.997 0 0 1-1.882-1.349l2.607-2.607L7.5 12.819Zm.23-4.28L6.41 8.9a1.679 1.679 0 0 0-2.37 0L2.5 10.44V4.5a2.003 2.003 0 0 1 2-2h8a2.003 2.003 0 0 1 2 2v3h-3a3.992 3.992 0 0 0-3.77 2.72ZM21.5 19.5a2.003 2.003 0 0 1-2 2h-8a2.003 2.003 0 0 1-2-2v-8a2.003 2.003 0 0 1 2-2h8a2.003 2.003 0 0 1 2 2Z"></path>
                                    </svg>
                                </div>
                            </div>
                        )}





                        {sharePost && (
                            <div className="fixed inset-0 bg-black/10  z-110 flex items-center justify-center">
                                <div className="bg-[#1c1c1c] w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden flex flex-col border-l-2 border-b-2 border-[#1c1c1c]">


                                    <div className="flex items-center justify-between border-b border-gray-700 px-6 py-3">
                                        <button
                                            onClick={() => {
                                                setPreview(null);
                                                setSelectedFile(null);
                                                setCreate(false);
                                                setSharePost(false);
                                            }}
                                            className="text-gray-400 hover:text-white text-3xl font-light cursor-pointer"
                                        >
                                            <svg aria-label="Back" className="text-white" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Back</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
                                        </button>

                                        <h2 className="text-white font-semibold text-lg">Create new post</h2>

                                        <button
                                            onClick={handleUploadImage}
                                            className="text-[#0095f6] font-semibold text-lg hover:text-[#43b3fe]  cursor-pointer"
                                        >
                                            Share
                                        </button>
                                    </div>


                                    <div className="flex flex-1 overflow-hidden">


                                        <div className="flex-1 bg-black flex items-center justify-center object-contain max-h-full max-w-full">

                                            {selectedFile?.type.startsWith("video/") ? (
                                                <video src={preview} controls />
                                            ) : (
                                                <img src={preview} />
                                            )}
                                        </div>


                                        <div className="w-85 border-l border-gray-700 flex flex-col">


                                            <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                                                {/* <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold"> */}
                                                <img src={currentUser?.avatar} className=" object-cover cursor-pointer w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold" />

                                                {/* </div> */}
                                                <span className="text-white font-semibold">{currentUser?.username}</span>
                                            </div>


                                            <div className="flex-1 p-4">

                                                <textarea
                                                    placeholder="Write a caption..."
                                                    value={caption}
                                                    onChange={(e) => setCaption(e.target.value)}
                                                    className="w-full bg-transparent text-white resize-none outline-none text-sm h-[95%]"
                                                    maxLength={2200}
                                                />


                                                <div className="flex items-center justify-between">
                                                    <svg aria-label="Emoji" className="text-white cursor-pointer" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                                                    <div className="text-right text-xs text-gray-400 ">
                                                        {caption.length}/2,200
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="border-t border-gray-700">
                                                <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-800 cursor-pointer">
                                                    <span className="text-white">Add location</span>
                                                    <svg aria-label="Add location" className="text-white" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Add location</title><path d="M12.053 8.105a1.604 1.604 0 1 0 1.604 1.604 1.604 1.604 0 0 0-1.604-1.604Zm0-7.105a8.684 8.684 0 0 0-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 0 0 1.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0 0 12.053 1Zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0 1 13.417 0c0 3.985-3.944 8.538-6.709 11.002Z"></path></svg>
                                                </div>
                                                <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-800 cursor-pointer">
                                                    <span className="text-white">Add collaborators</span>
                                                    <svg aria-label="Add collaborators" className="text-white" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Add collaborators</title><path d="M21 10a1 1 0 0 0-1 1v9c0 .932-.643 1.71-1.507 1.931C18.429 19.203 16.199 17 13.455 17H8.55c-2.745 0-4.974 2.204-5.037 4.933A1.999 1.999 0 0 1 2 20V6c0-1.103.897-2 2-2h9a1 1 0 1 0 0-2H4C1.794 2 0 3.794 0 6v14c0 2.206 1.794 4 4 4h14c2.206 0 4-1.794 4-4v-9a1 1 0 0 0-1-1zM8.549 19h4.906a3.05 3.05 0 0 1 3.045 3H5.505a3.05 3.05 0 0 1 3.044-3z"></path><path d="M6.51 11.002c0 2.481 2.02 4.5 4.502 4.5 2.48 0 4.499-2.019 4.499-4.5s-2.019-4.5-4.5-4.5a4.506 4.506 0 0 0-4.5 4.5zm7 0c0 1.378-1.12 2.5-2.498 2.5-1.38 0-2.501-1.122-2.501-2.5s1.122-2.5 2.5-2.5a2.502 2.502 0 0 1 2.5 2.5zM23.001 3.002h-2.004V1a1 1 0 1 0-2 0v2.002H17a1 1 0 1 0 0 2h1.998v2.003a1 1 0 1 0 2 0V5.002h2.004a1 1 0 1 0 0-2z"></path></svg>
                                                </div>
                                                <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-800 cursor-pointer">
                                                    <span className="text-white">Accessibility</span>
                                                    <svg aria-label="Down chevron icon" className="text-white rotate-180" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Down chevron icon</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
                                                </div>
                                                <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-800 cursor-pointer">
                                                    <span className="text-white">Advanced settings</span>
                                                    <svg aria-label="Down chevron icon" className="text-white rotate-180" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Down chevron icon</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}






                    </div>


                    <div className="flex items-center gap-4 py-2 hover:bg-gray-800 rounded-lg group">

                        <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden cursor-pointer ml-1">
                            <img src={currentUser?.avatar} className="w-full h-full object-cover" />
                        </div>

                        <Link to="" className="text-white whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            Profile
                        </Link>

                    </div>

                </div>




                <div className="flex items-center gap-4 py-2 hover:bg-gray-800 rounded-lg" ref={dropdownRef}>


                    <svg onClick={() => setMore(!more)} aria-label="Settings" className={`text-white shrink-0 cursor-pointer w-10 p-2 ${more ? "font-bold" : "font-medium"}`} fill="currentColor" role="img" viewBox="0 0 24 24" ><title>Settings</title><line fill="none" stroke="currentColor" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" x1="3" x2="21" y1="20" y2="20"></line></svg>
                    <button onClick={() => setMore(!more)} className={`text-white cursor-pointer whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${more ? "font-bold scale-105" : "font-medium"}`}>More</button>






                    {more && (
                        <div className="fixed transition-all content-center z-auto md:block hidden bottom-[18%] w-66   border border-[#292B2E] rounded-2xl  pt-4 bg-[#292B2E] ">

                            <div className="p-2">

                                <div className="p-3  pb-5 flex items-end-safe gap-3 cursor-pointer   hover:bg-[#3F4143] hover:rounded-lg ">
                                    <svg aria-label="Settings" fill="currentColor" className="text-white  " height="18" role="img" viewBox="0 0 24 24" width="18"><title>Settings</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                                    <p className="text-white text-sm ">Settings</p>
                                </div>

                                <div className="p-3 pb-5 flex items-center gap-3 cursor-pointer hover:bg-[#3F4143] hover:rounded-lg">
                                    <svg aria-label="Your activity" className="text-white  " fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Your activity</title><path d="M19 1H5C2.794 1 1 2.794 1 5v14c0 2.206 1.794 4 4 4h14c2.206 0 4-1.794 4-4V5c0-2.206-1.794-4-4-4ZM5 3h14c1.103 0 2 .897 2 2v6h-2.382l-2.723-5.447c-.34-.678-1.45-.678-1.79 0L9 15.764l-2.105-4.211A1 1 0 0 0 6 11H3V5c0-1.103.897-2 2-2Zm14 18H5c-1.103 0-2-.897-2-2v-6h2.382l2.723 5.447a1 1 0 0 0 1.79 0L15 8.236l2.105 4.211A1 1 0 0 0 18 13h3v6c0 1.103-.897 2-2 2Z"></path></svg>
                                    <p className="text-white text-sm">Your activity</p>
                                </div>

                                <div className="p-3 pb-5 flex items-center gap-3 cursor-pointer hover:bg-[#3F4143] hover:rounded-lg">
                                    <svg aria-label="Saved" className="text-white  " fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Saved</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                                    <p className="text-white text-sm">Saved</p>
                                </div>

                                <div className="p-3 pb-5 flex items-center gap-3 cursor-pointer hover:bg-[#3F4143] hover:rounded-lg">
                                    <svg aria-label="Theme icon" className="text-white  " fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Theme icon</title><path d="M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z"></path></svg>
                                    <p className="text-white text-sm">Switch appearance</p>
                                </div>

                                <div className="p-3 mb-1 pb-5 flex items-center gap-3 cursor-pointer hover:bg-[#3F4143] hover:rounded-lg">
                                    <svg aria-label="Report a problem" className="text-white  " fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Report a problem</title><path d="M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z"></path></svg>
                                    <p className="text-white text-sm">Report a problem</p>
                                </div>

                            </div>


                            <hr class="border-t border-8  rounded  border-[#37383A]" />

                            <div className="p-2">
                                <div className="p-4 pl-5   flex items-center gap-3 cursor-pointer hover:bg-[#3F4143] hover:rounded-lg">
                                    <p className="text-white text-sm">Switch accounts</p>
                                </div>
                            </div>



                            <hr class="border-t border-2 rounded-lg   border-[#37383A]" />

                            <div className="p-2" onClick={() => setShowLogoutModal(true)}>
                                <div className="p-4  pl-5 flex items-center gap-3 cursor-pointer hover:bg-[#3F4143] hover:rounded-lg  ">
                                    <p className="text-white text-sm">Log out</p>
                                </div>
                            </div>







                        </div>

                    )}

                </div>



                <div className="flex items-center gap-4 py-2 hover:bg-gray-800 rounded-lg">
                    <svg aria-label="Also from Meta" className="text-white shrink-0 cursor-pointer w-10 p-2" fill="currentColor" role="img" viewBox="0 0 24 24" ><title>Also from Meta</title><path d="M9.5 11h5c1.379 0 2.5-1.122 2.5-2.5v-5C17 2.122 15.879 1 14.5 1h-5A2.503 2.503 0 0 0 7 3.5v5C7 9.878 8.12 11 9.5 11ZM9 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5ZM8.499 13h-5a2.503 2.503 0 0 0-2.5 2.5v5c0 1.378 1.12 2.5 2.5 2.5h5c1.379 0 2.5-1.122 2.5-2.5v-5c0-1.378-1.121-2.5-2.5-2.5Zm.5 7.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5Zm11.5-7.5h-5a2.503 2.503 0 0 0-2.5 2.5v5c0 1.378 1.12 2.5 2.5 2.5h5c1.379 0 2.5-1.122 2.5-2.5v-5c0-1.378-1.121-2.5-2.5-2.5Zm.5 7.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5Z"></path></svg>
                    <Link to="" className="text-white whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Also from Meta</Link>
                </div>



            </div>



            {/* CENTER FEED */}
            <div className="flex-1 max-w-150 p-5 xl:mx-0 mx-auto xl:ml-62.5 ">



                {/* STORIES */}
                <div className="flex w-full gap-4 p-1 pt-2   overflow-x-auto items-center  snap-x snap-mandatory">

                    {page > 0 && (

                        <button
                            onClick={prevSlide}
                            className="absolute z-10 p-1 rounded-full flex scrollbar-hide cursor-pointer "
                        >
                            <img
                                src={back}
                                alt="Previous"
                                className="w-7 h-7"
                            />
                        </button>


                    )}


                    {visibleStories.map((story, i) => (
                        <div key={i} className=" flex flex-col items-center mx-auto snap-start cursor-pointer">
                            <div
                                className="p-1 rounded-full"
                                style={{
                                    background:
                                        "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #D300C5)",
                                }}
                            >
                                <img
                                    src={story.image}
                                    className="w-20 h-20 border-4 border-black rounded-full object-cover"
                                    alt={story.username}
                                />
                            </div>
                            <span className="text-white text-xs truncate max-w-22 overflow-hidden">{story.username}</span>
                        </div>
                    ))}


                    {end < stories.length && (
                        <div className="">
                            <button
                                onClick={nextSlide}
                                className="block  cursor-pointer transition-all"
                            >
                                <img src={next} alt="next" className="w-7 h-7" />
                            </button>
                        </div>
                    )}




                </div>







                {/* POSTS */}
                <div className="flex flex-col p-0 md:p-8  pt-5 mx-auto ">


                    {loading && (
                        <>

                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="p-5 animate-pulse">

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-700 rounded w-32"></div>
                                                <div className="h-3 bg-gray-700 rounded w-20"></div>
                                            </div>
                                        </div>
                                        <div className="h-6 bg-gray-700 rounded w-16"></div>
                                    </div>


                                    <div className="bg-gray-700 h-105 rounded-xl mb-4"></div>


                                    <div className="flex gap-6 mb-4">
                                        <div className="h-8 bg-gray-700 rounded w-10"></div>
                                        <div className="h-8 bg-gray-700 rounded w-10"></div>
                                        <div className="h-8 bg-gray-700 rounded w-10"></div>
                                        <div className="h-8 bg-gray-700 rounded w-10 ml-auto"></div>
                                    </div>


                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}

                        </>
                    )}

                    {error && !loading && (
                        <div className="flex flex-col items-center py-20 text-center px-4">
                            <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-6">
                                <span className="text-3xl mb-2">⚠️</span>
                            </div>
                            <h3 className="text-white text-2xl font-semibold mb-2">Couldn't load posts</h3>
                            <p className="text-gray-400 mb-6 max-w-sm">
                                {error}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                            >
                                Try Again
                            </button>
                        </div>
                    )}


                    {!loading && !error && posts.map((post, index) => (
                        <div key={index} className="p-5" >

                            <div className="flex items-center justify-between mb-4">

                                <div className="flex items-center gap-3">
                                    <img src={post.avatar} className="w-10 h-10 rounded-full" alt="{post.username}"></img>


                                    <div className="inline-flex gap-1">
                                        <div>
                                            <a href="" className="text-white font-semibold text-sm">{post.username}</a>
                                            {post.isVerified && (
                                                <svg aria-label="Verified" fill="rgb(0, 149, 246)" className="inline-flex ml-1" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" ></path></svg>
                                            )}

                                            <p className="text-white block text-xs">Original audio</p>

                                        </div>

                                        <div className="text-gray-400 space-x-1 font-normal">
                                            <span className="cursor-pointer ml-0.5 text-center text-gray-400">•</span>
                                            <a className="text-gray-400 text-sm">{post.timeAgo}</a>
                                        </div>

                                    </div>


                                </div>
                                <div className="space-x-3" >
                                    <a className="text-[#85A1FF] cursor-pointer font-normal hover:underline decoration-1 decoration-[#85A1FF]">Follow</a>
                                    <span className="text-white cursor-pointer">•••</span>

                                </div>


                            </div>
                            <div className="bg-gray-800 h-100 rounded-xl">
                                <img
                                    src={post.postImage}
                                    className="w-full h-full object-cover rounded"
                                    alt="post"
                                />
                            </div>

                            <div className="block">
                                <div >
                                    <div className="inline-flex">
                                        {
                                            likedPosts.includes(post.id) ? (



                                                <svg
                                                    aria-label="Unlike"
                                                    onClick={() => handleLike(post.id)}
                                                    className="
                                                     text-red-500
                                                      transition-all
                                                      duration-300
                                                      ease-in-out
                                                      scale-110
                                                      hover:scale-125
                                                      shrink-0
                                                      cursor-pointer
                                                      w-10
                                                      p-2
                                                  "
                                                    fill="currentColor"
                                                    role="img"
                                                    viewBox="0 0 48 48"
                                                >

                                                    <title>Unlike</title>

                                                    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>

                                                </svg>

                                            ) : (



                                                <svg
                                                    aria-label="Like"
                                                    onClick={() => handleLike(post.id)}
                                                    className="
                                                      text-white
                                                      transition-all
                                                      duration-300
                                                      ease-in-out
                                                      hover:scale-110
                                                      shrink-0
                                                      cursor-pointer
                                                      w-10
                                                      p-2
                                                  "
                                                    fill="currentColor"
                                                    role="img"
                                                    viewBox="0 0 24 24"
                                                >

                                                    <title>Like</title>

                                                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>

                                                </svg>

                                            )}
                                        <a className="text-white font-medium mt-2 cursor-pointer">{post.likes}<span>K</span></a>
                                    </div>

                                    <div className="inline-flex ml-1">
                                        <svg aria-label="Comment" className=" text-white hover:transition-transform hover:scale-110 ease-in-out shrink-0 cursor-pointer w-10 p-2" fill="currentColor" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor"  ></path></svg>
                                        <a className="text-white font-medium mt-2 cursor-pointer">{post.comments}<span>K</span></a>
                                    </div>

                                    <div className="inline-flex ml-1">
                                        <svg aria-label="Share" className=" text-white shrink-0 hover:transition-transform hover:scale-110 ease-in-out cursor-pointer w-10 p-2" fill="currentColor" role="img" viewBox="0 0 24 24" ><title>Share</title><path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor"  ></path><line fill="none" stroke="currentColor" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line></svg>
                                    </div>

                                    <div className="inline-flex float-right">
                                        <svg aria-label="Save" className=" text-white shrink-0 hover:transition-transform hover:scale-110 ease-in-out cursor-pointer w-10 p-2" fill="currentColor" role="img" viewBox="0 0 24 24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor"   ></polygon></svg>

                                    </div>

                                    <div className="block">
                                        <a href="" className="text-white text-sm font-semibold ml-2 ">{post.username}</a>

                                        {post.isVerified && (
                                            <svg aria-label="Verified" fill="rgb(0, 149, 246)" className="inline-flex ml-1" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" ></path></svg>
                                        )}

                                        <span className="text-white ml-2 ">{post.caption}</span>
                                    </div>


                                </div>

                            </div>



                        </div>
                    ))}








                </div>

            </div>

            {/* RIGHT PANEL */}
            <div className="hidden xl:block mt-5 w-88 p-5   ">

                {suggestloading && (
                    <>
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="flex justify-between items-center w-full p-2 animate-pulse">

                                <div className="flex items-center gap-3">


                                    <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

                                    <div className="space-y-1">

                                        <div className="h-3 bg-gray-700 rounded w-20"></div>

                                        <div className="h-3 bg-gray-800 rounded w-16"></div>
                                    </div>

                                </div>


                                <div className="h-3 w-12 bg-gray-700 rounded"></div>

                            </div>
                        ))}
                    </>
                )}



                {!suggestloading && (
                    <>
                        <div className="flex justify-between items-center w-full p-2" >

                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full overflow-hidden">
                                    <img src={currentUser?.avatar} className="w-full h-full object-cover cursor-pointer" />
                                </div>

                                <div>
                                    <p className="text-white text-sm font-semibold cursor-pointer">{currentUser?.fullName}</p>
                                    <p className="text-gray-400 text-xs cursor-pointer">{currentUser?.username}</p>
                                </div>
                            </div>

                            <a className="text-blue-400  text-xs font-semibold cursor-pointer hover:text-blue-300 hover:underline underline-blue-300">
                                Switch
                            </a>

                        </div>

                        <div className="flex justify-between items-center w-full p-2 pt-2">

                            <p className="text-white text-sm font-semibold">
                                Suggested for you
                            </p>

                            <a className="text-white text-xs font-semibold hover:text-gray-500 cursor-pointer">
                                See all
                            </a>

                        </div>
                    </>
                )}



                {!suggestloading && !error && suggest.map((suggest, index) => (



                    <div className="flex justify-between items-center w-full p-2" key={index}>

                        <div className="flex items-center gap-3">
                            <img src={suggest.SuggestionImage} className="w-11 h-11 rounded-full cursor-pointer" />

                            <div>
                                <p className="text-white text-sm font-semibold cursor-pointer">{suggest.username}</p>
                                <p className="text-gray-400 text-xs truncate max-w-40 cursor-pointer">
                                    {suggest.IsFollowing}
                                </p>
                            </div>
                        </div>

                        <a className="text-blue-400 hover:text-blue-500 text-xs font-semibold cursor-pointer">
                            Follow
                        </a>

                    </div>
                ))
                }


                {!suggestloading && (
                    <>
                        < div className="text-gray-500 text-xs mt-6 space-y-2 leading-5" >

                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                                {["About", "Help", "Press", "API", "Jobs",
                                    "Privacy", "Terms", "Locations",
                                    "Language", "Meta Verified"].map((item, i) => (
                                        <span key={i} className="text-xs text-[#858686] hover:underline cursor-pointer">
                                            {item}
                                            {i !== 9 && <span className="text-gray-600"> •</span>}
                                        </span>
                                    ))}
                            </div>

                            <p className="mt-3 text-[#858686] ">
                                © 2026 INSTAGRAM FROM META
                            </p>

                        </div>

                    </>
                )}


                < div >


                </div>



            </div>

        </div >

    );
}

export default Dashboard;