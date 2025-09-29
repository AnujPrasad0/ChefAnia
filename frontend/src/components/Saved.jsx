import Recipecard from "./Recipecard";
import { useSelector } from "react-redux";

const Saved = () => {
  const { recipes, loading, error } = useSelector(
    (state) => state.savedrecipes
  );

  return (
    <div className="flex flex-col items-center w-full gap-10 md:pt-5 lg:pt-10 lg:gap-20">
      <p className="text-[#293a4a] text-lg sm:text-2xl lg:text-3xl text-center">
        Your saved recipes will appear here...
      </p>
      <div className="flex flex-wrap w-full justify-center lg:justify-between gap-5 sm:gap-8">
        {recipes?.map((recipe) => (
          <Recipecard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            show={true}
            address={"saved"}
          />
        ))}
      </div>
    </div>
  );
};

export default Saved;
