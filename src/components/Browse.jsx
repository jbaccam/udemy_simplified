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
  // State for mobile filter visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false);


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

  // Helper function to format course subject for display
  const formatSubject = (subject) => {
    const subjectMap = {
      'cs': 'Computer Science',
      'math': 'Mathematics',
      'eng': 'Engineering',
      'bio': 'Biology',
      'chem': 'Chemistry',
      'phys': 'Physics',
      'se': 'Software Engineering',
      'art': 'Arts & Design',
      'hist': 'History',
      'psych': 'Psychology',
      'econ': 'Economics',
      'bus': 'Business'
    };
    
    return subjectMap[subject] || subject.toUpperCase();
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

  // Function to get color based on subject
  const getSubjectColor = (subject) => {
    const colorMap = {
      'cs': 'bg-blue-100 text-blue-800',
      'math': 'bg-green-100 text-green-800',
      'eng': 'bg-yellow-100 text-yellow-800',
      'bio': 'bg-emerald-100 text-emerald-800',
      'chem': 'bg-purple-100 text-purple-800',
      'phys': 'bg-orange-100 text-orange-800',
      'se': 'bg-indigo-100 text-indigo-800',
      'art': 'bg-pink-100 text-pink-800',
      'hist': 'bg-amber-100 text-amber-800',
      'psych': 'bg-teal-100 text-teal-800',
      'econ': 'bg-lime-100 text-lime-800',
      'bus': 'bg-sky-100 text-sky-800'
    };
    
    return colorMap[subject] || 'bg-gray-100 text-gray-800';
  };

  // Function to get difficulty color
  const getDifficultyColor = (level) => {
    const colorMap = {
      '1': 'bg-green-100 text-green-800',
      '2': 'bg-blue-100 text-blue-800',
      '3': 'bg-yellow-100 text-yellow-800',
      '4': 'bg-orange-100 text-orange-800',
      '5': 'bg-red-100 text-red-800'
    };
    
    return colorMap[level] || 'bg-gray-100 text-gray-800';
  };

  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-6">Browse Our Courses</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="w-full md:w-1/2 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </span>
            <input 
              type="text"
              placeholder="Search by course name or instructor..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:ml-auto">
            {/* Mobile filter toggle */}
            <button 
              onClick={toggleFilters}
              className="md:hidden flex justify-between items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <span className="font-medium">Filters</span>
              <span className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''} inline-block`}>
                ▼
              </span>
            </button>
            
            {/* Filters section */}
            <div className={`flex flex-col md:flex-row gap-2 md:gap-4 ${isFilterOpen ? 'block' : 'hidden md:flex'}`}>
              <select 
                value={selectedSubject} 
                onChange={handleSubjectFilter}
                className="p-3 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{formatSubject(subject)}</option>
                ))}
              </select>
              
              <select 
                value={selectedLevel} 
                onChange={handleLevelFilter}
                className="p-3 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Difficulty Levels</option>
                {difficultyLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* View Cart button */}
            <button 
              onClick={() => setStep("cart")}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition"
            >
              🛒
              View Cart
              <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Active filters */}
      {(selectedSubject !== 'all' || selectedLevel !== 'all' || searchTerm) && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>
          
          {selectedSubject !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              {formatSubject(selectedSubject)}
              <button 
                onClick={() => {
                  setSelectedSubject('all');
                  filterCourses(searchTerm, 'all', selectedLevel);
                }}
                className="ml-1 text-blue-500 hover:text-blue-700"
                aria-label="Remove subject filter"
              >
                ✕
              </button>
            </span>
          )}
          
          {selectedLevel !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              Level {selectedLevel}
              <button 
                onClick={() => {
                  setSelectedLevel('all');
                  filterCourses(searchTerm, selectedSubject, 'all');
                }}
                className="ml-1 text-green-500 hover:text-green-700"
                aria-label="Remove level filter"
              >
                ✕
              </button>
            </span>
          )}
          
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              "{searchTerm}"
              <button 
                onClick={() => {
                  setSearchTerm('');
                  filterCourses('', selectedSubject, selectedLevel);
                }}
                className="ml-1 text-purple-500 hover:text-purple-700"
                aria-label="Clear search"
              >
                ✕
              </button>
            </span>
          )}
          
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedSubject('all');
              setSelectedLevel('all');
              setDisplayedCourses(Courses);
            }}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium ml-2"
          >
            Clear all
          </button>
        </div>
      )}
      
      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-600 font-medium">
          {displayedCourses.length} {displayedCourses.length === 1 ? 'course' : 'courses'} found
        </p>
      </div>
      
      {/* Course Grid */}
      {displayedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map(course => {
            const courseSubject = getSubjectFromId(course.id);
            const courseLevel = getLevelFromId(course.id);
            
            return (
              <div key={course.offering_id} className="flex flex-col border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white">
                {/* Course Image */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/400x200?text=Course+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
                  
                  {/* Price tag */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-white text-gray-800 font-bold px-3 py-1 rounded-full shadow-md text-sm">
                      {course.price === "0" ? "Free" : `$${course.price}`}
                    </span>
                  </div>
                </div>
                
                {/* Course Details */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectColor(courseSubject)}`}>
                      {formatSubject(courseSubject)}
                    </span>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(courseLevel)}`}>
                      Level {courseLevel}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h2>
                  
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Instructor:</span> {course.instructor}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">Course ID: {course.id}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{course.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-lg font-bold">
                      {course.price === "0" ? "Free" : `$${course.price}`}
                    </span>
                    <button
                      onClick={() => handleAddToCart(course)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-1 transition"
                    >
                      +
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedSubject('all');
              setSelectedLevel('all');
              setDisplayedCourses(Courses);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Reset all filters
          </button>
        </div>
      )}
      
      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 py-4 border-t">
        <p>Browse Courses View implemented by Jeremiah Baccam</p>
      </footer>
    </div>
  );
};

export default Browse;