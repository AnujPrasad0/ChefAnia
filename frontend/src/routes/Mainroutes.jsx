import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Pagenotfound from "../pages/Pagenotfound";
import Recipecontext from "../components/Recipecontext";
import Explore from "../components/Explore";
import Favourite from "../components/Favourite";
import Saved from "../components/Saved";
import Generate from "../components/Generate";
import ExploreItemContext from "../components/ExploreItemContext";

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recipes" element={<Recipes />}>
        <Route path="generate" element={<Generate />} />
        <Route path="saved" element={<Saved />} />
        <Route path="saved/:id" element={<Recipecontext />} />
        <Route path="favourite" element={<Favourite />} />
        <Route path="favourite/:id" element={<Recipecontext />} />
        <Route path="explore" element={<Explore />} />
        <Route path="explore/:id" element={<ExploreItemContext />} />
      </Route>
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
};

export default Mainroutes;
