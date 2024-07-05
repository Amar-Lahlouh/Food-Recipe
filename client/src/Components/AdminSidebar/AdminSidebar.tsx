import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";


function AdminSidebar() {
    const [Responsivee, setisResponsive] = useState(false);

    return (
        <div className=" bg-slate-100 md:h-screen h-auto pb-9 md:w-[150px] w-full md:fixed md:top-0 md:left-0 border-r-[1px] shadow-lg border-black z-10">
            <div className="flex justify-between items-center p-4 md:p-0">
                <h3 className="text-center mt-3 mb-7 m-auto">Welcome!</h3>
                <FontAwesomeIcon
                    icon={faBars}
                    size="2x"
                    className="md:hidden block cursor-pointer"
                    onClick={() => setisResponsive(!Responsivee)}
                />
            </div>
            <div
                className={`md:flex md:flex-col ${Responsivee ? "block" : "hidden md:block"
                    }`}
            >
                <Link
                    to="/adminprofile"
                    className=" hover:bg-gray-200 mx-3 text-center pb-3 pt-4 md:border-b-[1px] border-black"
                    onClick={() => setisResponsive(false)}
                >
                    Profile
                </Link>
                <Link
                    to="/recipeadmin"
                    className="hover:bg-gray-200 mx-3 text-center pb-3 pt-4 md:border-b-[1px] border-black"
                    onClick={() => setisResponsive(false)}
                >
                    Recipe
                </Link>
                <Link
                    to="/category"
                    className="hover:bg-gray-200  mx-3 mb-1 text-center pb-3 pt-4 md:border-b-[1px] border-black"
                    onClick={() => setisResponsive(false)}
                >
                    Category
                </Link>
            </div>
        </div>
    );
}

export default AdminSidebar;
