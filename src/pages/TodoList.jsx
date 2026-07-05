import React, { useContext, useState, useMemo } from 'react';
import { TodoContext } from '../context/TodoContext';
import { Search, Plus } from 'lucide-react';
import TodoItem from '../components/TodoItem';
import TodoModal from '../components/TodoModal';
import '../styles/TodoList.scss';

const TodoList = () => {
  const { todos, loading, addTodo, updateTodo, deleteTodo } = useContext(TodoContext);
  
  // Local state for Search, Sort, Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('created_newest');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };
  
  const openCreateModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleModalSave = (idOrData, maybeData) => {
    if (editingTodo) {
      updateTodo(idOrData, maybeData);
    } else {
      addTodo(idOrData);
    }
  };

  const filteredAndSortedTodos = useMemo(() => {
    let result = [...todos];

    // 1. Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        t => t.title.toLowerCase().includes(q) || 
             (t.description && t.description.toLowerCase().includes(q))
      );
    }

    // 2. Filter
    if (filterStatus !== 'all') {
      result = result.filter(t => t.status === filterStatus);
    }

    // 3. Sort
    result.sort((a, b) => {
      if (sortBy === 'created_newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'created_oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

    return result;
  }, [todos, searchQuery, filterStatus, sortBy]);

  if (loading) {
    return <div className="animate-fade-in" style={{textAlign: 'center', marginTop: '2rem'}}>Loading Data...</div>;
  }

  return (
    <div className="todo-list-page animate-fade-in">
      <div className="page-header">
        <h1>All Tasks</h1>
        <button className="btn btn--primary" onClick={openCreateModal}>
          <Plus size={20} />
          Quick Create
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-wrapper">
          <Search size={18} />
          <input
            type="text"
            className="input-field"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select 
            className="input-field" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="completed">Completed</option>
          </select>

          <select 
            className="input-field"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="created_newest">Newest First</option>
            <option value="created_oldest">Oldest First</option>
            <option value="status">By Status</option>
          </select>
        </div>
      </div>

      <div className="todo-list">
        {filteredAndSortedTodos.length > 0 ? (
          filteredAndSortedTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onEdit={openEditModal}
              onDelete={deleteTodo}
            />
          ))
        ) : (
          <div className="glass-panel" style={{padding: '3rem', textAlign: 'center'}}>
            <p style={{color: 'var(--text-muted)'}}>No tasks match your filters.</p>
          </div>
        )}
      </div>

      <TodoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        todo={editingTodo}
      />
    </div>
  );
};

export default TodoList;
