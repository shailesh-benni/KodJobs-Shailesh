import React, { useEffect } from 'react';
import './ProfileSidebar.css';
import { FaTimes, FaMoneyBillWave, FaUserTie, FaClock, FaBriefcase } from 'react-icons/fa';
import avatarImage from '../assets/avatar.jpg';

const ProfileSidebar = ({ isOpen, onClose, userData }) => {
  useEffect(() => {
    // Add/remove class to body when sidebar opens/closes
    if (isOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isOpen]);

  const handleScroll = (e) => {
    // Get the jobs container
    const jobsContainer = document.querySelector('.job-listings-page');
    if (jobsContainer) {
      jobsContainer.scrollTop = e.target.scrollTop;
    }
  };

  return (
    <div className={`profile-sidebar ${isOpen ? 'open' : ''}`}>
      <FaTimes 
        className="close-button" 
        onClick={onClose} 
        style={{ 
          position: 'absolute', 
          right: '15px', 
          top: '15px', 
          cursor: 'pointer',
          fontSize: '1.2rem',
          zIndex: 1
        }} 
      />
      
      <div className="profile-header">
        <img 
          src={avatarImage}
          alt="Profile" 
          className="profile-avatar"
        />
        <h2 className="profile-name">{userData?.username || 'User'}</h2>
        <p className="profile-title">{userData?.email || 'Email not available'}</p>
        <div className="availability-badge">
          <span>●</span>
          Available for work
        </div>
      </div>

      <div className="scrollable-content" onScroll={handleScroll}>
        <div className="details-section">
          <h3 className="details-heading">Personal Details</h3>
          
          <div className="detail-item">
            <FaUserTie className="detail-icon" />
            <strong>Email</strong>
            <div>{userData?.email || 'Not available'}</div>
          </div>

          <div className="detail-item">
            <FaClock className="detail-icon" />
            <strong>Age</strong>
            <div>{userData?.age || 'Not specified'} years old</div>
          </div>

          <div className="detail-item">
            <FaBriefcase className="detail-icon" />
            <strong>Date of Birth</strong>
            <div>{userData?.dateOfBirth || 'Not specified'}</div>
          </div>
        </div>

        <div className="details-section">
          <h3 className="details-heading">Skills</h3>
          <div className="skills-container">
            <span className="skill-tag">Java Developer</span>
            <span className="skill-tag">MERN Stack Developer</span>
            <span className="skill-tag">Front End Developer</span>
            <span className="skill-tag">UI UX Designer</span>
          </div>
        </div>
      </div>

      <div className="edit-profile-btn-container">
        <button className="edit-profile-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfileSidebar; 