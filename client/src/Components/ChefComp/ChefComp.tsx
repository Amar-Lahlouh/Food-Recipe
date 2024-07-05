import React from 'react'
interface ChefProps{
    name: string,
    description:string,
    image:string
}

function ChefComp({name,image,description}:ChefProps) {
  return (
   
    <div className='max-w-[300px] w-[300px] max-h-[300px] flex flex-col rounded-md justify-center align-middle shadow-lg text-center '>
    <img src={`../${image}`} alt="" className='w-[90px] rounded-[50%] aspect-square m-auto'/>
    <h3 className='font-bold pl-1 pt-2 pb-1'>{name}</h3>
    <p className='tracking-wider pt-2 pl-1  bg-gray-100 p-1'>{description}</p>
  </div>
  )
}

export default ChefComp
