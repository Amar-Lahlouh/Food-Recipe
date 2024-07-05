import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { CatPage, CatUp, Home, Login, Profile, RecUpdateAdmin, Recipe, RecipeAdd, RecipeAdmin, RecipeDetails, Saved, Signup } from './Pages'
import Admin from './Pages/Admin'
import AdminProfile from './Pages/AdminProfile'
import CategoryAdmin from './Pages/CategoryAdmin'
import { CatAdd } from './Components'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="recdetails/:id" element={<RecipeDetails />} />
        <Route path="/profile" element={<Profile />} />

        <Route element={<Admin />}>
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/category" element={<CategoryAdmin />} />
          <Route path="/recipeadmin" element={<RecipeAdmin />} />
          <Route path="/recipeadd" element={<RecipeAdd />} />
          <Route path="/recupdate/:id" element={<RecUpdateAdmin />} />
          <Route path="/catadd" element={<CatPage />} />
          <Route path="/catup/:id" element={<CatUp />} />
        </Route>

        <Route path="/saved" element={<Saved />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
