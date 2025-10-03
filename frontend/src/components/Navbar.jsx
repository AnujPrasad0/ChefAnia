import { NavLink } from "react-router-dom";
import chefHat from "../assets/chefHat.webp";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, checkAuth } from "../slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  // ✅ check cookies when navbar mounts
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = () => {
    const confirmation = confirm("Are you sure you want to logout!");
    if (confirmation) {
      dispatch(logout()); // clears token + cookie
    }
    setIsOpen(false);
  };

  return (
    <div className="bg-linear-to-r from-[#b14c6c] to-[#66435b] w-full py-4 px-5 flex justify-between items-center lg:px-12 lg:py-8 overflow-x-hidden">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2">
        <div className="w-8 pb-1.5 sm:w-10 lg:w-14">
          <img src={chefHat} alt="Logo" />
        </div>
        <div className="font-semibold dm-serif text-xl sm:text-3xl lg:text-4xl">
          ChefAnia
        </div>
      </NavLink>

      {/* Hamburger */}
      <div className="md:hidden">
        <Menu
          size={28}
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        />
      </div>

      {/* Desktop Menu */}
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

        {/* ✅ Show logout if token exists */}
        {token ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-[#9c6d81] cursor-pointer"
          >
            Log Out
          </button>
        ) : (
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
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/90 backdrop-blur-md shadow-lg transform transition-transform duration-300 z-50 flex flex-col p-6 gap-6 roboto text-xl text-[#293a4a] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-2xl text-[#293a4a]">Menu</span>
          <X
            size={28}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className={(e) => (e.isActive ? "border-b-2 py-1" : "py-1")}
        >
          Home
        </NavLink>
        <NavLink
          to="/recipes/generate"
          onClick={() => setIsOpen(false)}
          className={(e) => (e.isActive ? "border-b-2 py-1" : "py-1")}
        >
          Recipes
        </NavLink>
        <NavLink
          to="/contact"
          onClick={() => setIsOpen(false)}
          className={(e) => (e.isActive ? "border-b-2 py-1" : "py-1")}
        >
          Contact
        </NavLink>

        {token ? (
          <button
            onClick={handleLogout}
            className="py-1 cursor-pointer text-left"
          >
            Log Out
          </button>
        ) : (
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className={(e) => (e.isActive ? "border-b-2 py-1" : "py-1")}
          >
            Log In
          </NavLink>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
