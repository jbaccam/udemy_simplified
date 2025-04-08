import React, { useState } from 'react';

const Payment = ({ cart, setCart, setStep }) => {
  // Initialize state to store card number, expiry, and CVC
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update state with new value
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    // TODO:
    // - Validate that all fields are filled
    // - Optionally, check card number length, expiry format, etc.
    // - Show success message
    // - Move to summary view using setStep("summary")
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Payment Details</h2>

      {/* Order Review Section */}
      <div>
        <h3 className="text-xl font-semibold">Your Order:</h3>
        <ul>
          {/* Map the cart items */}
        </ul>
      </div>

      {/* Payment Form Inputs */}
      <div>
        <label>Card Number:</label>
        {/* Input block for card number */}

        <label>Expiry Date:</label>
        {/* Input block for expiry date */}

        <label>CVC:</label>
        {/* Input block for cvc */}
      </div>

      {/* Submit Payment Button */}
      <button
        onClick={() => setStep("summary")}
        className="bg-green-500 text-white py-2 px-6 rounded"
      >
        Submit Payment
      </button>
    </div>
  );
};

export default Payment;
