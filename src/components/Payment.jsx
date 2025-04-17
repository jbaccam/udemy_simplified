import React, { useState } from 'react';

const Payment = ({ cart, setCart, setStep }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    name: '', email: '', address: '',
    cardNumber: '', expiryDate: '', cvc: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  // formatting helpers
  const handleCardNumberChange = e => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
    setPaymentInfo({ ...paymentInfo, cardNumber: formatted });
  };
  const handleExpiryDateChange = e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    setPaymentInfo({ ...paymentInfo, expiryDate: v });
  };
  const handleCvcChange = e => {
    setPaymentInfo({ ...paymentInfo, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) });
  };

  // compute total
  const totalCost = cart.reduce((sum, c) => {
    const price = parseFloat(c.price) || 0;
    const qty = c.quantity || 1;
    return sum + price * qty;
  }, 0);

  const handleSubmit = e => {
    e.preventDefault();
    const { name, email, address, cardNumber, expiryDate, cvc } = paymentInfo;

    // simple validation
    if (!name || !email || !address || !cardNumber || !expiryDate || !cvc) {
      setError("Please fill out all fields.");
      return;
    }

    // “process” payment purely in the UI
    setError('');
    setLoading(true);

    // simulate a tiny delay so the user sees the spinner
    setTimeout(() => {
      // store user info for summary
      sessionStorage.setItem(
        'userInfo',
        JSON.stringify({ name, email, address })
      );

      // clear cart and advance to summary
      setStep('summary');
      setLoading(false);
    }, 500);
  };


  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-3xl font-bold mb-6">Payment Details</h2>

      {/* Order Summary */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Your Order:</h3>
        {cart.length === 0
          ? <p className="text-gray-600">Your cart is empty.</p>
          : (
            <ul className="mb-4">
              {cart.map(c => (
                <li key={c.offering_id} className="flex justify-between border-b py-2">
                  <span>{c.quantity || 1}× {c.title}</span>
                  <span>${((parseFloat(c.price) || 0) * (c.quantity || 1)).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )
        }
        <div className="text-right font-bold text-lg">
          Total: ${totalCost.toFixed(2)}
        </div>
      </div>

      {/* Payment & User Info Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-blue-500">Processing payment…</p>}

        {/* User Info */}
        <div>
          <label className="block text-lg mb-1">Name</label>
          <input
            type="text" name="name" value={paymentInfo.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-lg mb-1">Email</label>
          <input
            type="email" name="email" value={paymentInfo.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-lg mb-1">Address</label>
          <input
            type="text" name="address" value={paymentInfo.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="123 Main St, City, State ZIP"
          />
        </div>

        {/* Card Info */}
        <div>
          <label className="block text-lg mb-1">Card Number</label>
          <input
            type="text" name="cardNumber" value={paymentInfo.cardNumber}
            onChange={handleCardNumberChange}
            className="w-full p-3 border rounded-lg"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-lg mb-1">Expiry Date</label>
            <input
              type="text" name="expiryDate" value={paymentInfo.expiryDate}
              onChange={handleExpiryDateChange}
              className="w-full p-3 border rounded-lg"
              placeholder="MM/YY"
            />
          </div>
          <div className="flex-1">
            <label className="block text-lg mb-1">CVC</label>
            <input
              type="text" name="cvc" value={paymentInfo.cvc}
              onChange={handleCvcChange}
              className="w-full p-3 border rounded-lg"
              placeholder="123"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          Submit Payment
        </button>
      </form>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep('cart')}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Back to Cart
        </button>
        <button
          onClick={() => setStep('browse')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>

      <footer className="mt-8 text-center text-gray-500 py-4 border-t">
        <p>Payment View implemented by Luke Patterson</p>
      </footer>
    </div>
  );
};

export default Payment;
