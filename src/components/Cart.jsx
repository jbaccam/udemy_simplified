import React from 'react';

const Cart = ({ cart, setCart, setStep }) => {
  // TODO:
  // - Display cart items
  // - Allow item removal
  // - Show total price

  return (
    <div>
      <h2>Your Cart</h2>
      {/* List of cart items */}
      {/* Remove button for each item */}
      <button onClick={() => setStep("payment")}>Proceed to Payment</button>
      <button onClick={() => setStep("browse")}>Continue Shopping</button>
    </div>
  );
};

export default Cart;
