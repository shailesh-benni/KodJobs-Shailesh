import React, { useState, useEffect } from 'react';
import './Jobs.css';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import JobDetailsModal from './JobDetailsModal';
import logoImage from '../assets/log.svg';

const DEFAULT_COMPANY_LOGO = logoImage;

const skillKeywords = ["Angular", "TypeScript", "JavaScript", "HTML", "CSS", "React", "Node.js", "MongoDB", "PostgreSQL", "Python", "Docker", "Jenkins", "Selenium"];
const salaryOptions = ["3 LPA", "4 LPA", "5 LPA", "6 LPA", "7 LPA", "8 LPA", "10 LPA"];

const getRandomSkills = () => {
  const shuffled = [...skillKeywords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

const getRandomSalary = () => salaryOptions[Math.floor(Math.random() * salaryOptions.length)];

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://jsearch.p.rapidapi.com/search?query=software%20developer&num_pages=1', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'd22328eedbmshf5d7f0a7e9d04d1p15bae7jsn8113bee5437d',
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
          }
        });

        const data = await response.json();

        const transformedJobs = data.data.map(job => ({
          company: job.employer_name,
          company_logo: job.employer_logo || DEFAULT_COMPANY_LOGO,
          location: job.job_city + ', ' + job.job_country,
          title: job.job_title,
          salary: getRandomSalary(), // Assign random salary
          snippet: job.job_description,
          updated: new Date(job.job_posted_at_timestamp * 1000).toLocaleDateString(),
          expires: new Date(job.job_posted_at_timestamp * 1000).toLocaleDateString(),
          skills: getRandomSkills(), // Assign random skills
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
                    src={job.company_logo}
                    alt={job.company}
                    className="company-logo"
                  />
                  <div>
                    <h3 className="company-name">{job.company}</h3>
                    <p className="location">📍 {job.location}</p>
                  </div>
                </div>
                <div className="job-lpa">
                  {job.salary}
                </div>
              </div>

              <h2 className="job-title">{job.title}</h2>

              <div className="skills-container">
                {job.skills.map((skill, idx) => (
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
