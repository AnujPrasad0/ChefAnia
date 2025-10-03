import { Search } from "lucide-react";
import { useState } from "react";
import Generate from "../components/Generate";
import Saved from "../components/Saved";
import Favourite from "../components/Favourite";
import Explore from "../components/Explore";
import { useDispatch } from "react-redux";
import { fetchRecipe } from "../slices/recipeSlice";
import { NavLink, Outlet } from "react-router-dom";

const Recipes = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("generate");

  const renderContent = () => {
    switch (activeTab) {
      case "generate":
        return <Generate />;
      case "saved":
        return <Saved />;
      case "favourite":
        return <Favourite />;
      case "explore":
        return <Explore />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#f7ecf0] w-full p-5 flex flex-col items-center md:items-start gap-10 md:flex-row pb-15">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full sm:gap-x-20 sm:gap-y-6 md:pt-10 md:flex md:flex-col md:gap-[3.5rem] md:w-[33%] xl:w-100">
        <NavLink
          to="generate"
          onClick={() => {
            dispatch(fetchRecipe());
          }}
          className={({ isActive }) =>
            `bg-[#293a4a] text-center roboto text-xl py-2 px-2 rounded-2xl cursor-pointer sm:py-3 md:text-2xl lg:text-3xl ${
              isActive
                ? "bg-linear-to-r from-[#b14c6c] to-[#66435b]"
                : "bg-[#293a4a]"
            }`
          }
        >
          Generate
        </NavLink>
        <NavLink
          to="saved"
          onClick={() => {
            dispatch(fetchRecipe());
          }}
          className={({ isActive }) =>
            `bg-[#293a4a] text-center roboto text-xl py-2 px-2 rounded-2xl cursor-pointer sm:py-3 md:text-2xl lg:text-3xl ${
              isActive
                ? "bg-linear-to-r from-[#b14c6c] to-[#66435b]"
                : "bg-[#293a4a]"
            }`
          }
        >
          Saved
        </NavLink>
        <NavLink
          to="favourite"
          onClick={() => {
            dispatch(fetchRecipe());
          }}
          className={({ isActive }) =>
            `bg-[#293a4a] text-center roboto text-xl py-2 px-2 rounded-2xl cursor-pointer sm:py-3 md:text-2xl lg:text-3xl ${
              isActive
                ? "bg-linear-to-r from-[#b14c6c] to-[#66435b]"
                : "bg-[#293a4a]"
            }`
          }
        >
          Favourite
        </NavLink>
        <NavLink
          to="explore"
          onClick={() => dispatch(fetchRecipe())}
          className={({ isActive }) =>
            `flex items-center justify-center bg-[#293a4a] rounded-2xl cursor-pointer ${
              isActive
                ? "bg-linear-to-r from-[#b14c6c] to-[#66435b]"
                : "bg-[#293a4a]"
            }`
          }
        >
          <Search size={30} />
          <p className="roboto text-xl py-2 px-2 sm:py-3 md:text-2xl lg:text-3xl">
            Explore
          </p>
        </NavLink>
      </div>
      <div className="bg-[#293a4a] h-1 w-full md:w-1 md:self-stretch md:h-auto md:top-25 md:max-w-[1%] rounded-full"></div>
      <div className="md:w-[66%] xl:w-auto xl:flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Recipes;
