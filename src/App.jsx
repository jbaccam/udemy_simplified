import React, { useState } from 'react';
import BrowseCourses from './components/Browse';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Summary from './components/Summary';

const App = () => {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("browse");

  return (
    <div className="app-container">
      {step === "browse" && <BrowseCourses cart={cart} setCart={setCart} setStep={setStep} />}
      {step === "cart" && <Cart cart={cart} setCart={setCart} setStep={setStep} />}
      {step === "payment" && <Payment cart={cart} setCart={setCart} setStep={setStep} />}
      {step === "summary" && <Summary cart={cart} setCart={setCart} setStep={setStep} />}
    </div>
  );
};

export default App;
