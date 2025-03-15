import React from 'react';
import './JobDetailsModal.css';
import { FaTimes } from 'react-icons/fa';

const formatDescription = (description) => {
  // Split the description into sentences
  const sentences = description.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  
  // Group sentences into categories
  const categories = {
    responsibilities: [],
    requirements: [],
    benefits: [],
    other: []
  };

  sentences.forEach(sentence => {
    const lower = sentence.toLowerCase().trim();
    if (lower.includes('responsible') || lower.includes('duties') || lower.includes('will be') || lower.includes('role')) {
      categories.responsibilities.push(sentence.trim());
    } else if (lower.includes('require') || lower.includes('qualification') || lower.includes('experience') || lower.includes('skill')) {
      categories.requirements.push(sentence.trim());
    } else if (lower.includes('benefit') || lower.includes('offer') || lower.includes('perks') || lower.includes('compensation')) {
      categories.benefits.push(sentence.trim());
    } else {
      categories.other.push(sentence.trim());
    }
  });

  return categories;
};

const JobDetailsModal = ({ job, onClose }) => {
  const descriptionCategories = formatDescription(job.snippet);

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
          {descriptionCategories.responsibilities.length > 0 && (
            <section className="description-section">
              <h4>Key Responsibilities</h4>
              <ul className="description-list">
                {descriptionCategories.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {descriptionCategories.requirements.length > 0 && (
            <section className="description-section">
              <h4>Requirements & Qualifications</h4>
              <ul className="description-list">
                {descriptionCategories.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {descriptionCategories.benefits.length > 0 && (
            <section className="description-section">
              <h4>Benefits & Perks</h4>
              <ul className="description-list">
                {descriptionCategories.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {descriptionCategories.other.length > 0 && (
            <section className="description-section">
              <h4>Additional Information</h4>
              <ul className="description-list">
                {descriptionCategories.other.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

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