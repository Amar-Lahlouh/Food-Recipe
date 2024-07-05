import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

function Login() {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Error, setError] = useState("")
  let data = {
    Email, Password
  }

  const { login } = useContext(AuthContext)
  const HandleSubmit = async () => {
    try {

      console.log("start")
      await login(data)
      console.log("enf")
    } catch (err: any) {
      console.log(err)
      setError(err.response.data.message)
    }

  }
  return (
    <div>
      <Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="2x" className="px-4 mt-5" /></Link>
      <div className='mt-[50px] flex justify-center flex-col max-w-[300px] md:w-[300px] bg-slate-50 shadow-lg m-auto'>
        <h3 className='font-bold text-red-700 text-xl text-center w-[100%] font-serif pt-3 '>Login Form</h3>
        <div className='border-t-[1px]  mt-5 flex justify-center flex-col'>
          <label htmlFor="" className='px-4 mt-3'>Email</label><br />
          <input type="email" onChange={(e) => setEmail(e.target.value)} required className='border-[1px] border-black rounded-md mt-1 mx-4 px-1 py-1' /><br />
          <br />
          <label htmlFor="" className='px-4'>Password</label> <br />
          <input type="password" onChange={(e) => setPassword(e.target.value)} className='border-[1px] border-black rounded-md mt-1 mx-4 px-1 py-1' />
          <br />
          {Error && <span className='text-red-500'>{Error}</span>}
          <button className='border-[1px] border-black rounded-md px-2 py-1 w-fit m-auto mb-3 hover:bg-gray-700 hover:text-white' onClick={HandleSubmit}>Login</button>
          <p className='text-center pb-2'>Don't Have an Account? <Link to="/signup" className='text-blue-500 '>Signup</Link></p>
        </div>



      </div>
    </div>

  )
}

export default Login
