import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    interface Links{
        name:string,
        path:string
    }
    const footerlinks :Links[]=[
        {name:"Home",path:"/"},
        {name:"About",path:"#about"},
        {name:"Recipe",path:"/recipe"},
        {name:"Chefs" , path:"#chefs"},{
         name:"Gallery" ,path:"#gallery"
        }

    ]
  return (
    <div className=' bg-orange-200'> 
         <div id="contact" className='flex flex-wrap gap-[60px] pt-4 justify-center align-middle'>
    <div className='max-w-[300px]' >
     
        <h3 className="md:text-2xl font-bold font-serif italic">Food Recipe</h3>
        <p className='tracking-wider'>Join with Us our Delicious Food and Recipes!</p>
       
    </div>
    <div className='flex flex-col gap-2'>
        <h3 className='font-bold'>Links</h3>
        {footerlinks.map((l)=>{
            if(!l.path.startsWith("#")){
                return(
                    <Link to={l.path} className='hover:text-red-700'>{l.name}</Link>
                )
            }else{
                return(
                    <a href={l.path} className='hover:text-red-700'>{l.name}</a>
                )
            }
        })}
    </div>
    <div className='flex flex-col gap-2'>
        <h3 className='font-bold'>Other Links</h3>
        <a href="">Privacy Policy</a>
        <a href="">FAQs</a>
        <a href="">Others</a>
    </div>

    <div className='flex flex-col gap-2'>
        <h2 className='font-bold'>Connection Ways</h2>
        <p className='px-1'>  
            <FontAwesomeIcon icon={faEnvelope} />
        <span className='px-1'>Email:recipe@gmail.com</span>
        </p>
        <p>  
            <FontAwesomeIcon icon={faPhone} />
        <span className='px-1'>Phone:+982 930138</span>
        </p>
        <p><FontAwesomeIcon icon={faInstagram} size="2x" className='px-1'/>
        <FontAwesomeIcon icon={faFacebook} size="2x" className='px-1'/>
        <FontAwesomeIcon icon={faTwitter} size="2x" className='px-1'/></p>
    </div>
    

    </div>
    <p className='text-center border-t-[1px] border-black pt-3 mt-3'>CopyRights @Amar Lahlouh 2024</p>
    </div>
  
  )
}

export default Footer
