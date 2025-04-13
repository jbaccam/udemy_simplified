import React, {useState} from 'react';
import { Courses } from '../data/Courses'

const Browse = ({ cart, setCart, setStep }) => {
  // TODO:
  // - Display list of courses (use props or mock data)
  // - Add search input fields (extra credit)
  // - Add "Add to Cart" button for each course

  // State to keep track of searches
  const [searchTerm, setSearchTerm] = useState('');
  // State to track which courses are currently displayed
  const [displayedCourses, setDisplayedCourses] = useState(Courses); // Start by default displaying all courses
  // State for subject filter
  const [selectedSubject, setSelectedSubject] = useState('all');
  // State for difficulty level filter
  const [selectedLevel, setSelectedLevel] = useState('all');


  /*
  Helper function to apply both search filters
  */
  const filterCourses = (search, subject, level) => {
    let filtered = [...Courses];

    // Subject filter
    if (subject !== 'all') {
      filtered = filtered.filter(course => getSubjectFromId(course.id) === subject);
    }

    // Difficulty level filter
    if (level !== 'all') {
      filtered = filtered.filter(course => getLevelFromId(course.id) === level);
    }

    // Search filter (by title or instructor)
    if (search.trim() !== '') {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower)
      );
    }

    // Update displayed courses
    setDisplayedCourses(filtered);
  };


  /*
  Function to handle search input
  */
  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Apply all filters
    filterCourses(newSearchTerm, selectedSubject, selectedLevel);
  };

  // Handle subject filter changes
  const handleSubjectFilter = (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);

    // Apply all filters
    filterCourses(searchTerm, subject, selectedLevel);
  };

  // Handle difficulty level filter changes
  const handleLevelFilter = (event) => {
    const level = event.target.value;
    setSelectedLevel(level);

    // Apply all filters
    filterCourses(searchTerm, selectedSubject, level);
  };


  /* 
  Function for adding to cart
  */
  const handleAddToCart = (course) => {
    // Check if course is in cart
    const isAlreadyInCart = cart.some(item => item.offering_id === course.offering_id);

    if (isAlreadyInCart) {
      alert("Course already in cart");
    } else {
      setCart([...cart, course]);
      alert("Course added to cart!");
    }
  };


  /* 
  Function for getting unique subjects
  */
  const getSubjects = () => {
    const subjectSet = new Set();

    // Go through each course
    Courses.forEach(course => {
      const subject = getSubjectFromId(course.id);

      // Only add non-empty subjects
      if (subject) {
        subjectSet.add(subject);
      }
    });

    // Convert to array and sort
    return Array.from(subjectSet).sort();
  };


  /*
  Helper function to get course letters split from the course id numbers 
  example (se421) to just be se
  */
  const getSubjectFromId = (courseId) => {
    let subject = '';
    for (let i = 0; i < courseId.length; i++) {
      const char = courseId[i];
      if (isNaN(char)) {
        subject += char;
      } else {
        break;
      }
    }
    return subject;
  };


  // Function to extract difficulty level (first digit) from course ID
  const getLevelFromId = (courseId) => {
    // Loop through each character to find the first digit
    for (let i = 0; i < courseId.length; i++) {
      const char = courseId[i];

      // If it's a digit, return it
      if (char >= '0' && char <= '9') {
        return char;
      }
    }

    // If no digit found, return empty string
    return '';
  };


  // Get the list of subjects
  const subjects = getSubjects();

  // Create array of difficulty levels
  const difficultyLevels = [
    { value: '1', label: 'Beginner (100 level)' },
    { value: '2', label: 'Intermediate (200 level)' },
    { value: '3', label: 'Advanced (300 level)' },
    { value: '4', label: 'Expert (400 level)' },
    { value: '5', label: 'Graduate (500+ level)' }
  ];


  return (
    <div>
      {/* Add appropriate Tailwind styling 👇 */}
      <h1>Browse Courses</h1>
      <p>All available courses</p>

      {/* Search input (Extra Credit) */}
      <input
        type="text"
        placeholder="Search by title or instructor..."
        value={searchTerm}
        onChange={handleSearch}
        className="border rounded px-2 py-1 mb-2 w-full"
      />

      {/* Subject filter */}
      <select
        value={selectedSubject}
        onChange={handleSubjectFilter}
        className="border rounded px-2 py-1 mb-2"
      >
        <option value="all">All Subjects</option>
        {subjects.map(subj => (
          <option key={subj} value={subj}>
            {subj}
          </option>
        ))}
      </select>

      {/* Level filter */}
      <select
        value={selectedLevel}
        onChange={handleLevelFilter}
        className="border rounded px-2 py-1 mb-4"
      >
        <option value="all">All Levels</option>
        {difficultyLevels.map(lvl => (
          <option key={lvl.value} value={lvl.value}>
            {lvl.label}
          </option>
        ))}
      </select>

      {/* Course list with Add to Cart button */}
      <ul className="space-y-2">
        {displayedCourses.map(course => (
          <li
            key={course.offering_id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{course.title}</p>
              <p className="text-sm text-gray-600">
                Instructor: {course.instructor}
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(course)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      {/* Go to Cart */}
      <button
        onClick={() => setStep("cart")}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Go to Cart
      </button>
    </div>
  );

};

export default Browse;
