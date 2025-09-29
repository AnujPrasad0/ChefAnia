import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function submitHandler(data) {
    toast.info("This is dummy contact page");
    reset();
  }

  return (
    <div className="flex flex-col bg-[#f7ecf0] px-5 py-10 gap-10 items-center md:flex-row md:items-start md:justify-around pb-20">
      <div className="flex flex-col items-center gap-5 max-w-100 md:max-w-120 lg:gap-10 md:pt-20 lg:pt-10">
        <h1 className="text-[#293a4a] text-5xl dm-serif text-center md:text-6xl lg:text-8xl">
          Contact Us
        </h1>
        <p className="text-[#293a4a] text-lg roboto text-center md:text-2xl lg:text-4xl lg:leading-14">
          Feel free to contact us any time. We will get back to you as soon as
          possible.
        </p>
      </div>
      <div className="relative w-full max-w-100 md:max-w-150">
        <form
          onSubmit={handleSubmit(submitHandler, (err) => {
            toast.error(err.name?.message);
            toast.error(err.email?.message);
            toast.error(err.message?.message);
          })}
          className="relative z-10 w-full bg-white rounded-2xl p-5 flex flex-col items-center gap-5"
        >
          <input
            className="bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-2xl w-full text-2xl py-2 px-4 outline-white md:py-4"
            {...register("name", {
              required: "Name is required",
            })}
            type="text"
            placeholder="Name"
          />
          <input
            className="bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-2xl w-full text-2xl py-2 px-4 outline-white md:py-4"
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="Email"
          />
          <textarea
            className="bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-2xl w-full text-2xl py-2 px-4 outline-white md:py-4 min-h-30"
            {...register("message", {
              required: "message is required",
            })}
            type="text"
            placeholder="Write your message here"
          ></textarea>
          <button className="bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-2xl w-full max-w-40 text-2xl py-2 px-4 cursor-pointer">
            Send
          </button>
        </form>
        <div className="absolute top-1 left-1 w-full h-full bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-2xl"></div>
      </div>
    </div>
  );
};

export default Contact;
