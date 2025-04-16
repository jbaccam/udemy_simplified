import React from 'react';

const Cart = ({ cart, setCart, setStep }) => {
  // TODO:
  // - Display cart items
  // - Allow item removal
  // - Show total price

// Remove course from cart by id
  const handleRemove = (offering_id) => {
    const updatedCart = cart.filter((course) => course.offering_id !== offering_id);
    setCart(updatedCart);
  };

  // calculate the total cost of courses in the cart
  const totalCost = cart.reduce((total, course) => {
    const price = parseFloat(course.price);
    return !isNaN(price) ? total + price : total;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Please add some courses.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((course) => (
            <div key={course.offering_id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{course.title}</p>
                <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-600">
                  {course.price === "0" ? "Free" : `$${course.price}`}
                </p>
              </div>
              <button 
                onClick={() => handleRemove(course.offering_id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-end font-bold text-lg">
            Total: ${totalCost.toFixed(2)}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button 
          onClick={() => setStep("payment")}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Proceed to Payment
        </button>
        <button 
          onClick={() => setStep("browse")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>

      <footer className="mt-8 text-center text-gray-500 py-4 border-t">
        <p>My Cart View implemented by Luke Patterson</p>
      </footer>
    </div>
  );
};

export default Cart;
