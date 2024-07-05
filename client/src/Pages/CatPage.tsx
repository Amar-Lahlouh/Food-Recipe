import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CatPage() {

    const [File, setFile] = useState<File | null>()
    const [Name, setName] = useState<string>("")
    const [Error, setError] = useState("")

    const upload = async () => {
        if (File) {
            try {
                const formData = new FormData();
                formData.append("file", File); //file tnye hyye input mn l useState
                const res = await axios.post(
                    "http://localhost:3000/server/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                return res.data;
            } catch (err) {
                console.log(err);
            }
        }

    };

    const navigate = useNavigate()
    const HandleCategory = async () => {
        const img = await upload()
        let data = {
            Name,
            img
        }
        try {
            const res = await axios.post("http://localhost:3000/admin/category/catadd", data, {
                withCredentials: true
            })
            console.log(res.data)
            navigate("/category", { replace: true })

        } catch (err: any) {
            console.log(err)
            setError(err.response.data.message)
        }
    }
    return (
        <div className="w-[100%] ">
            <Link to="/category" className="mt-5">
                {" "}
                <FontAwesomeIcon icon={faArrowLeft} size="2x" className="mt-6" />
            </Link>

            <h1 className="text-center text-2xl font-bold mt-5">Category Add</h1>
            <div className="flex md:flex-nowrap flex-wrap gap-9 justify-center align-middle m-auto mt-[40px]  w-fit bg-gray-200 px-4 pt-9 pb-5">
                <div>
                    {" "}
                    <p>
                        <h4>Category Name: </h4>
                        <input
                            type="text"
                            className="border-[1px] border-black rounded-md"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </p>
                    <p>
                        <label htmlFor="">Image:</label> <br />
                        <input type="file" onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setFile(e.target.files[0]);
                            }
                        }} />
                    </p>
                    {Error && <span className='text-red-600'>{Error}</span>} <br />
                    <button
                        className="border-[1px] mt-4 m-auto border-black px-1 py-1 font-bold"
                        onClick={HandleCategory}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CatPage
