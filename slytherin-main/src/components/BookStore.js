import React from 'react';
import { useBookStore } from './Context';
import FeaturedCollection from './FeaturedCollection';
import BookSection from './BookSection';
import ShoppingCart from './ShoppingCart';
import '../styles/pricing.css';
function BookStore() {
  const { books } = useBookStore();
  
  // Filter books by category
  const mainSeriesBooks = books.filter(book => book.category === 'mainSeries');
  const slytherinBooks = books.filter(book => book.category === 'slytherin');
  const companionBooks = books.filter(book => book.category === 'companion');
  
  return (
    <div className="bookstore-container">
      <FeaturedCollection />
      
      <BookSection 
        title="Magical Books" 
        books={mainSeriesBooks} 
        description="The original Harry Potter series that started it all." 
      />
      
      <BookSection 
        title="Slytherin House Specials" 
        books={slytherinBooks} 
        description="Special editions for the cunning and ambitious Slytherin house." 
      />
      
      {companionBooks.length > 0 && (
        <BookSection 
          title="Companion Books" 
          books={companionBooks} 
          description="Explore the wider wizarding world with these companion titles." 
        />
      )}
      
      <ShoppingCart />
    </div>
  );
}

export default BookStore;