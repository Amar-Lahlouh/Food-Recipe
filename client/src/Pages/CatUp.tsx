import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function CatUp() {
    const id = useParams().id
    interface Category {
        _id: string,
        Name: string,
        img: string,
        newimg: string
    }
    const [File, setFile] = useState<File | null>(null)
    const [Category, setCategory] = useState<Category | null>(null)
    const navigate = useNavigate()


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

    const HandleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }
    useEffect(() => {
        async function GetCat() {
            try {

                const res = await axios.get(`http://localhost:3000/admin/category/catone/${id}`, {
                    withCredentials: true
                })
                console.log(res.data)
                setCategory(res.data)


            } catch (err) {
                console.log(err)
            }
        }
        GetCat()
    }, [])

    async function handleCategory() {
        try {
            const newimg: string = File?.name ? await upload() : Category?.img;
            console.log("file name", File?.name)
            console.log(Category?.img)

            console.log(newimg)
            const res = await axios.put(`http://localhost:3000/admin/category/catup/${id}`, {
                ...Category, img: newimg
            }, {
                withCredentials: true
            }

            )
            navigate("/category")

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="w-[100%] ">
            <Link to="/category" className="mt-5">
                {" "}
                <FontAwesomeIcon icon={faArrowLeft} size="2x" className="mt-6" />
            </Link>

            <h1 className="text-center text-2xl font-bold mt-5">Category Update</h1>
            <div className="flex md:flex-nowrap flex-wrap gap-9 justify-center align-middle m-auto mt-[40px]  w-fit bg-orange-200 px-4 pt-9 pb-5">
                <div>
                    {" "}
                    <p>
                        <h4>Category Name: </h4>
                        {Category && <input
                            value={Category.Name}
                            type="text"
                            onChange={(e) => setCategory({ ...Category, Name: e.target.value })}
                            className="border-[1px] border-black rounded-md"

                        />}
                    </p>
                    <p>
                        {Category && <img src={`../${Category.img}`} alt="" className='w-[90px] max-w-[90px]' />}
                        <label htmlFor="">Image:</label> <br />
                        <input type="file" onChange={HandleFile} />
                    </p>
                    <button
                        className="border-[1px] mt-4 m-auto border-black px-1 py-1 font-bold"
                        onClick={handleCategory}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CatUp
