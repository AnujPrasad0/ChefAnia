import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HeartMinus, HeartPlus } from "lucide-react";
import { updateRecipe } from "../slices/recipeSlice";

const ExploreItemContext = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { recipes, loading, error } = useSelector(
    (state) => state.savedrecipes
  );

  const recipe = recipes.find((item) => item._id === id);

  async function favouriteHandler() {
    dispatch(updateRecipe({ id, favourite: !recipe?.favourite }));
  }

  return (
    <div className="flex items-center justify-center p-3 sm:p-5 bg-[#f7ecf0] md:p-10">
      <div className="relative">
        <div className="relative z-10 bg-white text-[#293a4a] p-5 rounded-2xl w-full max-w-4xl roboto text-md sm:text-xl md:p-10">
          <div className="flex items-center justify-between pb-3">
            <h1>
              <b className="dm-serif">Your Title:</b> {recipe?.title}
            </h1>
            <button onClick={favouriteHandler} className="cursor-pointer">
              {!recipe?.favourite ? (
                <HeartPlus color="#b14c6c" />
              ) : (
                <HeartMinus />
              )}
            </button>
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {recipe?.recipe}
          </ReactMarkdown>
        </div>
        <div className="absolute top-1 left-1 h-full w-full bg-linear-to-r from-[#b14c6c] to-[#66435b] rounded-2xl"></div>
      </div>
    </div>
  );
};

export default ExploreItemContext;
