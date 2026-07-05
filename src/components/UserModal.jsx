import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Save } from 'lucide-react';
import '../styles/TodoModal.scss'; // Reuse modal styles

const UserModal = ({ isOpen, onClose, onSave, user, mode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
    status: 'Active'
  });
  
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: user.password || '', // Optional to show/edit, but we'll include it for simplicity
        role: user.role || 'User',
        status: user.status || 'Active'
      });
    } else {
      setFormData({ name: '', email: '', password: '', role: 'User', status: 'Active' });
    }
    setError('');
  }, [user, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'view') {
      onClose();
      return;
    }
    
    if (!formData.name.trim() || !formData.email.trim() || (!user && !formData.password)) {
      return setError('Please fill in all required fields.');
    }
    
    try {
      if (mode === 'edit') {
        onSave(user.id, formData);
      } else {
        onSave(formData);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const isReadOnly = mode === 'view';

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-content__header">
          <h2>
            {mode === 'view' ? 'User Details' : mode === 'edit' ? 'Edit User' : 'Add New User'}
          </h2>
          <button onClick={onClose} type="button"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-content__body">
            {error && <div className="error-message" style={{
              background: 'var(--status-danger-bg)', color: 'var(--status-danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem'
            }}>{error}</div>}

            <div className="form-group">
              <label htmlFor="user-name">Full Name *</label>
              <input
                type="text"
                id="user-name"
                name="name"
                className="input-field"
                value={formData.name}
                onChange={handleChange}
                disabled={isReadOnly}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="user-email">Email Address *</label>
              <input
                type="email"
                id="user-email"
                name="email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                disabled={isReadOnly || mode === 'edit'} // Don't allow email changes easily, or allow it depending on rules
                required
              />
            </div>

            {(!isReadOnly || formData.password) && (
              <div className="form-group">
                <label htmlFor="user-password">Password {mode === 'create' ? '*' : '(Leave blank to keep current)'}</label>
                <input
                  type="password"
                  id="user-password"
                  name="password"
                  className="input-field"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  required={mode === 'create'}
                  placeholder={mode === 'edit' ? '••••••••' : ''}
                />
              </div>
            )}

            <div className="form-group" style={{display: 'flex', gap: '1rem'}}>
              <div style={{flex: 1}}>
                <label htmlFor="user-role">Role</label>
                <select
                  id="user-role"
                  name="role"
                  className="input-field"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={isReadOnly}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div style={{flex: 1}}>
                <label htmlFor="user-status">Status</label>
                <select
                  id="user-status"
                  name="status"
                  className="input-field"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={isReadOnly}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="modal-content__footer">
            <button type="button" className="btn" onClick={onClose} style={{background: 'var(--surface)'}}>
              {isReadOnly ? 'Close' : 'Cancel'}
            </button>
            {!isReadOnly && (
              <button type="submit" className="btn btn--primary">
                <Save size={18} />
                {mode === 'edit' ? 'Save Changes' : 'Create User'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default UserModal;
