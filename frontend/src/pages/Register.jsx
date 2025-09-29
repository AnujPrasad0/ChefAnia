import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  function passwordToggler() {
    setShowPassword(!showPassword);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function submitHandler(data) {
    axios
      .post(
        "/api/auth/register",
        {
          email: data.email,
          fullname: {
            firstname: data.firstname,
            lastname: data.lastname,
          },
          password: data.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        navigate("/recipes");
        reset();
      })
      .catch((err) => {
        console.error("Server responded with:", err.response.data);
        toast.error(err.response.data.message);
      });
  }

  return (
    <div className="flex flex-col bg-[#f7ecf0] px-5 py-10 gap-10 items-center md:flex-row md:justify-around pb-15">
      <div className="flex flex-col items-center gap-5 max-w-110 md:max-w-130 lg:gap-5">
        <h1 className="text-[#293a4a] text-5xl dm-serif text-center md:text-6xl lg:text-7xl">
          Welcome
        </h1>
        <p className="text-[#293a4a] text-lg roboto text-center md:text-2xl lg:text-4xl lg:leading-14">
          Enter your personal details and start journey with us.
        </p>
      </div>
      <div className="relative w-full max-w-110 md:max-w-120 xl:max-w-150">
        <form
          onSubmit={handleSubmit(submitHandler, (err) => {
            toast.error(err.email?.message);
            toast.error(err.firstname?.message);
            toast.error(err.lastname?.message);
            toast.error(err.password?.message);
          })}
          className="relative z-10 w-full bg-white rounded-2xl p-5 flex flex-col gap-4 sm:gap-8 sm:p-10"
        >
          <h1 className="dm-serif text-[#b14c6c] text-4xl">Sign Up</h1>
          <input
            className="bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-lg w-full text-xl py-2 px-4 outline-white md:py-4"
            {...register("email", {
              required: "email is required",
            })}
            type="email"
            placeholder="email"
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
            <input
              className="bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-lg w-full text-xl py-2 px-4 outline-white md:py-4"
              {...register("firstname", {
                required: "first name is required",
              })}
              type="text"
              placeholder="first name"
            />
            <input
              className="bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-lg w-full text-xl py-2 px-4 outline-white md:py-4"
              {...register("lastname", {
                required: "last name is required",
              })}
              type="text"
              placeholder="last name"
            />
          </div>
          <div className="flex justify-center items-center bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-lg w-full px-4 outline-white">
            <input
              className="text-xl py-2 outline-none md:py-4 w-[90%]"
              {...register("password", {
                required: "password is required",
              })}
              type={showPassword ? "text" : "password"}
              placeholder="password"
            />
            <div className="w-[10%]" onClick={passwordToggler}>
              {!showPassword ? <Eye /> : <EyeOff />}
            </div>
          </div>
          <button className="bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-lg w-full text-xl py-2 px-4 cursor-pointer">
            Send
          </button>
          <p className="text-[#293a4a]">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#b14c6c] cursor-pointer"
            >
              Login
            </span>
            .
          </p>
        </form>
        <div className="absolute top-1 left-1 w-full h-full bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-2xl"></div>
      </div>
    </div>
  );
};

export default Register;
