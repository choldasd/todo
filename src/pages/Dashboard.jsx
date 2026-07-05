import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../context/TodoContext';
import { ListTodo, CheckCircle2, Clock, Plus } from 'lucide-react';
import TodoItem from '../components/TodoItem';
import '../styles/Dashboard.scss';
import '../styles/TodoItem.scss';

const Dashboard = () => {
  const { todos, loading } = useContext(TodoContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'completed'

  if (loading) {
    return <div className="animate-fade-in" style={{textAlign: 'center', marginTop: '2rem'}}>Loading Data...</div>;
  }

  const total = todos.length;
  const completed = todos.filter(t => t.status === 'completed').length;
  const isNew = todos.filter(t => t.status === 'new').length;

  const latestTodos = todos
    .filter(t => t.status === activeTab)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  return (
    <div className="dashboard animate-fade-in">
      <div className="dashboard__header page-header">
        <h1>Dashboard Overview</h1>
        <button className="btn btn--primary" onClick={() => navigate('/create')}>
          <Plus size={20} />
          Create Todo
        </button>
      </div>

      <div className="dashboard__stats">
        <div className="glass-panel dashboard__stat-card">
          <div className="icon-wrapper total">
            <ListTodo size={28} />
          </div>
          <div className="stat-info">
            <h3>Total Tasks</h3>
            <p>{total}</p>
          </div>
        </div>
        <div className="glass-panel dashboard__stat-card">
          <div className="icon-wrapper new">
            <Clock size={28} />
          </div>
          <div className="stat-info">
            <h3>New / Pending</h3>
            <p>{isNew}</p>
          </div>
        </div>
        <div className="glass-panel dashboard__stat-card">
          <div className="icon-wrapper completed">
            <CheckCircle2 size={28} />
          </div>
          <div className="stat-info">
            <h3>Completed Tasks</h3>
            <p>{completed}</p>
          </div>
        </div>
      </div>

      <div className="dashboard__recent-section">
        <div className="dashboard__tabs">
          <button 
            className={activeTab === 'new' ? 'active' : ''} 
            onClick={() => setActiveTab('new')}
          >
            Latest Pending (Top 10)
          </button>
          <button 
            className={activeTab === 'completed' ? 'active' : ''} 
            onClick={() => setActiveTab('completed')}
          >
            Latest Completed (Top 10)
          </button>
        </div>

        <div className="dashboard__list">
          {latestTodos.length > 0 ? (
            latestTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          ) : (
            <div className="glass-panel" style={{padding: '2rem', textAlign: 'center', color: 'var(--text-muted)'}}>
              No tasks found for this status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
