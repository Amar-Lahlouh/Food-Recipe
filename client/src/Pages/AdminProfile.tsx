import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'

function AdminProfile() {

    const { currentUser, logout } = useContext(AuthContext)
    console.log(currentUser?.user)
    const [User, setUser] = useState(currentUser?.user)
    // console.log("USER", User)
    useEffect(() => {
        setUser(currentUser?.user);
    }, [currentUser?.user])

    const HandleLogout = async () => {
        try {
            await logout()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="w-[100%] flex  flex-col justify-center align-middle m-auto ">
            <h1 className="text-2xl text-center font-bold mt-9 ">Admin Profile</h1>
            <div className="flex gap-9  md:flex-nowrap flex-wrap border-[1px] border-black w-fit m-auto rounded-md   p-9 justify-center align-middle mt-[40px]">
                <div className="flex flex-col gap-2">
                    <p>
                        {" "}
                        <p>Email: </p>
                        <input
                            value={User?.Email}
                            disabled
                            type="email"
                            className="border-[1px] text-gray-300 border-black px-2 py-1 rounded-lg"
                        />
                    </p>
                    <p>
                        {" "}
                        <p>Name: </p>
                        <input
                            type="text"
                            value={User?.Name}
                            disabled
                            className="border-[1px] text-gray-300 border-black px-2 py-1 rounded-lg"
                        />
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    {" "}
                    <p>
                        {" "}
                        <p>Phone: </p>
                        <input
                            type="number"
                            value={User?.Phone}
                            disabled
                            className=" text-gray-300 border-[1px] border-black px-2 py-1 rounded-lg"
                        />
                    </p>
                    <p>
                        {" "}
                        <p>Age: </p>
                        <input
                            value={User?.Age}
                            disabled
                            type="number"
                            className="border-[1px] text-gray-300 border-black px-2 py-1 rounded-lg"
                        />
                    </p>
                </div>
            </div>
            <button
                onClick={HandleLogout}
                className="border-[1px] border-black p-2 w-fit m-auto mt-5 hover:bg-gray-400"
            >
                Logout
            </button>
        </div>
    )
}

export default AdminProfile
