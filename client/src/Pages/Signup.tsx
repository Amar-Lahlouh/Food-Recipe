import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


function Signup() {

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState(false);
  const [Phone, setPhone] = useState("")
  const [Age, setAge] = useState("")
  let data = {

    Name,
    Email,
    Password,
    ConfirmPassword,
    Phone,
    Age

  }
  const navigate = useNavigate()

  const HandleSubmit = async () => {
    try {

      const res = await axios.post("http://localhost:3000/auth/signup", data, {
        withCredentials: true
      })
      navigate("/login")

    } catch (err: any) {
      console.log(err)
      setError(err.response.data.message)
    }
  }
  return (
    <div>
      <Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="2x" className="px-4 mt-5" /></Link>

      <div className='mt-[50px] flex justify-center flex-col max-w-[600px] md:w-[600px] bg-slate-50 shadow-lg m-auto'>
        <h3 className='font-bold text-red-700 text-xl text-center w-[100%] font-serif pt-3 pb-2 '>Signup Form</h3>
        <div className='border-t-[1px]  md:mt-5 m-auto flex justify-center flex-wrap pt-7'>
          <p>
            <label htmlFor="" className='px-4 mt-3'>Name:</label><br />
            <input type="text" onChange={(e) => setName(e.target.value)} required className='border-[1px] border-black rounded-md mt-1 mx-4 px-1 py-1' /><br />
            <br />
            <label htmlFor="" className='px-4 mt-3'>Email</label><br />
            <input type="email" onChange={(e) => setEmail(e.target.value)} required className='border-[1px] border-black rounded-md mt-1 mx-4 px-1 py-1' /><br />
            <br />
            <label htmlFor="" className='px-4'>Password</label> <br />
            <input type="password" onChange={(e) => setPassword(e.target.value)} className='border-[1px] border-black rounded-md mt-1 mx-4 px-1 py-1' />
            <br />
          </p>
          <p>
            <label htmlFor="" className='px-4 mt-3'>Phone:</label><br />
            <input type="text" required onChange={(e) => setPhone(e.target.value)} className='border-[1px] border-black rounded-md mt-1 mx-4 px-1 py-1' /><br />
            <br />
            <label htmlFor="" className='px-4 mt-3'>Age:</label><br />
            <input type="text" required onChange={(e) => setAge(e.target.value)} className='border-[1px] border-black rounded-md mt-1 mx-4 px-1 py-1' /><br />
            <br />
            <label htmlFor="" className='px-4'> Confirm Password</label> <br />
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className='border-[1px] border-black rounded-md mt-1 mx-4 px-1 py-1' />
            <br />
          </p>



        </div>
        {Error && <span className="text-red-700 text-center pt-2">{Error}</span>} <br />
        <button className='border-[1px] border-black rounded-md px-2 py-1 w-fit m-auto mb-3 hover:bg-gray-700 hover:text-white mt-4' onClick={HandleSubmit}>Sign up</button>
        <p className='text-center pb-2'>Already Have an Account? <Link to="/login" className='text-blue-500 '>Login</Link></p>


      </div></div>

  )
}

export default Signup
