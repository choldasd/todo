import React from 'react';
import { Clock, Calendar, Edit2, Trash2 } from 'lucide-react';

const TodoItem = ({ todo, onEdit, onDelete }) => {
  const date = new Date(todo.createdAt);
  
  return (
    <div className="glass-panel todo-item animate-fade-in">
      <div className="todo-item__content">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
        <div className="todo-item__meta">
          <span className={`badge badge--${todo.status}`}>
            {todo.status}
          </span>
          <span>
            <Calendar size={14} />
            {date.toLocaleDateString()}
          </span>
          <span>
            <Clock size={14} />
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      <div className="todo-item__actions">
        {onEdit && (
          <button className="btn btn--icon" onClick={() => onEdit(todo)} title="Edit">
            <Edit2 size={16} />
          </button>
        )}
        {onDelete && (
          <button className="btn btn--icon btn--danger" onClick={() => onDelete(todo.id)} title="Delete">
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
