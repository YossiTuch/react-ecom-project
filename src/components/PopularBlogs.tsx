import { LuMessageCircle, LuThumbsUp } from "react-icons/lu";

const PopularBlogs = () => {
  const blogs = [
    {
      title: "My Amazing Blog Title 1",
      author: "Jordan",
      likes: 142,
      comments: 44,
    },

    {
      title: "My Amazing Blog Title 2",
      author: "John",
      likes: 153,
      comments: 25,
    },
    {
      title: "My Amazing Blog title 3",
      author: "Arnold",
      likes: 50,
      comments: 14,
    },
  ];

  return (
    <div className="mt-4 ml-5 w-[23rem] rounded border bg-white p-5">
      <h2 className="mb-5 text-xl font-bold">Popular Blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index} className="mb-4">
            <div className="flex items-center justify-between">
              <span className="mb-2 font-bold">{blog.title}</span>
            </div>
            <span className="text-gray-600">Published by {blog.author}</span>
            <div className="mt-2 flex items-center">
              <LuMessageCircle size={16} />
              <span className="mr-5 ml-1 text-gray-500">{blog.comments}</span>
              <LuThumbsUp size={16}/>
               <span className="text-gray-500 mr-2 ml-2">{blog.likes}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PopularBlogs;
