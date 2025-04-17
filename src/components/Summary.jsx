import React from 'react';

const Summary = ({ cart, setCart, setStep }) => {
  // Generate a random transaction ID 
  const transactionId = Math.random().toString(36).substr(2, 9).toUpperCase();

  // Format current date for the order confirmation
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate the total cost of all the items in the cart.
  // We treat invalid or free prices as zero.
  const totalCost = cart.reduce((total, course) => {
    // Check if the course is free or the price is not valid
    if (!course.price || (typeof course.price === 'string' && course.price.toLowerCase() === 'free') || course.price === "0") {
      return total;
    }
    const parsed = parseFloat(course.price);
    if (isNaN(parsed)) {
      return total;
    }
    const qty = course.quantity || 1;
    return total + parsed * qty;
  }, 0);

  // User info
  const stored = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
  const userInfo = {
    name: stored.name || '',
    email: stored.email || '',
    address: stored.address || ''
  };

  // Build the purchased courses section 
  let purchasedCoursesSection;
  if (cart.length === 0) {
    purchasedCoursesSection = (
      <p className="text-center text-gray-500">No courses in your order.</p>
    );
  } else {
    purchasedCoursesSection = (
      <div className="space-y-4">
        {cart.map(course => {
          const qty = course.quantity || 1;
          let displayPrice = "";
          // Determine if the course is free
          if (!course.price || (typeof course.price === 'string' && course.price.toLowerCase() === 'free') || course.price === "0") {
            displayPrice = "Free";
          } else {
            displayPrice = `$${(parseFloat(course.price) * qty).toFixed(2)}`;
          }
          return (
            <div key={course.offering_id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{qty}× {course.title}</p>
                <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
              </div>
              <p className="font-medium">{displayPrice}</p>
            </div>
          );
        })}
        <div className="flex justify-between pt-2 font-bold">
          <p>Total:</p>
          <p>${totalCost.toFixed(2)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Confirmation header with green background */}
        <div className="bg-green-500 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Order Confirmed!</h1>
          <p className="text-lg">Thank you for your purchase</p>
        </div>

        <div className="p-6">
          {/* Order details section */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <p className="text-gray-600">Order Date: {orderDate}</p>
            <p className="text-gray-600">Transaction ID: {transactionId}</p>
          </div>

          {/* Customer information section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-3">Customer Information</h3>
            <p><span className="font-medium">Name:</span> {userInfo.name}</p>
            <p><span className="font-medium">Email:</span> {userInfo.email}</p>
            <p><span className="font-medium">Address:</span> {userInfo.address}</p>
          </div>

          {/* Purchased courses section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-3">Purchased Courses</h3>
            {purchasedCoursesSection}
          </div>

          {/* Success message */}
          <div className="mb-4 bg-blue-50 p-4 rounded text-center">
            <p className="text-blue-800">
              Your courses are now available in your account. You will also receive a confirmation email shortly.
            </p>
          </div>

          {/* Return to browse button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setStep("browse");
                setCart([]);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-500 py-4 border-t">
        <p>Order Summary View implemented by Jeremiah Baccam</p>
      </footer>
    </div>
  );
};

export default Summary;
