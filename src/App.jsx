import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInSignUp from './components/Login';
import JobList from './components/Jobs';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Default route for login */}
        <Route path="/" element={<SignInSignUp setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Protected dashboard route */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <JobList /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
