import React from 'react';
import { useBookStore } from '../BookStoreContext';
import '../styles/pricing.css';
function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity, subtotal, shipping, total } = useBookStore();
  
  if (cart.length === 0) {
    return (
      <div className="cart-section">
        <h2 className="section-title">Your Shopping Cart</h2>
        <p>Your cart is currently empty. Browse our collection and add some magical items!</p>
      </div>
    );
  }
  
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
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                />
              </td>
              <td>£{(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => removeFromCart(item.id)}>Remove</button>
              </td>
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
export default ShoppingCart;