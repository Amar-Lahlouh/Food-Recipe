
import about from "../../assets/about.jfif"
function About() {
  return (
    <div className="mb-7 mt-[40px]" id='about'>
      <h3 className=' mt-[40px] text-center md:text-3xl font-bold font-serif'>About <span className='text-red-600 '>Us</span> </h3>
      <div className="flex flex-wrap border-[1px]  m-auto  mt-7 w-fit gap-9 justify-center align-middle rounded-lg shadow-md">   
     
      <div className='flex flex-col max-w-[500px] mt-7 px-4'>
        <h3 className='font-bold md:text-xl pb-2'>Learn More About Us!</h3>
        <p className="tracking-wider">Welcome to Our Website, your ultimate destination for culinary inspiration! 
            Whether you're a novice cook or a seasoned chef, our platform is designed to
             ignite your passion for cooking with a diverse collection of delicious
              recipes from around the world.</p>
      </div>
      <div>
            <img src={about}  className='rounded-lg md:w-[350px]' alt="" />
      </div>
      </div>

    </div>
  )
}

export default About
