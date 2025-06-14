import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useUsers } from './contexts/UserContext';

// Layouts
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import CompanyLayout from './layouts/CompanyLayout';
import ImpersonationLayout from './layouts/ImpersonationLayout';

// General Pages
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import CreateResumePage from './pages/student/CreateResumePage';
import GenerateResumePage from './pages/student/GenerateResumePage';
import MyApplicationsPage from './pages/student/MyApplicationsPage';
import JobsListPage from './pages/student/JobsListPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCompaniesPage from './pages/admin/ManageCompaniesPage';
import ManageJobsPage from './pages/admin/ManageJobsPage'; 

// Company Pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import PostJobPage from './pages/company/PostJobPage';
import Applicants from './pages/company/Applicants'; // <-- CHANGED THIS LINE

const AppContent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ isLoggedIn: false, role: null });
  const { loginUser, logoutUser } = useUsers();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    if (token && role && username) {
      setUser({ isLoggedIn: true, role: role });
      loginUser(username, role);
    }
    // eslint-disable-next-line
  }, []); 

  const handleLogin = (role, username) => {
    localStorage.setItem('authToken', 'dummy-token');
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
    setUser({ isLoggedIn: true, role: role });
    loginUser(username, role);

    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'company') navigate('/company/dashboard');
    else navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser({ isLoggedIn: false, role: null });
    logoutUser();
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/generate-resume/:studentId" element={<GenerateResumePage />} />

      {user.isLoggedIn && user.role === 'student' && (
        <Route path="/" element={<StudentLayout onLogout={handleLogout} />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="jobs" element={<JobsListPage />} />
          <Route path="my-applications" element={<MyApplicationsPage />} />
          <Route path="create-resume" element={<CreateResumePage />} />
        </Route>
      )}

      {user.isLoggedIn && user.role === 'company' && (
        <Route path="/company" element={<CompanyLayout onLogout={handleLogout} />}>
          <Route index element={<Navigate to="/company/dashboard" />} />
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="post-job" element={<PostJobPage />} />
          <Route path="jobs/:jobId/applicants" element={<Applicants />} /> {/* <-- CHANGED THIS LINE */}
        </Route>
      )}

      {user.isLoggedIn && user.role === 'admin' && (
        <>
          <Route path="/admin" element={<AdminLayout onLogout={handleLogout} />}>
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<ManageUsers />} />
            <Route path="companies" element={<ManageCompaniesPage />} />
            <Route path="jobs" element={<ManageJobsPage />} />
          </Route>
          <Route path="/admin/view-as/:studentId" element={<ImpersonationLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="my-applications" element={<MyApplicationsPage />} />
          </Route>
          <Route path="/admin/view-as-company/:companyId" element={<CompanyLayout onLogout={() => {}} />}>
              <Route path="dashboard" element={<CompanyDashboard />} />
              <Route path="jobs/:jobId/applicants" element={<Applicants isAdminView={true} />} /> {/* <-- CHANGED THIS LINE */}
          </Route>
        </>
      )}

      <Route
        path="*"
        element={<Navigate to={user.isLoggedIn ? (user.role === 'admin' ? '/admin' : user.role === 'company' ? '/company' : '/') : '/login'} />}
      />
    </Routes>
  );
};

export default AppContent;