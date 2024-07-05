import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


function RecipeAdd() {
    interface Cat {
        [x: string]: any
        Name: string,
        _id: string
    }
    // GET ALL Categories
    const [AllCat, setAllCat] = useState<Cat[] | null>([])
    const [Name, setName] = useState("");
    const [NbrIng, setNbrIng] = useState("")
    const [Ing, setIng] = useState("")
    const [NbrCal, setNbrCal] = useState("")
    const [NbrMin, setNbrMin] = useState("")
    const [catid, setcatid] = useState("")
    const [Details, setDetails] = useState("")
    const [File, setFile] = useState<File | null>(null)
    const [Error, setError] = useState("")

    useEffect(() => {

        async function GetCat() {
            try {

                const res = await axios.get('http://localhost:3000/admin/category/catget', {
                    withCredentials: true
                })
                setAllCat(res.data)

            } catch (err: any) {
                console.log(err)

            }
        }

        GetCat()

    }, [])
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
    console.log("ALLCAT", AllCat)
    const HandleFile = (e: any) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }
    const navigate = useNavigate()
    async function HandleSubmit() {
        try {
            const img = await upload()
            let data = {
                Name, NbrCal, NbrIng, NbrMin, Ing, Details, img, catid
            }
            const res = await axios.post("http://localhost:3000/admin/recipe/recadd", data, {
                withCredentials: true
            })
            navigate("/recipeadmin")

        } catch (err: any) {
            console.log(err)
            setError(err.response.data.message)
        }
    }




    return (


        <div className="w-[100%] ">
            <Link to="/recipeadmin" className="mt-5">
                {" "}
                <FontAwesomeIcon icon={faArrowLeft} size="2x" className="mt-6" />
            </Link>

            <h1 className="text-center text-2xl font-bold mt-5">Recipe Add</h1>
            <div className="flex md:flex-nowrap flex-wrap gap-9 justify-center align-middle m-auto mt-[40px]  w-fit bg-gray-200 px-4 pt-9 pb-5">
                <div>
                    {" "}
                    <p>
                        <h4>Recipe Name: </h4>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            className="border-[1px] border-black rounded-md"
                        />
                    </p>
                    <p>
                        <h4>Number of Ingredients: </h4>
                        <input
                            type="number"
                            onChange={(e) => setNbrIng(e.target.value)}
                            className="border-[1px] border-black rounded-md"
                        />
                    </p>
                    <p>
                        <h4>Number of Calories: </h4>
                        <input
                            type="number"
                            onChange={(e) => setNbrCal(e.target.value)}
                            className="border-[1px] border-black rounded-md"
                        />
                    </p>
                    <p>
                        <h4>Number of Minutes: </h4>
                        <input
                            type="number"
                            onChange={(e) => setNbrMin(e.target.value)}
                            className="border-[1px] border-black rounded-md"
                        />
                    </p>
                    <p>
                        <h4> Recipe Category : </h4>
                        <select onChange={(e) => setcatid(e.target.value)}>
                            <option value="">Choose a Category</option>
                            {AllCat ? AllCat.map((d) => (
                                <option value={d._id}>{d.Name}</option>
                            )) : null}
                        </select>
                    </p>
                </div>

                <div>
                    {" "}
                    <textarea
                        name=""
                        cols={30}
                        rows={5}
                        onChange={(e) => setIng(e.target.value)}
                        id=""
                        placeholder="Ingredients"
                        className="border-[2px] overflow-scroll"
                    ></textarea>
                    <br />
                    <textarea
                        name=""
                        cols={30}
                        rows={5}
                        onChange={(e) => setDetails(e.target.value)}
                        id=""
                        placeholder="Details"
                        className="border-[2px] mt-3 overflow-scroll"
                    ></textarea>
                    <p>
                        <label htmlFor="">Image:</label> <br />
                        {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
                        <input type="file" onChange={HandleFile} />

                    </p>{" "}
                    {Error && <span className="text-red-500">{Error}</span>}
                    <br />
                    <button
                        onClick={HandleSubmit}
                        className="border-[1px] border-black px-2 bg-red-200 rounded-lg  py-1 mt-4 "
                    >
                        Add
                    </button>
                </div>
            </div>
        </div >
    )
}

export default RecipeAdd
