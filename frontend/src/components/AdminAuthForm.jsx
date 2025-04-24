import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AdminAuthForm.css';

const AdminAuthForm = () => {
  const [adminData, setAdminData] = useState({ username: '', email: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const [output, setOutput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const endpoint = isRegister ? 'register' : 'login';

    try {
      const res = await axios.post(`http://localhost:8000/api/auth/admin/${endpoint}`, adminData);

      if (!isRegister) {
        sessionStorage.setItem('adminToken', res.data.token);
        setOutput('Admin login successful');
        setTimeout(() => window.location.reload(), 500); // This triggers App.jsx to re-check sessionStorage

      } else {
        setOutput('Admin registered successfully. You can now login.');
        setIsRegister(false);
      }
    } catch (err) {
      setOutput(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <div className="admin-auth-container">
      <form onSubmit={handleSubmit} className="admin-auth-form">
        <h2>{isRegister ? 'Admin Register' : 'Admin Login'}</h2>

        {isRegister && (
          <input
            type="text"
            placeholder="Username"
            value={adminData.username}
            onChange={e => setAdminData({ ...adminData, username: e.target.value })}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={adminData.email}
          onChange={e => setAdminData({ ...adminData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={adminData.password}
          onChange={e => setAdminData({ ...adminData, password: e.target.value })}
          required
        />
        <button type="submit">{isRegister ? 'Register as Admin' : 'Login as Admin'}</button>

        <p onClick={() => setIsRegister(!isRegister)} className="admin-toggle-link">
          {isRegister ? 'Already have an account? Login' : 'No account? Register as Admin'}
        </p>

        {output && <p className="admin-output">{output}</p>}
      </form>
    </div>
  );
};

export default AdminAuthForm;
