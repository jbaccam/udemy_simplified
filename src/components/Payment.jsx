import React, { useState } from 'react';

const Payment = ({ cart, setCart, setStep }) => {
  // includes user and card info
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });
  const [error, setError] = useState('');

  // Handle input change for all form fields.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  // calculate total price
  const totalCost = cart.reduce((total, course) => {
    const price = parseFloat(course.price);
    return isNaN(price) ? total : total + price;
  }, 0);

  // validate form and the go to summary
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if any fields are empty
    const { name, email, address, cardNumber, expiryDate, cvc } = paymentInfo;
    if (!name || !email || !address || !cardNumber || !expiryDate || !cvc) {
      setError("Please fill out all fields.");
      return;
    }

    setError("");
    setStep("summary");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-3xl font-bold mb-6">Payment Details</h2>

      {/* Order Review Section */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Your Order:</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="mb-4">
            {cart.map((course) => (
              <li key={course.offering_id} className="flex justify-between border-b py-2">
                <span>{course.title}</span>
                <span>{course.price === "0" ? "Free" : `$${course.price}`}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="text-right font-bold text-lg">
          Total: ${totalCost.toFixed(2)}
        </div>
      </div>

      {/* Payment and User Information Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500">{error}</p>}

        {/* User Information */}
        <div>
          <label className="block text-lg font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={paymentInfo.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={paymentInfo.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-1">Shipping Address:</label>
          <input
            type="text"
            name="address"
            value={paymentInfo.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="123 Main St, City, State ZIP"
          />
        </div>

        {/* Payment Card Information */}
        <div>
          <label className="block text-lg font-medium mb-1">Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-lg font-medium mb-1">Expiry Date:</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="MM/YY"
            />
          </div>
          <div className="flex-1">
            <label className="block text-lg font-medium mb-1">CVC:</label>
            <input
              type="text"
              name="cvc"
              value={paymentInfo.cvc}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="123"
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
          Submit Payment
        </button>
      </form>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep("cart")}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Back to Cart
        </button>
        <button
          onClick={() => setStep("browse")}
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
