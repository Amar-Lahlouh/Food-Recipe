import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function RecUpdateAdmin() {
    const { id } = useParams<{ id: string }>();
    console.log(id);

    interface Recipe {
        _id: string;
        Name: string;
        NbrCal: number;
        NbrIng: number;
        NbrMin: number;
        Ing: string;
        Details: string;
        Img: string;
        Catid: string;
    }

    interface Cat {
        _id: string;
        Name: string;
    }

    // Get Recipe
    const [Rec, setRec] = useState<Recipe | null>(null);
    const [AllCat, setAllCat] = useState<Cat[]>([]);

    useEffect(() => {
        async function GetRecipe() {
            try {
                const res = await axios.get(`http://localhost:3000/admin/recipe/getone/${id}`, {
                    withCredentials: true,
                });
                setRec(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        GetRecipe();
    }, [id]);

    useEffect(() => {
        async function GetCat() {
            try {
                console.log("starrt")
                const res = await axios.get('http://localhost:3000/admin/category/catget', {
                    withCredentials: true,
                });
                setAllCat(res.data);
                console.log("end")
            } catch (err) {
                console.log(err);
            }
        }

        GetCat();
    }, []);

    const HandleSubmit = async () => {
        // Implementation of handle submit
    };
    const HandleFile = async () => {

    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        // if (Rec) {
        //     const { name, value } = e.target;
        //     setRec({ ...Rec, [name]: name === 'NbrIng' || name === 'NbrCal' || name === 'NbrMin' ? Number(value) : value });
        // }
    };


    return (
        <div className="w-[100%]">
            <Link to="/recipeadmin" className="mt-5">
                <FontAwesomeIcon icon={faArrowLeft} size="2x" className="mt-6" />
            </Link>

            <h1 className="text-center text-2xl font-bold mt-5">Recipe Update</h1>
            <div className="flex md:flex-nowrap flex-wrap gap-9 justify-center align-middle m-auto mt-[40px] w-fit bg-orange-200 px-4 pt-9 pb-5">
                <div>
                    <p>
                        <h4> Recipe Name: </h4>
                        {Rec && (
                            <input
                                type="text"
                                name="Name"
                                value={Rec.Name}
                                onChange={handleInputChange}
                                className="border-[1px] border-black rounded-md"
                            />
                        )}
                    </p>
                    <p>
                        <h4>Number of Ingredients: </h4>
                        <input
                            type="number"
                            name="NbrIng"
                            value={Rec?.NbrIng || ''}
                            onChange={handleInputChange}
                            className="border-[1px] border-black rounded-md"
                        />
                    </p>
                    <p>
                        <h4>Number of Calories: </h4>
                        <input
                            type="number"
                            name="NbrCal"
                            value={Rec?.NbrCal || ''}
                            onChange={handleInputChange}
                            className="border-[1px] border-black rounded-md"
                        />
                    </p>
                    <p>
                        <h4>Number of Minutes: </h4>
                        <input
                            type="number"
                            name="NbrMin"
                            value={Rec?.NbrMin || ''}
                            onChange={handleInputChange}
                            className="border-[1px] border-black rounded-md"
                        />
                    </p>
                    <p>
                        <h4> Recipe Category : </h4>
                        <select
                            name="Catid"
                            value={Rec?.Catid || ''}
                            onChange={handleInputChange}
                            className="border-[1px] border-black rounded-md"
                        >
                            <option value="">{Rec?.Catid}</option>
                            {AllCat.map((e) => (
                                <option key={e._id} value={e._id}>
                                    {e.Name}
                                </option>
                            ))}
                        </select>
                    </p>
                </div>

                <div>
                    <textarea
                        name="Ing"
                        cols={30}
                        rows={5}
                        value={Rec?.Ing || ''}
                        onChange={handleInputChange}
                        placeholder="Ingredients"
                        className="border-[2px] overflow-scroll"
                    ></textarea>
                    <br />
                    <textarea
                        name="Details"
                        cols={30}
                        rows={5}
                        value={Rec?.Details || ''}
                        onChange={handleInputChange}
                        placeholder="Details"
                        className="border-[2px] mt-3 overflow-scroll"
                    ></textarea>
                    <p>
                        <label htmlFor="file">Image:</label>
                        <br />
                        <img src={`../${Rec?.Img}`} alt="" className="w-[90px] max-w-[90px] h-[70px]" />
                        <input type="file" id="file" onChange={HandleFile} />
                    </p>
                    <button
                        onClick={HandleSubmit}
                        className="border-[1px] border-black px-2 bg-gray-200 rounded-lg py-1 mt-4"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecUpdateAdmin;
