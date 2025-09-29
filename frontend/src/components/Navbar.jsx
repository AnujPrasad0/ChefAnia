import { NavLink } from "react-router-dom";
import chefHat from "../assets/chefHat.webp";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-linear-to-r from-[#b14c6c] to-[#66435b] w-full py-4 px-5 flex justify-between items-center lg:px-12 lg:py-8">
      <NavLink to="/" className="flex items-center gap-2">
        <div className="w-8 pb-1.5 sm:w-10 lg:w-14">
          <img src={chefHat} alt="Logo" />
        </div>
        <div className="font-semibold dm-serif text-xl sm:text-3xl lg:text-4xl">
          ChefAnia
        </div>
      </NavLink>
      <div className="md:hidden">
        <Menu size={25} />
      </div>
      <div className="roboto hidden gap-10 md:flex items-center justify-between text-xl">
        <NavLink
          to="/"
          className={(e) => (e.isActive ? "border-b-2 py-1" : "py-1")}
        >
          Home
        </NavLink>
        <NavLink
          to="/recipes/generate"
          className={(e) => (e.isActive ? "border-b-2 py-1" : "py-1")}
        >
          Recipes
        </NavLink>
        <NavLink
          to="/contact"
          className={(e) => (e.isActive ? "border-b-2 py-1" : "py-1")}
        >
          Contact
        </NavLink>
        <NavLink
          to="/login"
          className={(e) =>
            e.isActive
              ? "px-4 py-2 rounded-xl bg-[#401a31]"
              : "px-4 py-2 rounded-xl bg-[#9c6d81]"
          }
        >
          Log In
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
