import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Save } from 'lucide-react';
import '../styles/TodoModal.scss';

const TodoModal = ({ isOpen, onClose, onSave, todo }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'new'
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        description: todo.description || '',
        status: todo.status || 'new'
      });
    } else {
      setFormData({ title: '', description: '', status: 'new' });
    }
  }, [todo, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    if (todo) {
      onSave(todo.id, formData);
    } else {
      onSave(formData);
    }
    onClose();
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-content__header">
          <h2>{todo ? 'Edit Task' : 'Create Task'}</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-content__body">
            <div className="form-group">
              <label htmlFor="modal-title">Task Title *</label>
              <input
                type="text"
                id="modal-title"
                name="title"
                className="input-field"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-description">Description</label>
              <textarea
                id="modal-description"
                name="description"
                className="input-field"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-status">Status</label>
              <select
                id="modal-status"
                name="status"
                className="input-field"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="new">New</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          
          <div className="modal-content__footer">
            <button type="button" className="btn" onClick={onClose} style={{background: 'var(--surface)'}}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default TodoModal;
