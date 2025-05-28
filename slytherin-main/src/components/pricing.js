import React, { useState } from 'react';
import '../styles/pricing.css';

function App() {
  // Sample book data
  const books = [
    {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      format: "Hardcover | 320 pages",
      price: 15.99,
      image: require('../assets/images/img200.jpg')
    },
    {
      id: 2,
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      format: "Hardcover | 352 pages",
      price: 15.99,
      image: require('../assets/images/img211.jpg')
    },
    {
      id: 3,
      title: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      format: "Hardcover | 448 pages",
      price: 16.99,
      image: require('../assets/images/img212.jpg')
    },
    {
      id: 4,
      title: "Fantastic Beasts and Where to Find Them",
      author: "Newt Scamander",
      format: "Hardcover | 128 pages",
      price: 12.99,
      image: require('../assets/images/img2.jpg')
    }
  ];

    const slytherinSpecials = [
    {
      id: 5,
      title: "Slytherin Edition: Philosopher's Stone",
      author: "J.K. Rowling",
      format: "Hardcover | Special Edition",
      price: 20.99,
      image: require('../assets/images/img3.jpg')
    },
    {
      id: 6,
      title: "The Art of Potions: Slytherin Edition",
      author: "Severus Snape (Unofficial)",
      format: "Hardcover | Special Edition ",
      price: 35.99,
      image: require('../assets/images/img4.jpg')
    },
    {
      id: 7,
      title: "Slytherin Edition: Chamber of Secrets",
      author: "J.K. Rowling",
      format: "Hardcover | Special Edition",
      price: 22.99,
      image: require('../assets/images/img5.jpg')
    },
    {
      id: 8,
      title: "Potion Making",
      author: "Libatius Borage",
      format: "Leather-bound | Limited Edition",
      price: 30.99,
      image: require('../assets/images/img6.jpg')
    },
  ];
    

  // Shopping cart state
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      format: "Hardcover",
      price: 15.99,
      quantity: 1
    },
    {
      id: 4,
      title: "Fantastic Beasts and Where to Find Them",
      format: "Hardcover",
      price: 12.99,
      quantity: 1
    }
  ]);

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
  const shipping = 3.99;
  const total = subtotal + shipping;

  return (
    <div className="App">
      <main className="container">
        <div className="title-holder">
          <h1>The Hogwarts Shoppe</h1>
          <div className="subtitle">Experience the Magic Through Gaming - just play, discover the magic and say All izz Well</div>
        </div>
        <Navigation />
        <FeaturedCollection />
        <BookSection title="Magical Books" books={books} addToCart={addToCart} />
        <BookSection title="Slytherin House Specials" books={slytherinSpecials} addToCart={addToCart} />
        <ShoppingCart 
          cart={cart} 
          removeFromCart={removeFromCart} 
          updateQuantity={updateQuantity}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
        />
      </main>
    </div>
  );
}

// Navigation Component
function Navigation() {
  return (
    <nav>
      <ul>
        <li><a href="#" className="current-category">Books</a></li>
        <li><a href="#games">Wizard Games</a></li>
        <li><a href="#blog">Movies & TV shows</a></li>
      </ul>
    </nav>
  );
}

// Featured Collection Component
function FeaturedCollection() {
  return (
    <div className="featured-collection">
      <h2>Hogwarts Emporium</h2>
      <p>Experience the entire magical journey with our complete set of Hogwarts adventures. Perfect for both new readers and seasoned wizards looking to revisit the magic.</p>
      <a href="#" className="btn">View Collection</a>
    </div>
  );
}

// Book Card Component
function BookCard({ book, addToCart }) {
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

// Book Section Component
function BookSection({ title, books, addToCart }) {
  return (
    <>
      <h2 className="section-title">{title}</h2>
      <div className="book-grid">
        {books.map(book => (
          <BookCard key={book.id} book={book} addToCart={addToCart} />
        ))}
      </div>
    </>
  );
}

// Shopping Cart Component
function ShoppingCart({ cart, removeFromCart, updateQuantity, subtotal, shipping, total }) {
  return (
    <div className="cart-section">
      <h2 className="section-title">Your Shopping Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Format</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.format}</td>
              <td>£{item.price.toFixed(2)}</td>
              <td>
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity} 
                  className="quantity-input"
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                />
              </td>
              <td>£{(item.price * item.quantity).toFixed(2)}</td>
              <td><button className="btn btn-secondary" onClick={() => removeFromCart(item.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="cart-total">
        <p><strong>Subtotal:</strong> £{subtotal.toFixed(2)}</p>
        <p><strong>Shipping:</strong> £{shipping.toFixed(2)}</p>
        <p><strong>Total:</strong> £{total.toFixed(2)}</p>
      </div>
      
      <div className="checkout-options">
        <button className="btn btn-secondary">Continue Shopping</button>
        <button className="btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default App;