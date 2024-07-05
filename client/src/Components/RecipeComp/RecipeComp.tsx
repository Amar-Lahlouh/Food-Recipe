import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

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
function RecipeComp({ Name, _id, Img, Details, NbrMin }: Rec) {

  return (
    <div className='md:w-[250px] max-w-[300px] shadow-lg rounded-lg pb-3'>
      <div>
        <img src={`../${Img}`} alt="" className='w-full rounded-lg h-full object-cover aspect-video' />
      </div>
      <div className='px-2'>

        <h3 className='font-bold'>{Name}</h3>

        <p className='w-full tracking-wider line-clamp-2'>
          {Details}
        </p>
        <p className='flex justify-between align-middle mt-3'>
          <p><FontAwesomeIcon icon={faClock} /> {NbrMin} minutes </p>
          <Link to={`/recdetails/${_id}`} className='w-fit text-center flex justify-between ml-auto bg-gray-100 
                 hover:bg-gray-400 hover:text-white border-[1px] font-light rounded-lg px-2 py-1 '>Check Now</Link>
        </p>

      </div>


    </div>
  )
}

export default RecipeComp
