import React from 'react';
import { useBookStore } from './Context';
import '../styles/pricing.css';

const BookGrid = () => {
  const { books, addToCart } = useBookStore();

  return (
    <section className="book-collection">
      <div className="book-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <div className="book-image-container">
              <img 
                src={book.image} 
                alt={`Cover of ${book.title}`}
                className="book-cover-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentElement.innerHTML = `
                    <div class="book-placeholder">
                      <div class="placeholder-text">
                        <span class="book-title-placeholder">${book.title}</span>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
            
            <div className="book-details">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <p className="book-format">{book.format}</p>
              <div className="book-price-container">
                <span className="book-price">${book.price.toFixed(2)}</span>
                {book.category === 'slytherin' && (
                  <span className="special-badge">Special Edition</span>
                )}
              </div>
              
              <div className="book-actions">
                <button 
                  className="btn-primary"
                  onClick={() => addToCart(book)}
                >
                  Add to Cart
                </button>
                <button className="btn-secondary">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookGrid;