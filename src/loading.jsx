import React, { useEffect, useState } from "react";
import meta from "../src/images/meta.png";
import logo from "../src/images/logo.png";
import { use } from "react";

function SplashScreen() {

    const [visibleLoading , setvisibleLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setvisibleLoading(false);

        }, 2200);
        return () => clearTimeout(timer);

    }, []);

    if(!visibleLoading) return null;


    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 min-h-screen">

            <div className="flex-1 flex items-center justify-center">
                <img
                    src={logo}
                    alt="Instagram"
                    className="w-19"
                />
            </div>


            <div className="pb-12 flex flex-col items-center">

                <img
                    src={meta}
                    alt="Meta"
                    className=" w-19 "
                />
            </div>
        </div>
    );
}

export default SplashScreen;