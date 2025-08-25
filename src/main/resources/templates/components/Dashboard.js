import React from 'react';

const Dashboard = ({ role, onLogout }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the Student Course Management System.</p>
      <p>Your role: {role}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
