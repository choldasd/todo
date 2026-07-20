import React from 'react';
import { Clock, Calendar, Edit2, Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const ListItemTile = ({ item }) => {
  
  return (
    <NavLink to={`/${item.url}`} className="glass-panel todo-item animate-fade-in">
      
      <div className="todo-item__content">
        <h3>{item.title}</h3>
        {item.description && <p>{item.description}</p>}
      </div>
      <div className="todo-item__actions">
        <button className="btn btn--icon"  title="Edit">
            <Edit2 size={16} />
          </button>
      </div>
      
    </NavLink>
  );
};

export default ListItemTile;
