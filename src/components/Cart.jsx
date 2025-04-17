import React from 'react';

const Cart = ({ cart, setCart, setStep }) => {
  // total number of items (sum of quantities)
  const itemCount = cart.reduce((sum, c) => sum + (c.quantity || 1), 0);

  // total cost
  const totalCost = cart.reduce((sum, c) => {
    const price = parseFloat(c.price) || 0;
    const qty   = c.quantity   || 1;
    return sum + price * qty;
  }, 0);

  // remove an item
  const handleRemove = offering_id => {
    setCart(cart.filter(c => c.offering_id !== offering_id));
  };

  // change quantity
  const handleQuantityChange = (offering_id, newQty) => {
    if (newQty < 1) return;
    setCart(cart.map(c =>
      c.offering_id === offering_id
        ? { ...c, quantity: newQty }
        : c
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-3xl font-bold mb-2">
        Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Please add some courses.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(course => (
            <div key={course.offering_id} className="flex justify-between items-center border-b py-4">
              {/* Course info */}
              <div>
                <p className="font-medium">{course.title}</p>
                <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-600">
                  {course.price === "0" ? "Free" : `$${course.price}`}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center justify-center gap-2 h-full">
                <button
                  onClick={() => handleQuantityChange(course.offering_id, (course.quantity || 1) - 1)}
                  disabled={(course.quantity || 1) <= 1}
                  className="h-10 w-10 flex items-center justify-center border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >–</button>
                <span className="w-8 text-center text-lg">{course.quantity || 1}</span>
                <button
                  onClick={() => handleQuantityChange(course.offering_id, (course.quantity || 1) + 1)}
                  className="h-10 w-10 flex items-center justify-center border rounded"
                >+</button>
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
          disabled={itemCount === 0}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
