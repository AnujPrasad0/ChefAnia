import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Search, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import ExploreitemCard from "./ExploreItemCard";
import { getExploreRecipe } from "../slices/exploreSlice";

const Explore = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error, totalResults, lastSearch } = useSelector(
    (state) => state.exploreRecipe
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [currentSearch, setCurrentSearch] = useState("");
  const sentinelRef = useRef(null);

  // refs to avoid stale closures inside IntersectionObserver
  const loadingRef = useRef(loading);
  const searchRef = useRef(currentSearch);
  const recipesRef = useRef(recipes);
  const totalRef = useRef(totalResults);

  // keep refs up-to-date
  useEffect(() => {
    loadingRef.current = loading;
    searchRef.current = currentSearch;
    recipesRef.current = recipes;
    totalRef.current = totalResults;
  }, [loading, currentSearch, recipes, totalResults]);

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
    dispatch(getExploreRecipe({ search: q, offset: 0, number: 10 }));
  };

  // attach IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (
            !loadingRef.current &&
            searchRef.current &&
            recipesRef.current.length < totalRef.current
          ) {
            const offset = recipesRef.current.length;
            const number = offset === 0 ? 10 : 6;
            dispatch(
              getExploreRecipe({
                search: searchRef.current,
                offset,
                number,
              })
            );
          }
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center w-full gap-10 md:pt-5 lg:pt-10 lg:gap-20">
      {/* Search Form */}
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

      {/* Results */}
      <div className="flex flex-wrap w-full gap-y-5 gap-x-2 sm:gap-x-5 lg:gap-8">
        {recipes.length > 0
          ? recipes.map((recipe) => (
              <ExploreitemCard
                key={recipe.id}
                recipe={recipe}
                address={"explore"}
              />
            ))
          : !loading && (
              <div className="w-full flex justify-center items-center">
                <p className="text-center py-10 md:py-20 text-[#293a4a] roboto text-2xl sm:text-4xl">
                  Search your recipe!
                </p>
              </div>
            )}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-6 py-10">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#b14c6c] to-[#66435b] animate-pulse"></div>
            <Loader2 className="absolute inset-0 m-auto w-12 h-12 text-white animate-spin" />
          </div>
          <p className="dm-serif text-2xl sm:text-3xl text-[#293a4a] text-center">
            Loading More!
          </p>
        </div>
      )}

      {/* Manual fallback load more button */}
      {!loading && recipes.length < totalResults && (
        <div className="mt-4">
          <button
            onClick={() => {
              const offset = recipes.length;
              const number = offset === 0 ? 10 : 6;
              dispatch(
                getExploreRecipe({ search: lastSearch, offset, number })
              );
            }}
            className="px-4 py-2 rounded bg-[#293a4a] text-white"
          >
            Load more
          </button>
        </div>
      )}

      {/* Sentinel element for IntersectionObserver */}
      <div ref={sentinelRef} style={{ height: 1, width: "100%" }} />
    </div>
  );
};

export default Explore;
