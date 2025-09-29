import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteRecipe } from "../slices/recipeSlice";

const Recipecard = ({ id, title, show, address }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function deleteHandler() {
    const confirmation = confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmation) {
      dispatch(deleteRecipe(id));
    }
  }

  return (
    <div className="relative min-w-60 min-h-17 lg:min-h-20 w-full lg:w-[45%] max-w-130">
      <div className="relative rounded-2xl z-10 top-0 left-0 h-full w-full bg-white flex justify-between items-center cursor-pointer">
        <div
          onClick={() => navigate(`/recipes/${address}/${id}`)}
          className="text-[#293a4a] text-xl lg:text-2xl dm-serif px-6 py-1 truncate w-full"
        >
          {title}
        </div>
        {show ? (
          <div onClick={deleteHandler} className="px-2">
            <Trash2 color="#293a4a" />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="absolute rounded-2xl top-1 left-1 h-full w-full bg-linear-to-r from-[#b14c6c] to-[#66435b]"></div>
    </div>
  );
};

export default Recipecard;
