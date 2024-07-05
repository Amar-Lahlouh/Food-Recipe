import React from 'react'
import p1 from "../../assets/p1.jfif"
import ChefComp from '../ChefComp/ChefComp';
function Chefs() {

    interface Chefs {
        name:string,
        id:number,
        image:string,
        description:string
    }

    const Chef: Chefs[] = [
        { 
            id:1,
          name: "Maria Lopez", 
          image: "c3.jfif", 
          description: "With over 15 years in the culinary world, Maria specializes in Mediterranean cuisine, blending tradition with modern twists." 
        },
        { 
            id:2,
          name: "John Smith", 
          image: "c11.jpg", 
          description: "A passionate chef with a knack for fusion cuisine, John loves experimenting with flavors from around the globe." 
        },
        { 
            id:3,
          name: "Anna Nguyen", 
          image: "c1.jfif", 
          description: "Born and raised in Vietnam, Anna brings authentic Southeast Asian flavors to her dishes, influenced by her heritage." 
        }
      ];
      
  return (
    <div >
      <h3  id="chefs" className=' mt-7 text-center md:text-3xl font-bold font-serif pb-9'>Our <span className='text-red-600 '>Chefs</span> </h3>
      <div className='flex flex-wrap justify-center align-middle gap-7 mt-9'>{Chef.map((e,index)=>(
    <ChefComp key={index}  name={e.name} image={e.image} description={e.description}/>
))}</div>

    
    </div>
  )
}

export default Chefs
