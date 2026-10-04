import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Schedule from "./pages/Schedule"
import AddTask from "./pages/AddTask"
import Progress from "./pages/Progress"

import "./App.css"

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="app-container">

        <aside className="sidebar">
          <div className="logo">
            📚 <span>StudyPlanner</span>
          </div>

          <nav className="navigation">
            <Link to="/">🏠 Dashboard</Link>
            <Link to="/schedule">📅 Study Schedule</Link>
            <Link to="/add-task">➕ Add Task</Link>
            <Link to="/progress">📊 Progress</Link>
          </nav>

          <div className="sidebar-bottom">
            <p>Study smart.</p>
            <p>Stay consistent. 🚀</p>
          </div>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <div>
              <h1>Smart Study Planner</h1>
              <p>Organize your learning and track your progress.</p>
            </div>

            <div className="profile">
              👤 Student
            </div>
          </header>

          <section className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/progress" element={<Progress />} />
            </Routes>
          </section>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App