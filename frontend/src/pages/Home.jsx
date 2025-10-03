import chefHat from "../assets/chefHat.webp";
import food1 from "../assets/food1.png";
import food2 from "../assets/food2.png";
import food3 from "../assets/food3.png";
import spoons from "../assets/spoons.png";
import recipe1 from "../assets/recipe1.webp";
import recipe2 from "../assets/recipe2.webp";
import recipe3 from "../assets/recipe3.webp";
import recipe4 from "../assets/recipe4.webp";
import { useNavigate } from "react-router-dom";
import WhyChefania from "../components/WhyChefania";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="flex flex-col items-center md:justify-between gap-6 md:flex-row bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-b-3xl md:rounded-b-5xl px-5 lg:px-12 sm:pt-5 pb-8 sm:pb-12 lg:pb-16">
        <div className="flex flex-col gap-5 md:gap-8 md:w-[70%] lg:w-[65%] xl:gap-13">
          <h1 className="font-bold dm-serif text-[clamp(1.75rem,6vw,4rem)] tracking-widest sm:leading-12 md:leading-15 lg:leading-18 xl:text-7xl">
            Create Delicious
            <br />
            Recipes in Seconds!
          </h1>
          <p className="roboto sm:text-[1rem] md:text-[1.17rem] lg:text-[1.4rem] xl:text-2xl">
            Enter your ingredients, choose your preferences, and let our{" "}
            <br className="hidden sm:block" /> Ai create the perfect recipe for
            you.
          </p>
          <div className="hidden md:flex items-center justify-center pt-10">
            <button
              onClick={() => navigate("/recipes/generate")}
              className="dm-serif text-3xl lg:text-5xl lg:px-10 lg:py-5 border-3 px-5 py-3 rounded-3xl bg-[#401a31] cursor-pointer"
            >
              Generate
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-8 md:w-[30%] lg:w-[35%]">
          <div className="grid grid-areas-layout grid-cols-2 grid-rows-3 max-h-65 md:max-h-80 lg:max-h-100 w-[100%] gap-5">
            <img
              className="grid-area-a object-cover object-center w-full max-w-45 h-full rounded-full border-2"
              src={food1}
              alt=""
            />
            <div className="grid-area-b flex items-center justify-center w-full max-w-45 h-full bg-[#401a31] rounded-full overflow-hidden">
              <img className="w-15 lg:w-25" src={chefHat} alt="" />
            </div>
            <img
              className="grid-area-c object-cover object-center w-full max-w-45 h-full rounded-full border-2"
              src={food2}
              alt=""
            />
            <div className="grid-area-d flex items-center justify-center w-full max-w-45 h-full bg-[#401a31] rounded-full overflow-hidden">
              <img className="w-15 lg:w-25" src={spoons} alt="" />
            </div>
            <img
              className="grid-area-e object-cover object-center w-full max-w-45 h-full rounded-full border-2"
              src={food3}
              alt=""
            />
          </div>
          <div className="md:hidden">
            <button
              onClick={() => navigate("/recipes/generate")}
              className="dm-serif text-xl border-3 px-5 py-3 rounded-3xl bg-[#401a31] cursor-pointer"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
      <div className="py-15 flex flex-col gap-5 sm:gap-10 lg:gap-15">
        <div className="flex flex-col items-center gap-5 w-full">
          <h1 className="text-4xl dm-serif text-[#293a4a] sm:text-6xl lg:text-7xl">
            How It Works
          </h1>
          <p className="text-sm roboto text-[#293a4a] sm:text-xl lg:text-2xl">
            Generate delicious recipes in just a few simple steps!
          </p>
        </div>
        <div className="grid grid-cols-1 grid-rows-4 justify-items-center px-5 sm:px-10 gap-10 lg:grid-cols-2 lg:grid-rows-2">
          <img
            className="rounded-3xl border-3 border-[#293a4a] w-full max-w-150 lg:w-[45vw] lg:max-w-150"
            src={recipe1}
            alt=""
          />
          <img
            className="rounded-3xl border-3 border-[#293a4a] w-full max-w-150 lg:w-[45vw] lg:max-w-150"
            src={recipe2}
            alt=""
          />
          <img
            className="rounded-3xl border-3 border-[#293a4a] w-full max-w-150 lg:w-[45vw] lg:max-w-150"
            src={recipe3}
            alt=""
          />
          <img
            className="rounded-3xl border-3 border-[#293a4a] w-full max-w-150 lg:w-[45vw] lg:max-w-150"
            src={recipe4}
            alt=""
          />
        </div>
      </div>
      <WhyChefania />
    </div>
  );
};

export default Home;
