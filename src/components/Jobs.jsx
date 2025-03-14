import React, { useState, useEffect } from 'react';
import './Jobs.css';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import JobDetailsModal from './JobDetailsModal';
import logoImage from '../assets/log.svg';  // Import the logo

const DEFAULT_COMPANY_LOGO = logoImage;  // Use the imported logo as default

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const APP_ID = '8131f03a';
        const API_KEY = '89c81d01cb8875cf39f61a137c36b608';
        const response = await fetch(
          `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=20&what=software%20developer`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const data = await response.json();
        const transformedJobs = data.results.map(job => ({
          company: job.company.display_name,
          company_logo: getCompanyLogo(job.company.display_name),
          location: job.location.display_name,
          title: job.title,
          salary: job.salary_min ? `${(job.salary_min/100000).toFixed(1)}-${(job.salary_max/100000).toFixed(1)}` : 'Not specified',
          snippet: job.description,
          updated: new Date(job.created).toLocaleDateString(),
          expires: new Date(job.created).toLocaleDateString()
        }));
        setJobs(transformedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getCompanyLogo = (companyName) => {
    const logoMap = {
      'Google': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      'Microsoft': 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
      'Amazon': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
    };
    
    return logoMap[companyName] || DEFAULT_COMPANY_LOGO;
  };

  return (
    <div className="job-listings-page">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">KodJobs</div>
          <ul className="nav-links">
            <li>Prepare</li>
            <li>Participate</li>
            <li>Opportunities</li>
          </ul>
        </div>
        
        <div className="nav-right">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search jobs here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
          
          <div className="nav-icons">
            <div className="notification-icon">
              <FaBell />
              <span className="notification-badge">7</span>
            </div>
            <div className="profile-icon">
              <FaUserCircle />
              <span className="profile-badge">2</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="jobs-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          jobs.map((job, index) => (
            <div key={index} className="job-card">
              <div className="job-header">
                <div className="company-info">
                  <img 
                    src={job.company_logo || 'default-company-logo.png'} 
                    alt={job.company} 
                    className="company-logo"
                  />
                  <div>
                    <h3 className="company-name">{job.company}</h3>
                    <p className="location">📍 {job.location}</p>
                  </div>
                </div>
                <div className="job-lpa">
                  {job.salary || 'Not specified'} LPA
                </div>
              </div>

              <h2 className="job-title">{job.title}</h2>

              <div className="skills-container">
                {job.snippet.split(' ').slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="job-footer">
                <div className="posting-info">
                  <span>Posted {job.updated}</span>
                  <span>Expires in {job.expires || 'N/A'}</span>
                </div>
                <button 
                  className="check-details-btn"
                  onClick={() => {
                    setSelectedJob(job);
                    setIsModalOpen(true);
                  }}
                >
                  Check Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {isModalOpen && selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedJob(null);
          }} 
        />
      )}
    </div>
  );
};

export default JobListings;