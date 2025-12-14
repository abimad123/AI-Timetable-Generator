
#  AI Timetable Generator

![Status](https://img.shields.io/badge/Status-Completed-success)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-green)

An intelligent, full-stack web application that solves the complex problem of school scheduling. It uses a **Genetic Algorithm (Artificial Intelligence)** to automatically generate conflict-free timetables based on teacher availability, room capacity, and subject requirements.

<img width="1663" height="966" alt="image" src="https://github.com/user-attachments/assets/c944bb30-83b8-4570-8da4-5fdf1a39d2d6" />

##  Key Features

* ** Genetic Algorithm Engine:** Uses a heuristic search approach to solve Constraint Satisfaction Problems (CSP), ensuring no double-booking of teachers or rooms.
* ** Secure Authentication:** JWT-based login and registration system. Every user gets their own private database space.
* ** Smart Capacity Management:** Automatically assigns large classes to rooms with sufficient capacity.
* ** Teacher-Subject Binding:** Ensures specific subjects are always taught by their assigned professors.
* ** Modern UI/UX:** Built with React & Framer Motion for smooth animations, featuring a toggleable **Dark/Light Mode**.
* ** CSV Export:** Download generated schedules immediately for Excel/Google Sheets.

##  Tech Stack

**Frontend:**
* React.js (Vite)
* Framer Motion (Animations)
* CSS3 (Custom Responsive Design)
* Axios (API Communication)

**Backend:**
* Node.js & Express.js
* MongoDB (Database) & Mongoose
* JSON Web Token (JWT) for Auth
* Bcryptjs (Password Hashing)

---

##  How to Run Locally

Follow these steps to set up the project on your machine.

### Prerequisites
* [Node.js](https://nodejs.org/) (v14 or higher)
* [MongoDB](https://www.mongodb.com/try/download/community) (Installed and running locally)

🔮 Future Improvements[ ] Drag-and-drop manual adjustments for the schedule.[ ] PDF Export functionality.[ ] "Soft Constraints" (e.g., teachers prefer mornings).

🤝 ContributingContributions are welcome! Please fork the repository and create a pull request.

📄 LicenseThis project is open-source and available under the MIT License.


### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/timetable-generator.git](https://github.com/your-username/timetable-generator.git)
cd timetable-generator

2. Setup the Backend (Server)Bashcd server
npm install

# Start the backend server
node server.js
The server will run on http://localhost:50003. Setup the Frontend (Client)
Open a new terminal window:Bashcd client
npm install
# Start the React app
npm run dev
The app will run on http://localhost:5173

📂 Project StructureBashTimeTableProject/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Input, Auth)
│   │   ├── services/       # API & AI Logic (geneticEngine.js)
│   │   └── App.jsx         # Main Logic
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── models/             # MongoDB Schemas (Teacher, Room, User)
│   ├── server.js           # API Routes & Auth Logic
│   └── package.json
│
└── README.md
