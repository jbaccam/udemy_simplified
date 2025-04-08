import React from 'react';

const Summary = ({ cart, setStep }) => {
  // TODO:
  // - Display summary of purchase
  // - Show payment success message
  // - Include "Back to Browse" button

  return (
    <div>
      <h2>Order Summary</h2>
      {/* Show courses, total price */}
      <button onClick={() => setStep("browse")}>Back to Browse</button>
    </div>
  );
};

export default Summary;
