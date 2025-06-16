import React from "react";
import { Link } from "react-router-dom";

type TBookCard = { id: string; title: string; image: string; price: number };

const BookCard: React.FC<TBookCard> = ({ id, title, image, price }) => {
  return (
    <div className="rounded border p-4">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="mb-2 h-32 w-full object-cover"
        />
        <h2 className="font-bold">{title}</h2>
        <p>${price}</p>
      </Link>
    </div>
  );
};
export default BookCard;
