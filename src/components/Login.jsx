import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import logImage from "../assets/log.svg";
import register from "../assets/register.svg";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SignInSignUp = ({ setIsAuthenticated }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  const calculateAge = (dob) => {
    const [day, month, year] = dob.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      console.log('Login response:', response.data); // For debugging

      if (response.data.success && response.data.user) {
        // Store user data in localStorage
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));

        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        setTimeout(() => {
          setIsAuthenticated(true);
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Check credentials!', {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const dateOfBirth = e.target[2].value;
    const password = e.target[3].value;
    
    try {
      const age = calculateAge(dateOfBirth);
      
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        dateOfBirth,
        age,
        password,
      });

      if (response.data.success) {
        toast.success('Registration successful!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Clear form and switch to login mode after successful registration
        setTimeout(() => {
          setIsSignUpMode(false);
        }, 1000);
      }
    } catch (error) {
      toast.error('Registration failed. Try again!', {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <ToastContainer />
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSignIn} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" required />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" required />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>

          <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" required />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-field">
              <i className="fas fa-calendar"></i>
              <input
                placeholder="DOB dd-mm-yyyy"
                required 
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" required />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(true)}>
              Sign up
            </button>
          </div>
          <img src={logImage} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(false)}>
              Sign in
            </button>
          </div>
          <img src={register} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
