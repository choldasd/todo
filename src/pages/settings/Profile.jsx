import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { User, Save } from 'lucide-react';
import '../../styles/Auth.scss'; // Reuse auth styles for forms

const Profile = () => {
  const { currentUser, updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({ name: currentUser.name, email: currentUser.email });
    }
  }, [currentUser]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{maxWidth: '600px', margin: '0 auto'}}>
      <div className="page-header">
        <h1>My Profile</h1>
      </div>
      <div className="glass-panel" style={{padding: '2rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem'}}>
          <div className="icon-wrapper" style={{background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '50%'}}>
            <User size={32} />
          </div>
          <div>
            <h2 style={{fontSize: '1.25rem'}}>{currentUser?.name}</h2>
            <p style={{color: 'var(--text-secondary)'}}>{currentUser?.role} Account</p>
          </div>
        </div>

        {success && <div className="success-message">Profile updated successfully!</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{marginBottom: '1.25rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem'}}>Full Name</label>
            <input 
              type="text" 
              name="name"
              className="input-field" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group" style={{marginBottom: '1.25rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem'}}>Email Address</label>
            <input 
              type="email" 
              name="email"
              className="input-field" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn--primary" style={{marginTop: '1rem'}}>
            <Save size={18} /> Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
