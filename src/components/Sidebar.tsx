import axios from "axios";
import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

type TProduct = {
  category: string;
};

type TFetchResponse = {
  products: TProduct[];
};

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "Apple",
    "Watch",
    "Fasion",
    "Trend",
    "Shoes",
    "Shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const data: TFetchResponse = response.data;
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category)),
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching product");
      }
    };
    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="h-screen w-64 p-5">
      <h1 className="mt-4 mb-10 text-2xl font-bold">React Store</h1>

      {/* Search inputs */}
      <section>
        <section>
          <input
            type="text"
            className="rounded border-2 px-2 sm:mb-0"
            placeholder="Search Product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex items-center justify-center">
            <input
              type="text"
              className="mr-2 mb-3 w-full border-2 px-5 py-3"
              placeholder="Min"
              value={minPrice ?? ""}
              onChange={handleMinPriceChange}
            />
            <input
              type="text"
              className="mr-2 mb-3 w-full border-2 px-5 py-3"
              placeholder="Max"
              value={maxPrice ?? ""}
              onChange={handleMaxPriceChange}
            />
          </div>

          {/* Categories Section */}
          <div className="mb-5">
            <h2 className="mb-3 text-xl font-semibold">Categories</h2>
          </div>

          {categories.map((category, index) => (
            <label key={index} className="mb-2 block">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 h-[16px] w-[16x]"
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>
        {/* Keywords Section */}
        <div className="mb-5">
          <h2 className="mb-3 text-xl font-semibold">Keywords</h2>
        </div>

        <div>
          {keywords.map((keyword, index) => (
            <button
              key={index}
              className="mb-2 block w-full rounded border px-4 py-2 text-left hover:bg-gray-200"
              onClick={() => handleKeywordClick(keyword)}
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={handleResetFilters}
          className="mt-5 mb-[4rem] w-full rounded bg-black py-2 text-white hover:bg-gray-900"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};
export default Sidebar;
