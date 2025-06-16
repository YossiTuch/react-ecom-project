import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product: ", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-[60%] p-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 rounded bg-black px-4 py-2 text-white"
      >
        Back
      </button>

      <img
        src={product.images[0]}
        alt={product.title}
        className="mb-5 h-auto w-[50%]"
      />

      <h1 className="mb-4 text-2xl font-bold">{product.title}</h1>
      <p className="mb-4 w-[70%] text-gray-700">{product.description}</p>
      <div className="flex gap-10">
        <p><b>Price:</b> ${product.price}</p>
        <p><b>Rating:</b> {product.rating}</p>
      </div>
    </div>
  );
};
export default ProductPage;
