import { About, Footer, Landing, Navbar } from "../Components"
import Chefs from "../Components/Chefs/Chefs"
import Gallerry from "../Components/Gallerry/Gallerry"


function Home() {
  return (
    <div>
      <Navbar/>
      <Landing/>
      <Chefs/>
      <About/>
      <Gallerry/>
      <Footer/>
 
    </div>
  )
}

export default Home
