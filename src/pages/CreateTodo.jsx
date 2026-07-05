import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../context/TodoContext';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import '../styles/CreateTodo.scss';

const CreateTodo = () => {
  const { addTodo } = useContext(TodoContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'new'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    addTodo(formData);
    navigate('/todos'); // Redirect to list after creation
  };

  return (
    <div className="create-todo-page animate-fade-in">
      <div className="page-header">
        <h1>Create New Task</h1>
      </div>

      <div className="glass-panel form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              className="input-field"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Design landing page"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              className="input-field"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add more details about this task..."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Initial Status</label>
            <select
              id="status"
              name="status"
              className="input-field"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="new">New</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn" onClick={() => navigate(-1)} style={{background: 'var(--surface)'}}>
              <ArrowLeft size={18} />
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              <PlusCircle size={18} />
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;
