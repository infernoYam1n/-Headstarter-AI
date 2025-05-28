import React, { createContext, useState, useContext } from 'react';

// Import images properly
import img200 from '../assets/images/img200.jpg';
import img211 from '../assets/images/img211.jpg';
import img212 from '../assets/images/img212.jpg';
import img2 from '../assets/images/img2.jpg';
import img4 from '../assets/images/img4.jpg';
import '../styles/pricing.css';
// Create context
const BookStoreContext = createContext();

// Book store provider component
export const BookStoreProvider = ({ children }) => {
  // Sample book data with corrected image imports
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      format: "Hardcover | 320 pages",
      price: 15.99,
      image: img200,
      category: "mainSeries"
    },
    {
      id: 2,
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      format: "Hardcover | 352 pages",
      price: 15.99,
      image: img211,
      category: "mainSeries"
    },
    {
      id: 3,
      title: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      format: "Hardcover | 448 pages",
      price: 16.99,
      image: img212,
      category: "mainSeries"
    },
    {
      id: 4,
      title: "Fantastic Beasts and Where to Find Them",
      author: "Newt Scamander (J.K. Rowling)",
      format: "Hardcover | 128 pages",
      price: 12.99,
      image: img200,
      category: "companion"
    },
    {
      id: 5,
      title: "Slytherin House Edition: Philosopher's Stone",
      author: "J.K. Rowling",
      format: "Hardcover | Special Edition",
      price: 20.99,
      image: img2,
      category: "slytherin"
    },
    {
      id: 6,
      title: "The Art of Potions: Slytherin Edition",
      author: "Severus Snape (Unofficial)",
      format: "Leather-bound | Limited Edition",
      price: 35.99,
      image: img4,
      category: "slytherin"
    }
  ]);

  // Shopping cart state
  const [cart, setCart] = useState([]);

  // Add to cart function
  const addToCart = (book) => {
    const existingItem = cart.find(item => item.id === book.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === book.id 
          ? {...item, quantity: item.quantity + 1} 
          : item
      ));
    } else {
      setCart([...cart, {
        id: book.id,
        title: book.title,
        format: book.format.split('|')[0].trim(),
        price: book.price,
        quantity: 1
      }]);
    }
  };

  // Remove from cart function
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Update quantity function
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    
    setCart(cart.map(item => 
      item.id === id 
        ? {...item, quantity: parseInt(quantity)} 
        : item
    ));
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 3.99 : 0;
  const total = subtotal + shipping;

  return (
    <BookStoreContext.Provider
      value={{
        books,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        shipping,
        total
      }}
    >
      {children}
    </BookStoreContext.Provider>
  );
};

// Custom hook to use the BookStore context
export const useBookStore = () => useContext(BookStoreContext);

export default BookStoreContext;