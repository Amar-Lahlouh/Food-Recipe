import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"


function Saved() {
    interface Savee {
        Img: string,
        Text: string,
        Name: string,
        _id: string,
        Details: string,
        NbrMin: string
    }
    const { currentUser } = useContext(AuthContext)
    const [Saved, setSaved] = useState<Savee[] | null>([])
    const userid = currentUser?.user._id
    useEffect(() => {
        async function GetSaved() {
            try {

                const res = await axios.post("http://localhost:3000/front/getSaved", { userid }, {
                    withCredentials: true
                })
                console.log(res.data)
                setSaved(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        GetSaved()
    }, [])
    console.log(Saved, "Saved")
    return (
        <div>
            <h3 className="shadow-lg text-center text-xl font-bold py-1"> Saved Recipes </h3>

            {/* <div> {Saved && (

                Saved.map((k) => (
                    <div className="flex shadow-lg py-1 pt-1">
                        <div className="w-[90px]  gap-4 flex-row">
                            <img src={`../`} alt="" className=" rounded-[60%] aspect-sqaure object-cover w-[60px] h-[60px]" /></div>
                        <div className="w-[100%]">
                            <h3 className="font-bold"></h3>
                            <p></p>
                        </div>


                    </div>
                ))
            )
            } */}
            {/* </div> */}

            {/* {Saved ? (
                Saved.map((k) => (
                    <p>hi</p>
                ))
            ) : (
                <p>No</p>
            )} */}
            <div className="saved">
                {Saved &&
                    (
                        Saved.map((k) => (
                            <div className='md:w-[250px] max-w-[300px] shadow-lg rounded-lg pb-3'>
                                <div>
                                    <img src={`../${k.Img}`} alt="" className='w-full rounded-lg h-full object-cover aspect-video' />
                                </div>
                                <div className='px-2'>

                                    <h3 className='font-bold'>{k.Name}</h3>

                                    <p className='w-full tracking-wider line-clamp-2'>
                                        {k.Details}
                                    </p>
                                    <p className='flex justify-between align-middle mt-3'>
                                        <p><FontAwesomeIcon icon={faClock} /> {k.NbrMin} minutes </p>
                                        <Link to={`/recdetails/${k._id}`} className='w-fit text-center flex justify-between ml-auto bg-gray-100 
                          hover:bg-gray-400 hover:text-white border-[1px] font-light rounded-lg px-2 py-1 '>Check Now</Link>
                                    </p>

                                </div>


                            </div>
                        ))
                    )}
            </div>

        </div >
    )
}

export default Saved
