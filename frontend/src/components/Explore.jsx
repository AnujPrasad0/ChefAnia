import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import ExploreitemCard from "./ExploreitemCard";
import { getExploreRecipe } from "../slices/exploreSlice";

const Explore = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error, totalResults } = useSelector(
    (state) => state.exploreRecipe
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // used for subsequent "load more" requests
  const [currentSearch, setCurrentSearch] = useState("");
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load recipes");
    }
  }, [error]);

  // submit: initial load -> offset 0, number 10
  const submitHandler = (data) => {
    const q = (data.search || "").trim();
    if (!q) {
      toast.error("search bar cannot be empty");
      return;
    }
    setCurrentSearch(q);
    // initial load: number 10, offset 0
    dispatch(getExploreRecipe({ search: q, offset: 0, number: 10 }));
  };

  // load more: number = 6 after first load
  const loadMore = () => {
    if (loading) return;
    if (!currentSearch) return; // nothing to load
    if (recipes.length >= totalResults) return; // no more

    const offset = recipes.length; // skip already-loaded items
    const number = offset === 0 ? 10 : 6; // safe fallback (first request handled by submit)
    dispatch(getExploreRecipe({ search: currentSearch, offset, number }));
  };

  // IntersectionObserver to auto-load more when sentinel is visible
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // load more when sentinel visible
          loadMore();
        }
      },
      { root: null, rootMargin: "300px", threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
    // dependencies: recipes.length / currentSearch / loading
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes.length, currentSearch, loading, totalResults]);

  return (
    <div className="flex flex-col items-center w-full gap-10 md:pt-5 lg:pt-10 lg:gap-20">
      <form
        className="bg-white rounded-full text-[#293a4a] border-4 border-[#293a4a] text-lg sm:text-2xl w-full max-w-3xl flex items-center relative gap-5"
        onSubmit={handleSubmit(submitHandler, (err) =>
          toast.error(err.search?.message)
        )}
      >
        <input
          className="w-full outline-none ml-5 my-1 md:my-2"
          {...register("search", {
            required: "search bar cannot be empty",
          })}
          type="text"
          placeholder="Burger"
        />
        <button
          type="submit"
          className="border-l-3 pl-2 py-2 md:py-3 cursor-pointer pr-4"
        >
          <Search color="#293a4a" size={20} />
        </button>
      </form>

      <div className="flex flex-wrap w-full gap-y-5 gap-x-2 sm:gap-x-5 lg:gap-8">
        {recipes.map((recipe) => (
          <ExploreitemCard
            key={recipe.id}
            recipe={recipe}
            address={"explore"}
          />
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <p className="text-center text-[#293a4a]">Loading more recipes...</p>
      )}

      {/* Manual fallback button in case observer fails / during dev */}
      {!loading && recipes.length < totalResults && (
        <div className="mt-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 rounded bg-[#293a4a] text-white"
          >
            Load more
          </button>
        </div>
      )}

      {/* sentinel used by IntersectionObserver */}
      <div ref={sentinelRef} style={{ height: 1, width: "100%" }} />
    </div>
  );
};

export default Explore;
