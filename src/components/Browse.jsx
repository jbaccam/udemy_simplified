import React from 'react';
import {Courses} from '../data/Courses'

const Browse = ({ cart, setCart, setStep }) => {
  // TODO:
  // - Display list of courses (use props or mock data)
  // - Add search input fields (extra credit)
  // - Add "Add to Cart" button for each course

  return (
    <div>
      {/* Add appropriate Tailwind styling 👇 */}
      <h2>Browse Courses</h2> 
      {/* Search input (Extra Credit)*/} 
      {/* Course list with Add to Cart button */}
      <button onClick={() => setStep("cart")}>Go to Cart</button>
    </div>
  );
};

export default Browse;
