"use client";

import { Search } from "@/components/icons";

export const SearchForm = () => {
  return (
    <form
      className="app_top_search"
      role="search"
      aria-label="Site Search"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="app_main_search_input">
        <Search aria-hidden="true" focusable="false" />
        <input
          type="text"
          name="search"
          placeholder="Search your favorite products, brands ..."
          aria-label="Search"
        />
      </div>
    </form>
  );
};
