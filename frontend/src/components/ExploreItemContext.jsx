import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";


const ExploreItemContext = () => {
  const { recipe, loading, error } = useSelector(
    (state) => state.exploreRecipeDetails
  );

  console.log(recipe);

  const { id } = useParams();
  console.log(id);

  return (
    <div className="flex items-center justify-center p-3 sm:p-5 bg-[#f7ecf0] md:p-10">
      <div className="relative">
        <div className="relative z-10 bg-white text-[#293a4a] p-5 rounded-2xl w-full max-w-4xl roboto text-md sm:text-xl lg:p-10">
          <div className="flex items-center justify-between pb-3">
            <h1>
              <b className="dm-serif">Title:</b> {recipe?.title}
            </h1>
          </div>
          <div className="flex flex-col">
            <p>Yields and Times</p>
            <p>Servings: {recipe?.servings}</p>
            <p>
              Preparation Time:{" "}
              {recipe.preparationMinutes ? recipe.preparationMinutes : "--"}{" "}
              minutes
            </p>
            <p>Cooking Time: {recipe?.readyInMinutes} minutes</p>
            <p>Ingredients :</p>
            {recipe?.extendedIngredients?.map((item) => (
              <p key={item.id}>{item.original}</p>
            ))}
            <p>Instructions :</p>
            <p dangerouslySetInnerHTML={{ __html: recipe?.instructions }}></p>
          </div>
        </div>
        {loading && (
          // <p className="text-center text-[#293a4a]">Loading more recipes...</p>
          <div className="flex flex-col items-center justify-center gap-6 py-10">
            {/* Animated gradient circle */}
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#b14c6c] to-[#66435b] animate-pulse"></div>
              <Loader2 className="absolute inset-0 m-auto w-12 h-12 text-white animate-spin" />
            </div>

            {/* Text */}
            <p className="dm-serif text-2xl sm:text-3xl text-[#293a4a] text-center">
              Loading!
            </p>
          </div>
        )}
        <div className="absolute top-1 left-1 h-full w-full bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-2xl"></div>
      </div>
    </div>
  );
};

export default ExploreItemContext;
