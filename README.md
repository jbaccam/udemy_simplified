# Assignment 3 Project Repository – SE/COM S 3190

Welcome to the Assignment 3 Repository for SE/COM S 3190 - Construction of User Interfaces (Spring 2025). This repository contains all the necessary files and resources for completing Assignment 3 - Online Learning Platform Web Application.

## 📚 Project Overview

The Online Learning Platform is a single-page React web application styled with Tailwind CSS. This platform allows users to browse courses, add them to their cart, proceed to payment, and view a summary of their order. It is designed to simulate an e-learning experience inspired by platforms like Coursera and Udemy.

### Important Notes:

- Only **React** and **Tailwind CSS** must be used.
- The app must be a fully functional **single-page application**.
- All features must support **state management** and proper **view navigation**.
- Minimum four views: **Browse Courses**, **My Cart**, **Payment Gateway**, and **Order Summary**.

## 📚 Design Requirements

### 1️⃣ Browse Courses View

✔️ Displays all courses with:
- Title
- Instructor
- Description
- Price
- Add to Cart button

✔️ Tailwind CSS for grid/flex layout and responsive UI

### 2️⃣ My Cart View

✔️ Shows all added courses with:
- Title
- Instructor
- Price
- Remove option

✔️ Calculates total price (including tax/fees if any)  
✔️ "Proceed to Checkout" and "Return to Browse" buttons  
✔️ Styled clearly using Tailwind CSS

### 3️⃣ Payment Gateway View

✔️ Shows:
- Cart summary (courses, quantity, total cost)
- User info form: Name, Email, Shipping Address
- Payment info form: Card Number, Expiry, CVC

✔️ Validates all fields before allowing submission  
✔️ "Submit Payment" button simulates payment and routes to Order Summary  
✔️ Uses Tailwind CSS form and layout utilities  

### 4️⃣ Order Summary View

✔️ Displays:
- All purchased courses
- User info
- Total cost
- Payment confirmation message and optional transaction ID

✔️ "Return to Browse Courses" button resets cart and app state  
✔️ Responsive and clean Tailwind-styled layout  

### 🌟 Extra Credit (5 points)

✔️ Real-time (`onChange`) search filter on course titles  
✔️ No button or enter press required  
✔️ Must be demonstrated clearly in the video walkthrough  

## 📂 Folder Structure

```
📂 Project Root  
│── 📂 src  
│   ├── 📂 components  
│   |   ├── Browse.jsx
│   |   ├── Cart.jsx
│   |   ├── Payment.jsx
│   |   ├── Summary.jsx
│   ├── 📂 assets  
│   ├── 📂 data
│   |   ├── Courses.js
│── App.jsx
│── main.jsx
│── index.css 
│
│── 📂 Documents  
│   ├── video.mp4 (Teams record the video and push it into this folder in the Repo)
│
│── 📄 README.md  
```

- Components go in `/src/components/`
- Any images or reusable assets in `/src/assets/`
- Course JSON data in `/src/data/`
- Video in `/Documents/`

## 👥 Task Division

### 👤 Member 1: (Must clearly mention in the footer, about who implemented the view)
- Browse Courses View
- Order Summary View

### 👤 Member 2: (Must clearly mention in the footer, about who implemented the view)
- My Cart View
- Payment Gateway View

### 🤝 Collaborative Tasks:
- Tailwind styling consistency  
- Shared state management  
- Final 3-minute demo video (both members speak)

## 🧪 Submission Guidelines

✔️ Push changes frequently to GitLab  
✔️ Each team member must make **2+ meaningful commits**:
- 1 feature commit (e.g., functional view)
- 1 bug fix, improvement, or styling

✔️ Use clear commit messages  
✔️ Final GitLab link must be submitted on Canvas  

## 🗓 Final Submission Instructions

📌 Submit GitLab repo link on Canvas  
🕒 Final Deadline: April 15, 2025, at 11:59 PM CST  
⚠️ Late submissions allowed until April 18 with **–5 % per day penalty**  
🚫 No submissions accepted after April 18  

## 🎯 Grading Rubric

| **Item**             | **Description**                                                    | **Points** | **Max Points** |
|----------------------|--------------------------------------------------------------------|------------|----------------|
| Task Division         | Fair contribution & distribution of work                          | 20         | 20             |
| Browse Courses View   | Course listing, Add to Cart                                       | 20         | 20             |
| My Cart View          | Add/remove items, quantity edit, cost display                     | 20         | 20             |
| Payment Gateway       | Form submission, input validation, payment simulation             | 20         | 20             |
| Order Summary View    | Review purchased items, confirmation message, return button       | 15         | 15             |
| Tailwind Styling      | Responsive layout, consistent styles                              | 5          | 5              |
| Extra Credit          |                               | 5          | 0              |
|Total                      |                                                                    | **105**    | **100**        |


## 📄 Required Documents

🎥 `/Documents/video.mp4` (max 3 mins) must:
- Walk through app functionality  
- Be narrated by both team members  

## ❗ Important Policies

- Equal team participation is mandatory  
- Final grade reflects both team and individual efforts  
- Ask questions early – office hours and Piazza available  

## 🔗 Additional Resources

- **Canvas Assignment Page:** [Click Here](https://canvas.iastate.edu/courses/117136/assignments/syllabus)  
- **Office Hours & Piazza:** Check Canvas for updates  

🚀 Start early, divide your tasks, and build something you’re proud of!  
🎉 Happy Coding!
