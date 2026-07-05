import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/Auth.scss';

const ForgotPassword = () => {
  const { validateEmailForReset } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successLink, setSuccessLink] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const user = validateEmailForReset(email);
      // Simulation: Instead of sending an email, we show the link on screen.
      // We pass the userId in state or url to know who is resetting.
      setSuccessLink(`/reset-password?userId=${user.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="glass-panel auth-card">
        <h1>Forgot Password</h1>
        <p>Enter your email to receive a reset link</p>
        
        {error && <div className="error-message">{error}</div>}
        
        {!successLink ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className="input-field" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn--primary">
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="success-message" style={{textAlign: 'center', padding: '2rem 1rem'}}>
            <p style={{color: 'inherit', marginBottom: '1rem', fontWeight: 500}}>
              Simulation: In a real app, an email would be sent. Click below to proceed:
            </p>
            <Link to={successLink} className="btn btn--primary">
              Password Reset Link
            </Link>
          </div>
        )}
        
        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
