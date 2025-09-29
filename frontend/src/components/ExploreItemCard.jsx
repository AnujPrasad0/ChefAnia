import food1 from "../assets/food1.png";
import { useNavigate } from "react-router-dom";

const ExploreitemCard = ({ recipe, address }) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex-1 min-w-37 lg:min-w-45 max-w-70">
      <div
        onClick={() => navigate(`/recipes/${address}/${recipe.id}`)}
        className="relative rounded-2xl z-10 top-0 left-0 h-full w-full bg-white items-center cursor-pointer flex flex-col gap-2 py-4 px-4"
      >
        <div className="border-3 border-[#293a4a] overflow-hidden rounded-2xl h-37 w-full">
          <img
            className="w-full h-full object-cover"
            src={recipe?.image}
            alt={recipe?.image}
          />
        </div>
        <div className="text-[#293a4a] text-lg dm-serif w-full">
          {recipe?.title}
        </div>
      </div>
      <div className="absolute rounded-2xl top-1 left-1 h-full w-full bg-linear-to-r from-[#b14c6c] to-[#66435b]"></div>
    </div>
  );
};

export default ExploreitemCard;
