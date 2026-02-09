import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard'; // Import this!

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <nav style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
          <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
          <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Use the component here */}
          <Route path="/" element={<h2>Welcome to User Auth System</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;