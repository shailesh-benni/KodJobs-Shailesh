import React, { useEffect } from 'react';
import './ProfileSidebar.css';
import { FaTimes, FaMoneyBillWave, FaUserTie, FaClock, FaBriefcase } from 'react-icons/fa';
import avatarImage from '../assets/avatar.jpg';

const ProfileSidebar = ({ isOpen, onClose }) => {
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
        <h2 className="profile-name">Alvin Elian</h2>
        <p className="profile-title">UI/UX Designer</p>
        <div className="availability-badge">
          <span>●</span>
          Available for work
        </div>
      </div>

      <div className="scrollable-content" onScroll={handleScroll}>
        <div className="details-section">
          <h3 className="details-heading">Personal Details</h3>
          
          <div className="detail-item">
            <FaMoneyBillWave className="detail-icon" />
            <div>
              <strong>Salary Expectations</strong>
              <div>$100/Hours</div>
            </div>
          </div>

          <div className="detail-item">
            <FaUserTie className="detail-icon" />
            <div>
              <strong>Seniority Level</strong>
              <div>Senior Level</div>
            </div>
          </div>

          <div className="detail-item">
            <FaClock className="detail-icon" />
            <div>
              <strong>Work Experience</strong>
              <div>2 Years Experience</div>
            </div>
          </div>

          <div className="detail-item">
            <FaBriefcase className="detail-icon" />
            <div>
              <strong>Employment Type</strong>
              <div>Full Time, Part Time</div>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h3 className="details-heading">Skills</h3>
          <div className="skills-container">
            <span className="skill-tag">UI Designer</span>
            <span className="skill-tag">UX Designer</span>
            <span className="skill-tag">Figma</span>
            <span className="skill-tag">Product Designer</span>
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