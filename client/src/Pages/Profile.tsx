import { Link, useNavigate } from "react-router-dom"
import prof from "../assets/prof.jfif"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import axios from "axios"

function Profile() {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const id = currentUser?.user._id
  console.log(id)
  console.log(currentUser)
  interface user {
    Name: string,
    Email: string,
    Phone: string,
    Age: string
  }
  const [user, setUser] = useState<user | null>(currentUser?.user)
  useEffect(() => {
    async function GetProfile() {
      try {
        const res = await axios.get(`http://localhost:3000/user/getuser`, {
          withCredentials: true
        })
        setUser(res.data)

      } catch (err) {
        console.log(err)
      }
    }
    GetProfile()
  }, [])
  console.log("user", user)
  const navigate = useNavigate()
  console.log(user, "user")
  useEffect(() => {
    setUser(currentUser?.user);
  }, [currentUser]);
  const UpdateUser = async () => {
    try {

      const res = await axios.put("http://localhost:3000/user/userup", { user }, {
        withCredentials: true
      })
      setCurrentUser({ user })
      navigate("/")

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="2x" className="px-4 mt-5" /></Link>
      <div className="flex  gap-9 justify-center align-middle shadow-lg md:mt-[100px] w-fit m-auto rounded-xl">
        <div>
          <div className="flex  gap-8 flex-wrap p-4 pb-3">
            <p>
              <p>
                <h4>Name:</h4>
                {user && <input onChange={(e) => setUser({ ...user, Name: e.target.value })} type="text" value={user.Name} className="border-[1px] border-black rounded-lg px-[2px] py-[2px] mb-2" />}
              </p>
              <p>
                <h4>Email:</h4>
                {user && <input type="email" disabled value={user.Email} className="border-[1px] text-gray-400 border-black rounded-lg px-[2px] py-[2px] mb-2" />}
              </p>
            </p>
            <p>
              <p>
                <h4>Phone:</h4>
                {user && <input type="text" onChange={(e) => setUser({ ...user, Phone: e.target.value })} value={user.Phone} className="border-[1px] border-black rounded-lg px-[2px] py-[2px] mb-2" />}
              </p>
              <p>
                <h4>Age:</h4>
                {user && <input type="text" onChange={(e) => setUser({ ...user, Age: e.target.value })} value={user.Age} className="border-[1px] border-black rounded-lg px-[2px] py-[2px] mb-2" />}
              </p>
            </p>

          </div>
          <button className="  mb-4 border-[1px] border-black p-2 hover:bg-orange-300 rounded-lg m-auto flex justify-center" onClick={UpdateUser}>Update</button>
        </div>

        <div >
          <img src={prof} alt="" className=" md:block hidden w-full h-full object-cover rounded-xl" />
        </div>

      </div></div>

  )
}

export default Profile
