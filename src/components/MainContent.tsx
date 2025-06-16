import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { LuTally3 } from "react-icons/lu";
import axios from "axios";
import BookCard from "./BookCard";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice,
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice,
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationbuttons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
    }
    if (currentPage + 2 > totalPages) {
      startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <section className="xs:w-[20rem] p-5 sm:w-[40rem[] lg:w-[55rem] xl:w-[55rem]">
      <div className="mb-5">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="relative mt-5 mb-5">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center rounded-full border px-4 py-2">
              <LuTally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute mt-2 w-full rounded border border-gray-300 bg-white sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>
        <div className="mt-5 flex flex-col items-center justify-between sm:flex-row">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 rounded-full border px-4 py-2"
          >
            Previous
          </button>
          <button className="mx-2 rounded-full border px-4 py-2">
            <div className="flex flex-wrap justify-center">
              {getPaginationbuttons().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-1 rounded-full border px-4 py-2 ${page === currentPage ? "bg-black text-white" : ""}`}
                >{page}</button>
              ))}
            </div>
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-2 rounded-full border px-4 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
export default MainContent;
