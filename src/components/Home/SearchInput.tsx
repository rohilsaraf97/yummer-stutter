import React, { useState } from "react";

const SearchInput = ({
  onSubmit,
  onShowAll,
}: {
  onSubmit: (query: string) => void;
  onShowAll: () => void;
}) => {
  const [searchQuery, setsearchQuery] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(searchQuery);
  };

  const showHandler = () => {
    setsearchQuery("");
    onShowAll();
  };
  return (
    <div className="max-w-6xl mx-auto font-poppins">
      <form className="m-10" onSubmit={submitHandler}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>

        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"
            placeholder="Search for recipes"
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}
            required
          />
          <div className="absolute right-2.5 bottom-2.5 space-x-2">
            <button
              type="submit"
              className="text-white  bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
            <button
              type="button"
              className="text-white bg-teal-500 hover:bg-sky-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
              onClick={showHandler}
            >
              Show All
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
