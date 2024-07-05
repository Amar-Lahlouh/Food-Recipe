import { Link, useNavigate } from "react-router-dom"
import images from "../../assets/images.jfif"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faCross, faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import { AuthContext } from "../../Context/AuthContext"

function Navbar() {
    interface NavLink {
        name: string,
        path: string
    }
    const navlinks: NavLink[] = [
        { name: "Home", path: "/" },
        { name: "About", path: "#about" },
        {
            name: "Gallery", path: "#gallery"
        }, {
            name: "Chefs", path: "#chefs"
        }, {
            name: "Recipe", path: "/recipe"
        }, {
            name: "Contact", path: "#contact"
        }
    ]
    const [Responsive, setResponsive] = useState(false)
    const { currentUser, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLinkClick = () => {
        setResponsive(false)
    }
    const HandleLogout = async () => {
        try {
            await logout()

        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div className="flex relative justify-between align-middle  pt-3 px-5 shadow-lg" >
            <div className="w-[50px] max-w-[50px]">
                <img src={images} alt="" className="w-full h-full object-cover aspect-square" />
            </div>
            <div className={` flex-row gap-2 md:block  ${Responsive ? "flex flex-col absolute z-40 top-[0px] pb-2 pl-6 pt-[40px] justify-center left-0 m-auto bg-gray-200 w-[100%] " : "hidden"}`}>
                {navlinks.map((linkk) => {
                    if (!linkk.path.startsWith("#")) {
                        return (
                            <Link to={linkk.path} className="px-2 hover:text-red-600     pt-3 md:m-0 m-auto" onClick={handleLinkClick}>{linkk.name}</Link>
                        )


                    }
                    return (
                        <a href={linkk.path} className="px-2 hover:text-red-600 pt-3 md:m-0 m-auto" onClick={handleLinkClick}>{linkk.name}</a>
                    )

                })}

                {currentUser ? <a className="md:hidden block m-auto pt-3 " onClick={HandleLogout} >Logout</a> :
                    <Link to="/login" className="md:hidden block m-auto pt-3 " onClick={handleLinkClick}>Login</Link>}
                {currentUser ? <Link to="/saved" className="md:hidden block m-auto pt-3 " onClick={HandleLogout} >Saved Recipes</Link> : ""}

            </div>

            <div className=" flex gap-3 align-middle">

                {currentUser ? <Link to="/profile"><FontAwesomeIcon icon={faUser} className="mt-4" /></Link>
                    : <Link to="/login" className="border-[1px] md:block hidden w-fit h-fit px-2 py-1 border-black  rounded-lg hover:bg-gray-300 ">Login</Link>}
                {currentUser ? <button className="border-[1px] border-black rounded-lg py-0  mb-2 md:block hidden " onClick={HandleLogout}>Logout</button> : ""}
                {currentUser ? <Link to="/saved" className="border-[2px] border-red-300 mb-2 rounded-lg px-1 md:block hidden ">Saved Recipes</Link> : ""}
                <span className="px-2 md:hidden block mt-3">


                    {Responsive ? <FontAwesomeIcon icon={faXmark} className="absolute cursor-pointer z-50" onClick={() => setResponsive(!Responsive)} /> :
                        <FontAwesomeIcon icon={faBars} size="1x" onClick={() => setResponsive(!Responsive)} className="cursor-pointer" />}

                </span>
            </div>
        </div>
    )
}

export default Navbar
