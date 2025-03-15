import React, { useState, useEffect } from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import jobSearchImage from '../assets/register.svg'; // Add your image to assets folder

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['JOB', 'CAREER', 'OPPORTUNITY', 'PLACEMENT', 'PROFESSION'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="left-section">
          <div className="title-container">
            <h1>Find Your Dream</h1>
            <div className="typewriter-wrapper">
              <span className="typewriter-text">
                {words.map((word, index) => (
                  <span
                    key={word}
                    className={`word ${currentWord === index ? 'visible' : ''}`}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </div>
          </div>
          <h2>Start Your Journey Today With <span className="highlight-job">KodJobs</span></h2>
          <p>
            Discover thousands of job opportunities with all the information you need. 
            Its your future. Come find it.
          </p>
          <button 
            className="start-button"
            onClick={() => navigate('/login')}
          >
            Start Journey
          </button>
        </div>
        <div className="right-section">
          <img src={jobSearchImage} alt="Job Search" />
        </div>
      </div>
      <div className="footer-text">
        Developed by <a href="https://shaileshbenni.vercel.app/" target="_blank" rel="noopener noreferrer">Shailesh</a>
      </div>
    </div>
  );
};

export default LandingPage; 