import React from 'react'
import d3 from "../../assets/d2.jfif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function DetailsRec() {
  return (
    <div>
       <Link to="/recipe"><FontAwesomeIcon icon={faArrowLeft} size="2x" className="px-4 mt-5"/></Link>

      <div className="flex flex-wrap justify-center align-middle m-auto md:mt-[40px] mt-[20px] gap-9">
        <div>
          <img src={d3} alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="flex flex-wrap justify-between align-middle gap-9 ">
            <h3>Food Name here</h3>
            <p className="border-[1px] border-black shadow-lg cursor-pointer w-fit px-2"><FontAwesomeIcon icon={faBookmark} /> <span>Save</span></p>
          </p>
          <p className="flex flex-wrap gap-9 mt-9">
            <p className="border-r-[2px] flex flex-col justify-center align-middle  border-black px-3"> 
           <h3 className="text-orange-700 font-bold md:text-xl">Ingredients </h3>
            <span className="text-center m-auto">4</span>
            </p>
            <p className="border-r-[2px] flex flex-col justify-center align-middle  border-black px-3"> 
           <h3 className="text-orange-700 font-bold md:text-xl">Calories </h3>
            <span className="text-center m-auto">42221</span>
            </p>
            <p className="border-r-[2px] flex flex-col justify-center align-middle  border-black px-3"> 
           <h3 className="text-orange-700 font-bold md:text-xl">Minutes </h3>
            <span className="text-center m-auto">20</span>
            </p>
          
          </p>

        <p className="mt-9">
          <h3 className="font-bold ">Ingredients: </h3>
          <p className="max-w-[400px]">Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Commodi labore quisquam nesciunt doloribus ratione 
             sed totam ducimus mollitia, libero sunt!
             Lorem ipsum dolor sit amet consectetur 
             adipisicing elit. Cum, perferendis.</p>
        </p>
        </div>
      </div>
    </div>
  )
}

export default DetailsRec
