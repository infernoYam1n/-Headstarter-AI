import React from 'react';
import { useBookStore } from '../BookStoreContext';
import '../styles/pricing.css';

function BookCard({ book }) {
  const { addToCart } = useBookStore();
  
  return (
    <div className="book-card">
      <div className="book-image">
        <img src={book.image} alt={book.title} />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-format">{book.format}</p>
        <p className="book-price">£{book.price.toFixed(2)}</p>
        <button className="btn" onClick={() => addToCart(book)}>Add to Cart</button>
        <button className="btn btn-secondary">Wishlist</button>
      </div>
    </div>
  );
}

export default BookCard;