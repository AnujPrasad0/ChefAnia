import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import loading from "../assets/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import { setRecipe } from "../slices/getrecipeSlice";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-toastify";
import { saveRecipe } from "../slices/recipeSlice";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

const Generate = () => {
  const dispatch = useDispatch();
  const { recipe, recipeLoading, recipeError } = useSelector(
    (state) => state.recipe
  );
  const { recipes, loading, error } = useSelector(
    (state) => state.savedrecipes
  );

  useEffect(() => {
    if (error) {
      toast.error(error); // This shows "You have to login first"
      // console.log(error);
    }
  }, [error]);

  const recipeRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function submitHandler(data) {
    toast.error(errors.ingredients?.message);
    const content = {
      user_ingredients: data.ingredients,
      cuisine_style: data.cuisine,
      dietary_restrictions: data.preferences,
      difficulty_level: data.difficulty,
      meal_type: data.meal,
      cooking_time: `${data.hours} hrs, ${data.minutes} mins`,
      language: data.language,
    };
    dispatch(setRecipe(content));

    setTimeout(() => {
      recipeRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);

    reset();
  }

  async function saveHandler() {
    const recipeData = recipe?.recipe;

    if (!recipeData) {
      return toast.error("Recipe is empty!");
    }

    const title = prompt("Title for your recipe ?");

    if (!title) {
      return toast.error("Title is empty!");
    }

    dispatch(saveRecipe({ title, recipe: recipeData }));
  }

  return (
    <div className="flex flex-col items-center gap-10 md:py-5 lg:py-7">
      <form
        className="text-[#293a4a] bg-[#293a4a] w-full max-w-2xl flex flex-col items-center p-4 rounded-2xl gap-5 md:gap-10"
        onSubmit={handleSubmit(submitHandler, (err) =>
          toast.error(err.ingredients?.message)
        )}
      >
        <input
          className="bg-white rounded-3xl px-5 py-1 md:py-2 text-lg sm:text-2xl w-full outline-[#293a4a]"
          {...register("ingredients", {
            required: "Ingredients cannot be empty",
          })}
          type="text"
          placeholder="chicken, rice...."
        />
        <input
          className="bg-white rounded-3xl px-5 py-1 md:py-2 text-lg sm:text-2xl w-full outline-[#293a4a]"
          {...register("cuisine")}
          type="text"
          placeholder="Cuisine Style"
        />
        <input
          className="bg-white rounded-3xl px-5 py-1 md:py-2 text-lg sm:text-2xl w-full outline-[#293a4a]"
          {...register("preferences")}
          type="text"
          placeholder="Dietary Preferences"
        />
        <div className="flex w-full gap-5">
          <div className="relative w-[50%]">
            <select
              className="bg-white w-full rounded-3xl px-5 py-1 md:py-2 text-lg sm:text-2xl appearance-none pr-10 outline-[#293a4a]"
              {...register("difficulty")}
            >
              <option value="">Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
            />
          </div>
          <div className="relative w-[50%]">
            <select
              className="bg-white w-full rounded-3xl px-5 py-1 md:py-2 text-lg sm:text-2xl appearance-none pr-10 outline-[#293a4a]"
              {...register("meal")}
            >
              <option value="">Meal</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
              <option value="dessert">Dessert</option>
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
            />
          </div>
        </div>
        <div className="flex w-full gap-5">
          <div className="flex gap-1 w-[50%]">
            <input
              type="number"
              min={0}
              {...register("hours")}
              className="bg-white rounded-l-3xl px-4 py-1 md:py-2 text-lg sm:text-2xl w-1/2 outline-[#293a4a]"
              placeholder="Hrs"
            />
            <input
              type="number"
              min={0}
              max={59}
              {...register("minutes")}
              className="bg-white rounded-r-3xl px-2 py-1 md:py-2 text-lg sm:text-2xl w-1/2 outline-[#293a4a]"
              placeholder="Mins"
            />
          </div>
          <input
            className="bg-white w-[50%] rounded-3xl px-5 py-1 md:py-2 text-lg sm:text-2xl outline-[#293a4a]"
            {...register("language")}
            type="text"
            placeholder="Language"
          />
        </div>
        <button className="bg-linear-to-r from-[#b14c6c] to-[#66435b] text-white cursor-pointer text-xl md:text-2xl py-2 rounded-3xl border-2 md:border-3 w-full max-w-sm">
          Create
        </button>
      </form>
      <div
        ref={recipeRef}
        className="text-[#293a4a] bg-[#293a4a] min-h-50 w-full max-w-2xl flex flex-col items-center p-4 rounded-2xl gap-5"
      >
        <div className="flex items-center justify-between w-full text-white text-lg sm:text-2xl">
          <p className="">Recipe:</p>
          <button
            onClick={saveHandler}
            className="bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-2xl border-2 md:border-3 px-4 py-1 cursor-pointer"
          >
            Save
          </button>
        </div>

        {recipeLoading ? (
          // <div className="text-white flex flex-col items-center justify-center p-8 gap-5">
          //   <p className="text-3xl text-center">We are making your recipe</p>
          //   <img className="w-15" src={loading} alt="" />
          // </div>

          <div className="flex flex-col items-center justify-center gap-6 py-10">
            {/* Animated gradient circle */}
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#b14c6c] to-[#66435b] animate-pulse"></div>
              <Loader2 className="absolute inset-0 m-auto w-12 h-12 text-white animate-spin" />
            </div>

            {/* Text */}
            <p className="dm-serif text-2xl sm:text-3xl text-white text-center">
              Cooking up your recipe...
            </p>
            <p className="roboto text-lg sm:text-xl text-white opacity-80 text-center">
              Give us a moment while Chefania mixes the ingredients ✨
            </p>
          </div>
        ) : (
          <div className="flex-1 bg-white w-full rounded-2xl roboto px-3 py-5 sm:p-5 text-md sm:text-xl text-black">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {recipe.recipe}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generate;
