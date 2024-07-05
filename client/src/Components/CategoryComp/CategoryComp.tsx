import React from 'react'
import c1 from "../../assets/rec.jpg"
interface PropsCat {
  Name: string;
  img: string;
  _id: string;
  isSelected: boolean;
  onFilter: (catt: string) => void;
}
function CategoryComp({ Name, img, _id, isSelected, onFilter }: PropsCat) {
  const HandleCheck = (k: string) => {
    console.log(k)
    onFilter(k)
  }

  return (
    <div>
      <div className='w-[100px] cursor-pointer' onClick={() => HandleCheck(_id)}>
        <img src={`../${img}`} alt="" className={`w-full h-full object-cover rounded-[70%] aspect-square ${isSelected ? 'shadow-lg shadow-gray-600' : ''}`} />
        <h4 className=' text-center mt-1  tracking-wider font-light'>{Name}</h4>
      </div>

    </div>
  )
}

export default CategoryComp
