import React, { createContext, useState, useContext } from 'react';

// --- MOCK DATA FOR THE ENTIRE APPLICATION ---

const initialUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    username: 'student', 
    password: 'studentpassword',
    email: 'john.doe@paruluniversity.ac.in',
    phone: '+91 12345 67890',
    summary: 'A highly motivated and detail-oriented Computer Science student skilled in React, Node.js, and cloud technologies. Seeking an entry-level software development position to apply my skills and contribute to innovative projects.',
    education: 'B.Tech in Computer Science, Parul University (2020-2024)',
    experience: 'Software Engineer Intern at TechCorp (Summer 2023)\n- Developed and maintained front-end components using React.\n- Collaborated with a team of 5 to fix bugs and improve application performance.',
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    username: 'jane.s', 
    password: 'password123', 
    email: 'jane.smith@paruluniversity.ac.in', 
    phone: '+91 98765 43210', 
    summary: 'Eager marketing student with a passion for digital campaigns and brand strategy. Proven ability to create engaging content for social media platforms.', 
    education: 'BBA in Marketing, Parul University (2021-2025)', 
    experience: 'Marketing Intern at Brandify (Winter 2023)\n- Managed social media accounts, increasing engagement by 15%.\n- Assisted in creating and executing a new product launch campaign.',
  },
];

const initialCompanies = [
  { 
    id: 101, 
    name: 'Tech Solutions Inc.', 
    username: 'company', 
    password: 'companypassword', 
    logoUrl: '/assets/tech-logo.png', 
    description: 'A leading provider of innovative tech solutions.' 
  },
  { 
    id: 102, 
    name: 'Global Finance', 
    username: 'finance', 
    password: 'financepassword', 
    logoUrl: '/assets/finance-logo.png', 
    description: 'Your trusted partner in financial services.' 
  },
];

const initialJobs = [
  { id: 201, companyId: 101, companyName: 'Tech Solutions Inc.', title: 'Frontend Developer', description: 'Looking for a skilled React developer to join our dynamic team. You will be responsible for developing and implementing user interface components using React.js concepts and workflows.', requiredSkills: 'React, JavaScript, CSS, HTML', status: 'Open', postedOn: '2024-05-20' },
  { id: 202, companyId: 101, companyName: 'Tech Solutions Inc.', title: 'Backend Developer', description: 'Seeking a Node.js developer to manage the interchange of data between the server and the users.', requiredSkills: 'Node.js, Express, MongoDB', status: 'Open', postedOn: '2024-05-18' },
  { id: 203, companyId: 102, companyName: 'Global Finance', title: 'Financial Analyst', description: 'Responsible for financial planning, analysis and projection for the company.', requiredSkills: 'Finance, Excel, Data Analysis', status: 'Closed', postedOn: '2024-04-15' },
];

const initialApplications = [
    { id: 301, jobId: 201, studentId: 1, status: 'Applied', appliedOn: '2024-05-21' },
    { id: 302, jobId: 201, studentId: 2, status: 'Shortlisted', appliedOn: '2024-05-22' },
];


const UserContext = createContext();

export const useUsers = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [companies, setCompanies] = useState(initialCompanies);
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState(initialApplications);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  // --- Authentication Logic ---
  const loginUser = (username, role) => {
    let userToLogin = null;
    if (role === 'student') {
        userToLogin = users.find(u => u.username === username);
    } else if (role === 'company') {
        userToLogin = companies.find(c => c.username === username);
    } else if (role === 'admin') {
        userToLogin = { name: 'Admin', role: 'admin' };
    }
    setAuthenticatedUser(userToLogin);
    console.log("Logged in as:", userToLogin);
  };

  const logoutUser = () => {
    setAuthenticatedUser(null);
    console.log("Logged out.");
  };

  // --- Job & Application Management Logic ---
  const addJob = (newJobData) => {
    const newJob = {
      ...newJobData,
      id: Math.max(...jobs.map(j => j.id), 0) + 1,
      postedOn: new Date().toISOString().split('T')[0],
      status: 'Open',
    };
    setJobs(currentJobs => [newJob, ...currentJobs]); // Add to the top of the list
  };

  const applyForJob = (jobId, studentId) => {
    // Prevent duplicate applications
    const existingApplication = applications.find(app => app.jobId === jobId && app.studentId === studentId);
    if (existingApplication) {
        alert("You have already applied for this job.");
        return;
    }

    const newApplication = {
        id: Math.max(...applications.map(a => a.id), 0) + 1,
        jobId,
        studentId,
        status: 'Applied',
        appliedOn: new Date().toISOString().split('T')[0],
    };
    setApplications(currentApps => [...currentApps, newApplication]);
    alert("Application submitted successfully!");
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications(currentApps => 
        currentApps.map(app => 
            app.id === applicationId ? { ...app, status: newStatus } : app
        )
    );
  };

  // The value object provides all data and functions to the rest of the app
  const value = {
    users,
    companies,
    jobs,
    applications,
    authenticatedUser,
    loginUser,
    logoutUser,
    addJob,
    applyForJob,
    updateApplicationStatus,
    // You can add more functions here later, like `addUser`, `deleteUser` etc.
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};