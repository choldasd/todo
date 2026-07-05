import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Lock, Save } from 'lucide-react';

const ChangePassword = () => {
  const { changePassword } = useContext(AuthContext);
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      return setError('New passwords do not match');
    }

    try {
      changePassword(formData.currentPassword, formData.newPassword);
      setSuccess(true);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="animate-fade-in" style={{maxWidth: '600px', margin: '0 auto'}}>
      <div className="page-header">
        <h1>Change Password</h1>
      </div>
      <div className="glass-panel" style={{padding: '2rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem'}}>
          <div className="icon-wrapper" style={{background: 'var(--status-danger-bg)', color: 'var(--status-danger)', padding: '1rem', borderRadius: '50%'}}>
            <Lock size={32} />
          </div>
          <div>
            <h2 style={{fontSize: '1.25rem'}}>Security</h2>
            <p style={{color: 'var(--text-secondary)'}}>Ensure your account is using a long, random password</p>
          </div>
        </div>

        {error && <div className="error-message" style={{
          background: 'var(--status-danger-bg)', color: 'var(--status-danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(239,68,68,0.2)'
        }}>{error}</div>}
        
        {success && <div className="success-message" style={{
          background: 'var(--status-completed-bg)', color: 'var(--status-completed)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(16,185,129,0.2)'
        }}>Password changed successfully!</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{marginBottom: '1.25rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem'}}>Current Password</label>
            <input 
              type="password" 
              name="currentPassword"
              className="input-field" 
              value={formData.currentPassword} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group" style={{marginBottom: '1.25rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem'}}>New Password</label>
            <input 
              type="password" 
              name="newPassword"
              className="input-field" 
              value={formData.newPassword} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group" style={{marginBottom: '1.25rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem'}}>Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              className="input-field" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn--primary" style={{marginTop: '1rem'}}>
            <Save size={18} /> Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
