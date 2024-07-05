import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
interface CatProps {
    Name: string,
    _id: string,
    img: string
    onDelete: (id: string) => Promise<void>
}
function CatAdd({ Name, _id, img, onDelete }: CatProps) {
    const DeleteCat = (id: string) => {
        onDelete(id)
    }
    return (
        <div className="flex md:flex-row flex-col gap-5 mt-3 px-3 justify-between w-[100%] shadow-lg pb-2">
            <div className="flex gap-3 align-middle">
                <div className="w-[90px] max-w-[90px]">
                    {" "}
                    <img
                        src={`../${img}`}
                        alt=""
                        className="w-full h-full object-cover "
                    />
                </div>

                <h2 className="text-lg font-bold w-fit self-center">{Name}</h2>
            </div>
            <div className="flex gap-4 self-center">
                <button
                    onClick={() => DeleteCat(_id)}

                    className="border-[1px] border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg w-[80px]"
                >
                    Delete
                </button>
                <Link
                    to={`/catup/${_id}`}
                    className="border-[1px] border-gray-400 text-gray-700 hover:bg-gray-200 transition-colors duration-200 py-2 px-4 rounded-lg w-[80px] text-center"
                >
                    Update
                </Link>
            </div >
        </div >
    )
}

export default CatAdd
