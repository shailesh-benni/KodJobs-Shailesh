import React from 'react';
import './JobDetailsModal.css';
import { FaTimes } from 'react-icons/fa';

const JobDetailsModal = ({ job, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="modal-header">
          <div className="company-info">
            <img 
              src={job.company_logo || 'default-company-logo.png'} 
              alt={job.company} 
              className="company-logo"
            />
            <div>
              <h2 className="job-title">{job.title}</h2>
              <h3 className="company-name">{job.company}</h3>
              <p className="location">📍 {job.location}</p>
            </div>
          </div>
          <div className="salary-info">
            {job.salary} LPA
          </div>
        </div>

        <div className="modal-body">
          <section className="job-description">
            <h4>Job Description</h4>
            <p>{job.snippet}</p>
          </section>

          <section className="job-details">
            <h4>Job Details</h4>
            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Posted Date:</span>
                <span>{job.updated}</span>
              </div>
              <div className="detail-item">
                <span className="label">Expires:</span>
                <span>{job.expires}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <button className="apply-button">Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal; 