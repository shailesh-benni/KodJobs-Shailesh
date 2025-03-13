import React, { useState } from "react";
import "./Jobs.css";

const JobCard = ({ job, onApply }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <img src={job.logo} alt={job.company} />
        <button>{job.saved ? "Saved" : "Save"} 🔖</button>
      </div>
      <p className="job-company">{job.company} • {job.daysAgo} days ago</p>
      <h2 className="job-title">{job.title}</h2>
      <div className="job-tags">
        <span className="job-tag">{job.type}</span>
        {job.level && <span className="job-tag">{job.level}</span>}
      </div>
      <p className="job-salary">{job.salary}</p>
      <p className="job-location">{job.location}</p>
      <button className="apply-btn" onClick={() => onApply(job)}>Apply now</button>
    </div>
  );
};

const JobList = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      title: "Senior UI/UX Designer",
      type: "Part-time",
      level: "Senior level",
      salary: "$120/hr",
      location: "San Francisco, CA",
      daysAgo: 5,
      saved: false,
      description: "Looking for a creative Senior UI/UX Designer with experience in Figma and Adobe XD."
    },
    {
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      title: "Senior UI/UX Designer",
      type: "Part-time",
      level: "Senior level",
      salary: "$120/hr",
      location: "San Francisco, CA",
      daysAgo: 5,
      saved: false,
      description: "Looking for a creative Senior UI/UX Designer with experience in Figma and Adobe XD."
    },
    {
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      title: "Senior UI/UX Designer",
      type: "Part-time",
      level: "Senior level",
      salary: "$120/hr",
      location: "San Francisco, CA",
      daysAgo: 5,
      saved: false,
      description: "Looking for a creative Senior UI/UX Designer with experience in Figma and Adobe XD."
    },
    {
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      title: "Senior UI/UX Designer",
      type: "Part-time",
      level: "Senior level",
      salary: "$120/hr",
      location: "San Francisco, CA",
      daysAgo: 5,
      saved: false,
      description: "Looking for a creative Senior UI/UX Designer with experience in Figma and Adobe XD."
    },
    {
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      title: "Senior UI/UX Designer",
      type: "Part-time",
      level: "Senior level",
      salary: "$120/hr",
      location: "San Francisco, CA",
      daysAgo: 5,
      saved: false,
      description: "Looking for a creative Senior UI/UX Designer with experience in Figma and Adobe XD."
    },
    {
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      title: "Senior UI/UX Designer",
      type: "Part-time",
      level: "Senior level",
      salary: "$120/hr",
      location: "San Francisco, CA",
      daysAgo: 5,
      saved: false,
      description: "Looking for a creative Senior UI/UX Designer with experience in Figma and Adobe XD."
    },
    {
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      title: "Senior UI/UX Designer",
      type: "Part-time",
      level: "Senior level",
      salary: "$120/hr",
      location: "San Francisco, CA",
      daysAgo: 5,
      saved: false,
      description: "Looking for a creative Senior UI/UX Designer with experience in Figma and Adobe XD."
    },
    {
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      title: "Senior UI/UX Designer",
      type: "Part-time",
      level: "Senior level",
      salary: "$120/hr",
      location: "San Francisco, CA",
      daysAgo: 5,
      saved: false,
      description: "Looking for a creative Senior UI/UX Designer with experience in Figma and Adobe XD."
    },
    {
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      title: "Senior UI/UX Designer",
      type: "Part-time",
      level: "Senior level",
      salary: "$120/hr",
      location: "San Francisco, CA",
      daysAgo: 5,
      saved: false,
      description: "Looking for a creative Senior UI/UX Designer with experience in Figma and Adobe XD."
    },
    {
      company: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      title: "Graphic Designer",
      type: "Full-time",
      level: "Flexible schedule",
      salary: "$150 - 220k",
      location: "Mountain View, CA",
      daysAgo: 30,
      saved: true,
      description: "Graphic Designer needed for brand identity and marketing campaigns."
    },
    {
      company: "Dribbble",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/Dribbble_logo.png",
      title: "Senior Motion Designer",
      type: "Contract",
      level: "Remote",
      salary: "$85/hr",
      location: "San Francisco, CA",
      daysAgo: 18,
      saved: false,
      description: "Seeking an experienced motion designer to create animations for digital ads."
    },
  ];

  return (
    <div className="job-list">
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} onApply={setSelectedJob} />
      ))}

      {/* Modal Popup */}
      {selectedJob && (
        <div className="job-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedJob(null)}>❌</button>
            <h2>{selectedJob.title}</h2>
            <p><strong>Company:</strong> {selectedJob.company}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Salary:</strong> {selectedJob.salary}</p>
            <p><strong>Type:</strong> {selectedJob.type} | {selectedJob.level}</p>
            <p><strong>Description:</strong> {selectedJob.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
