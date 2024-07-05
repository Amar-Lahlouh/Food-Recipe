import React, { useContext, useEffect, useState } from "react";
import d3 from "../assets/d2.jfif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBookmark, faSackDollar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { DetailsRec } from "../Components";
import rev from "../../public/rev.jfif"
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
function RecipeDetails() {
  const id = useParams().id
  interface Rec {
    _id: string;
    Name: string;
    NbrIng: number;
    NbrCal: string;
    NbrMin: string;
    Ing: string;
    Details: string;
    Img: string;
    __v: number;
  }
  interface User {
    _id: string;
    Name: string;
    Email: string;
    Phone: string;
    Role: number;
    Age: number;
  }
  interface Review {
    Text: string,
    userid: User,
    recid: string
  }
  const [RecDetails, setRecDetails] = useState<Rec | null>()
  const [Text, setText] = useState("")
  const [AllReviews, setAllReviews] = useState<Review[]>()
  const [Saved, setSaved] = useState<boolean>(false)
  useEffect(() => {
    async function GetDetails() {
      try {
        console.log("hi")
        const res = await axios.get(`http://localhost:3000/front/getdetails/${id}`, {
          withCredentials: true
        })
        setRecDetails(res.data)
        console.log("bye")

      } catch (err) {
        console.log(err)
      }
    }
    GetDetails()
  }, [])
  const { currentUser } = useContext(AuthContext); // 3ti type User la hayda
  // console.log("Rec details", RecDetails)
  let recid = RecDetails?._id
  const userid = currentUser?.user._id


  const HandleReview = async () => {
    try {

      const res = await axios.post(`http://localhost:3000/front/addreview/${recid}`, { Text, userid }, {
        withCredentials: true
      })
      setAllReviews([...AllReviews, { ...res.data.review, userid: { Name: currentUser?.user?.Name } }])
    } catch (err) {
      console.log(err)
    }
  }


  // Get Reviews

  useEffect(() => {
    async function GetReviews() {
      if (id) {

        try {
          console.log("recid", recid);
          const res = await axios.get(`http://localhost:3000/front/allreview/${id}`, {
            withCredentials: true
          })
          setAllReviews(res.data || [])

        } catch (err) {
          console.log(err)
        }
      }
    }
    GetReviews()
  }, [id])
  console.log(Saved, "before")
  const HandleSave = async () => {
    console.log("save")
    try {
      console.log("test")
      const res = await axios.post(`http://localhost:3000/front/saved/${recid}`, { userid }, {
        withCredentials: true
      })
      setSaved(res.data.saved);
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    async function GetSaved() {
      try {
        console.log("useffect")

        const res = await axios.post(`http://localhost:3000/front/isSaved/${recid}`, { userid }, {
          withCredentials: true
        })
        setSaved(res.data.saved)


      } catch (err) {
        console.log(err)
      }
    }
    GetSaved()


  }, [userid, recid])


  return (
    <div>
      <div>

        <Link to="/recipe"><FontAwesomeIcon icon={faArrowLeft} size="2x" className="px-4 mt-5" /></Link>

        <div className="flex flex-wrap justify-center align-middle m-auto md:mt-[40px] mt-[20px] gap-9">
          <div className="md:w-[400px]">
            <img src={`../${RecDetails?.Img}`} alt="" className="w-full h-full object-cover aspect-video" />
          </div>
          <div>
            <p className="flex flex-wrap justify-between align-middle gap-9 ">
              <h3>{RecDetails?.Name}</h3>
              {currentUser ? <button onClick={HandleSave} className="border-[1px] border-black shadow-lg cursor-pointer w-fit px-2"><FontAwesomeIcon icon={faBookmark} /> <span>{Saved ? "UnSave" : "Save"}</span></button> : ""}

            </p>
            <p className="flex flex-wrap gap-9 mt-9">
              <p className="border-r-[2px] flex flex-col justify-center align-middle  border-black px-3">
                <h3 className="text-orange-700 font-bold md:text-xl">Ingredients </h3>
                <span className="text-center m-auto">{RecDetails?.NbrIng}</span>
              </p>
              <p className="border-r-[2px] flex flex-col justify-center align-middle  border-black px-3">
                <h3 className="text-orange-700 font-bold md:text-xl">Calories </h3>
                <span className="text-center m-auto">{RecDetails?.NbrCal}</span>
              </p>
              <p className="border-r-[2px] flex flex-col justify-center align-middle  border-black px-3">
                <h3 className="text-orange-700 font-bold md:text-xl">Minutes </h3>
                <span className="text-center m-auto">{RecDetails?.NbrMin}</span>
              </p>

            </p>

            <p className="mt-9">
              <h3 className="font-bold ">Ingredients: </h3>
              <p className="max-w-[400px]">{RecDetails?.Ing}</p>
            </p>
          </div>
        </div>
      </div>
      {currentUser ? <div className="mt-[50px] flex justify-center">
        <input onChange={(e) => setText(e.target.value)} type="text" placeholder="Write a Comment..." className=" md:w-[60%] border-b-[1px] border-gray-400" />
        <button onClick={HandleReview} className="border-[1px] border-black rounded-lg mx-4 px-2 py-1 hover:bg-gray-200">Submit</button>
      </div> : ""}

      <div className="flex justify-center align-middle flex-col px-[40px] mt-9">
        {AllReviews?.length ? (
          AllReviews?.map((k) => (
            <div className="flex shadow-lg py-1 pt-1">
              <div className="w-[90px]  gap-4 flex-row">
                <img src={`../${rev}`} alt="" className=" rounded-[60%] aspect-sqaure object-cover w-[60px] h-[60px]" /></div>
              <div className="w-[100%]">
                <h3 className="font-bold">{k.userid.Name}</h3>
                <p>{k.Text}</p>
              </div>


            </div>
          ))

        ) : (
          <p className="text-center">No Reviews Yet</p>
        )}</div>


    </div >
  );
}

export default RecipeDetails;
