import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CatAdd } from '../Components'
import axios from 'axios'

function CategoryAdmin() {

    interface Cat {
        _id: string
        Name: string,
        img: string,

    }
    const [AllCat, setAllCat] = useState<Cat[]>([])

    useEffect(() => {

        async function GetCat() {
            try {

                const res = await axios.get('http://localhost:3000/admin/category/catget', {
                    withCredentials: true
                })
                setAllCat(res.data)

            } catch (err) {
                console.log(err)
            }
        }

        GetCat()

    }, [])
    console.log("ALLCAT", AllCat)


    const DeleteCat = async (id: string) => {
        try {
            const res = await axios.delete(`http://localhost:3000/admin/category/catdel/${id}`, {
                withCredentials: true

            })
            console.log(res.data)
            const neww = AllCat.filter((c) => c._id !== id);
            setAllCat(neww)


        } catch (err: any) {
            console.log(err)
        }
    }

    return (
        <div className="w-[100%]">
            <h3 className="font-bold text-2xl mt-6 text-center ">Category Control</h3>

            <Link
                to="/catadd"
                className="mt-5 w-fit border-[1px] border-black flex justify-end items-end ml-auto px-4 mb-8 py-2 mr-5 rounded-lg hover:bg-slate-300"
            >
                Category Add
            </Link>

            {AllCat.map((c) => (
                <CatAdd _id={c._id} Name={c.Name} img={c.img} onDelete={DeleteCat} />
            ))}



            {/* Display Coffee */}
        </div>
    )
}

export default CategoryAdmin
