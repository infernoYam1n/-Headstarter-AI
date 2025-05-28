import React, { useState } from 'react';
import { useBookStore } from '../context/BookStoreContext';
import { Heart, ShoppingCart, Info } from 'lucide-react';
import '../styles/bookSection.css';

// Enhanced Book Card Component with hover effects and better styling
const BookCard = ({ book }) => {
  const { addToCart, addToWishlist } = useBookStore();
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if book is a special edition
  const isSpecialEdition = book.category === 'slytherin';
  
  return (
    <div 
      className={`book-card ${isSpecialEdition ? 'slytherin-edition' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="book-image-container">
        {isSpecialEdition && <div className="special-edition-badge">Slytherin Edition</div>}
        <img 
          src={book.image} 
          alt={`Cover of ${book.title}`}
          className={`book-cover-image ${isHovered ? 'book-hover' : ''}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/images/default-book-cover.jpg';
          }}
        />
        
        {isHovered && (
          <div className="quick-actions">
            <button 
              className="action-button add-to-cart"
              onClick={() => addToCart(book)}
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
            <button 
              className="action-button add-to-wishlist"
              onClick={() => addToWishlist(book)}
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </button>
          </div>
        )}
      </div>
      
      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-format">{book.format}</p>
        
        <div className="book-price-container">
          {book.originalPrice && book.originalPrice > book.price ? (
            <>
              <span className="original-price">£{book.originalPrice.toFixed(2)}</span>
              <span className="discounted-price">£{book.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="book-price">£{book.price.toFixed(2)}</span>
          )}
          
          {isSpecialEdition && (
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
            <Info size={16} />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Book Section Component with better organization and filtering
const SlytherinBookSection = () => {
  const { books } = useBookStore();
  const [filter, setFilter] = useState('all');
  
  // Filter books to get only Slytherin category
  const slytherinBooks = books.filter(book => book.category === 'slytherin');
  
  // Apply additional filtering based on user selection
  const filteredBooks = filter === 'all' 
    ? slytherinBooks 
    : slytherinBooks.filter(book => book.subcategory === filter);
  
  // Sort books by release date (newest first)
  const sortedBooks = [...filteredBooks].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  
  return (
    <section className="slytherin-book-section">
      <div className="section-header">
        <h2 className="section-title">Slytherin House Collection</h2>
        <p className="section-description">
          Exclusive editions for the cunning and ambitious. These special house editions feature 
          unique cover designs, additional content, and Slytherin-specific illustrations.
        </p>
      </div>
      
      <div className="filter-controls">
        <button 
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Editions
        </button>
        <button 
          className={`filter-button ${filter === 'limited' ? 'active' : ''}`}
          onClick={() => setFilter('limited')}
        >
          Limited Editions
        </button>
        <button 
          className={`filter-button ${filter === 'illustrated' ? 'active' : ''}`}
          onClick={() => setFilter('illustrated')}
        >
          Illustrated
        </button>
      </div>
      
      {sortedBooks.length === 0 ? (
        <div className="no-results">
          <p>No Slytherin editions found matching your criteria.</p>
        </div>
      ) : (
        <div className="book-grid">
          {sortedBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
      
      <div className="collection-footer">
        <div className="collection-stats">
          <span className="stats-label">Total editions available:</span>
          <span className="stats-value">{slytherinBooks.length}</span>
        </div>
        <button className="btn-secondary view-all-btn">
          View Complete Slytherin Collection
        </button>
      </div>
    </section>
  );
};

export default SlytherinBookSection;