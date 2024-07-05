import {
    faSignal,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryComp from "../Components/CategoryComp/CategoryComp";
import RecipeComp from "../Components/RecipeComp/RecipeComp";

function Recipe() {
    const [filter, setFilter] = useState<boolean>(false);
    const [selectedCat, setSelectedCat] = useState<string>('');
    const [time, setTime] = useState<number>(0);
    const [Cat, setCat] = useState<Cat[] | null>()
    const [Rec, setRec] = useState<Rec[] | null>()
    const [SearchInput, setSearchInput] = useState<string>("")

    const handleToggleFilter = () => {
        setFilter(!filter);
    };
    const handleClick = (value: number) => {
        if (time === value) setTime(0);
        else setTime(value)
        handleToggleFilter();
    }
    const times = [10, 15, 20, 60];
    interface Cat {
        _id: string;
        Name: string;
        img: string;
        __v: number;
    }
    interface Rec {
        _id: string;
        Name: string;
        NbrIng: number;
        NbrCal: string;
        NbrMin: string;
        Catid: Cat;
        Ing: string;
        Details: string;
        Img: string;
        __v: number;
    }

    // Category GET

    useEffect(() => {
        async function AllCat() {
            try {

                const res = await axios.get("http://localhost:3000/front/catall", {
                    withCredentials: true
                })

                setCat(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        AllCat()
    }, [])

    // Recipes Get 
    console.log("ALL", Rec)
    useEffect(() => {
        async function GetRec() {
            try {
                const res = await axios.get("http://localhost:3000/front/getrec", {
                    withCredentials: true
                })
                setRec(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        GetRec()
    }, [])

    const FilterCat = (catt: string) => {
        if (catt == selectedCat) setSelectedCat('');
        else setSelectedCat(catt)
    }
    let filteredRec = selectedCat ? Rec?.filter((j) => j.Catid._id === selectedCat) : Rec;
    if (time) filteredRec = filteredRec?.filter((j) => (Number(j.NbrMin) >= time));
    if (SearchInput) filteredRec = filteredRec?.filter((j) => j.Name.toLowerCase().includes(SearchInput.toLowerCase()))

    return (
        <div>
            <div className="h-[80vh] max-h-[80vh] relative recipe ">
                <p className="flex  flex-col  justify-center align-middle absolute top-[40%] left-[20%]  ">
                    <h3 className="text-orange-300 font-bold md:text-4xl font-serif pb-2 pt-4">
                        Welcome to Our Recipe Collection!
                    </h3>
                    <p className="text-white tracking-wider pb-2 px-3">
                        Discover most delicious Recipes with us and enjoy
                    </p>
                </p>
            </div>

            <div className="mt-[40px]">
                <h3 className="text-center font-serif md:text-3xl text-xl font-bold">
                    Choose a <span className="text-orange-600">Category</span>{" "}
                </h3>
                {/* Category Component */}
                <div className="flex flex-row md:flex-nowrap flex-wrap m-auto px-9 justify-center mt-9  align-middle gap-9">
                    {Cat?.map((k) => (
                        <CategoryComp Name={k.Name} img={k.img} _id={k._id} onFilter={FilterCat} isSelected={selectedCat == k._id} />

                    ))}
                </div>
            </div>

            <div className="flex md:flex-nowrap flex-wrap align-middle justify-center gap-4 items-center mt-5">
                <p className="flex md:flex-nowrap flex-wrap align-middle md:w-[600px] gap-2">
                    <input
                        type="text "
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search by Recipe Name"
                        className="px-2 py-1 w-full rounded-sm border-[1px] bg-white border-black "
                    />
                    <button className="text-white bg-orange-400 rounded-sm px-2 py-1">
                        Search
                    </button>
                </p>

                <p className="flex flex-col relative">
                    <p>
                        <button
                            className=" border-[1px] rounded-sm border-black py-1 px-2"
                            onClick={handleToggleFilter}
                        >
                            {time ? `${time} minutes` : 'Coooking Time'}
                            {filter ? (
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    style={{ color: "#32302f" }}
                                    className="px-1"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faSignal}
                                    rotation={90}
                                    style={{ color: "#d27232" }}
                                    className="px-1"
                                />
                            )}{" "}
                        </button>
                    </p>
                    {filter ? (
                        <div className="mt-1 flex flex-col align-middle justify-center m-auto w-full absolute top-full bg-slate-200">
                            {
                                times.map(t => {
                                    return (
                                        <button
                                            className={`px-3 w-[100%] py-1 ${t == time ? 'bg-gray-400' : 'hover:bg-gray-300'}`}
                                            onClick={() => handleClick(t)}
                                        >
                                            {t} minutes
                                        </button>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        ""
                    )}
                </p>

                {/* Recipe Component */}
            </div>
            <div className="res md:px-[70px] md:mt-9 mt-6">
                {filteredRec?.map((j) => (
                    <RecipeComp {...j} />
                ))}


            </div>
        </div>
    );
}

export default Recipe;
