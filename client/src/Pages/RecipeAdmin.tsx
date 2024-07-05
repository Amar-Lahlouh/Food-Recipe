import { Link, useNavigate } from "react-router-dom"
import { RecComAdmin } from "../Components"
import { useEffect, useState } from "react"
import axios from "axios"


function RecipeAdmin() {
    interface Recipe {
        _id: string,
        Name: string, NbrCal: number,
        NbrIng: number, NbrMin: number,
        Ing: string, Details: string,
        Img: string, catid: string,


    }

    const [AllRec, setAllRec] = useState<Recipe[] | null>(null)
    useEffect(() => {
        async function GetRec() {
            try {
                const res = await axios.get("http://localhost:3000/admin/recipe/recall", {
                    withCredentials: true
                })
                console.log(res.data)
                setAllRec(res.data)

            } catch (err: any) {
                console.log(err)
            }
        }
        GetRec()
    }, [])
    const DeleteRecipe = async (id: string) => {
        try {

            const res = await axios.delete(`http://localhost:3000/admin/recipe/recdel/${id}`, {
                withCredentials: true
            })
            setAllRec(AllRec?.filter((j) => j._id !== id) || null)



        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="w-[100%]">
            <h3 className="font-bold text-2xl mt-6 text-center ">Recipe Control</h3>

            <Link
                to="/recipeadd"
                className="mt-5 w-fit border-[1px] border-black flex justify-end items-end ml-auto px-4 mb-8 py-2 mr-5 rounded-lg hover:bg-slate-300"
            >
                Recipe Add
            </Link>

            {AllRec ? (
                AllRec.map((j) => (
                    <RecComAdmin onDelete={DeleteRecipe} _id={j._id} catid={j.catid} Ing={j.Ing} Details={j.Details} img={j.Img} Name={j.Name} NbrCal={j.NbrCal} NbrIng={j.NbrIng} NbrMin={j.NbrMin} />
                ))
            ) : (
                <p>No Elements</p>
            )
            }



            {/* Display Coffee */}
        </div >
    )
}

export default RecipeAdmin
