import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInSignUp from './components/Login';
import JobList from './components/Jobs';
import LandingPage from './components/Landing';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Login route */}
        <Route path="/login" element={<SignInSignUp setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Protected dashboard route */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <JobList /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
