import axios from "axios";
import { useEffect, useState } from "react";

type Author = {
  name: string;
  isFollowing: boolean;
  image: string;
};

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=5");
      const responseData = response.data;

      console.log(responseData);

      const authorsData: Author[] = responseData.results.map((user: any) => ({
        name: `${user.name.first} ${user.name.last}`,
        isFollowing: false,
        image: user.picture.medium,
      }));
      setAuthors(authorsData);
    } catch (error) {
      console.error("Error fetching authors: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author,
      ),
    );
  };
  return (
    <div className="mx-5 mt-[5rem] w-[23rem] rounded border bg-white p-5">
      <h2 className="mb-5 text-xl font-bold">Top Sellers</h2>
      <ul>
        {authors.map((author, index) => (
          <li key={index} className="mb-4 flex items-center justify-between">
            <section className="flex items-center justify-center">
              <img
                src={author.image}
                alt={author.name}
                className="h-[25%] w-[25%] justify-center rounded-full"
              />
              <span className="ml-4">{author.name}</span>
            </section>
            <button
              onClick={() => handleFollowClick(index)}
              className={`rounded border px-3 py-1 font-semibold text-white ${author.isFollowing ? "bg-red-500" : "bg-black"}`}
            >
              {author.isFollowing ? "unfollow" : "follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TopSellers;
