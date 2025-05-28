import React from 'react';
import './App.css';
import { BookStoreProvider } from './BookStoreContext';
import Navigation from './components/Navigation';
import BookStore from './components/BookStore';
import AppPricing from './components/pricing';

function BookStoreApp() {
  return (
    <BookStoreProvider>
      <div className="App">
        <Navigation />
        <main className="container">
          <BookStore />
          <AppPricing />
        </main>
      </div>
    </BookStoreProvider>
  );
}

export default BookStoreApp;