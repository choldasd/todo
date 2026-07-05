import React, { useContext, useState, useMemo } from 'react';
import { UserContext } from '../context/UserContext';
import { Search, Plus, Eye, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import UserModal from '../components/UserModal';
import ConfirmModal from '../components/ConfirmModal';
import '../styles/Users.scss';

const Users = () => {
  const { users, addUser, updateUser, deleteUser } = useContext(UserContext);
  
  // Local state for Search, Sort, Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name_asc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal states
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const openUserModal = (mode, user = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleUserModalSave = (idOrData, maybeData) => {
    if (modalMode === 'edit') {
      updateUser(idOrData, maybeData);
    } else if (modalMode === 'create') {
      addUser(idOrData);
    }
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setIsConfirmOpen(true);
  };

  const handleDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
    }
    setIsConfirmOpen(false);
    setUserToDelete(null);
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // 1. Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }

    // 2. Filter
    if (filterRole !== 'all') {
      result = result.filter(u => u.role === filterRole);
    }
    if (filterStatus !== 'all') {
      result = result.filter(u => u.status === filterStatus);
    }

    // 3. Sort
    result.sort((a, b) => {
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
      if (sortBy === 'email_asc') return a.email.localeCompare(b.email);
      if (sortBy === 'created_newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'created_oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

    return result;
  }, [users, searchQuery, filterRole, filterStatus, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page if filters change
  useMemo(() => setCurrentPage(1), [searchQuery, filterRole, filterStatus, sortBy]);

  return (
    <div className="users-page animate-fade-in">
      <div className="page-header">
        <h1>User Management</h1>
        <button className="btn btn--primary" onClick={() => openUserModal('create')}>
          <Plus size={20} />
          Add User
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-wrapper">
          <Search size={18} />
          <input
            type="text"
            className="input-field"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select className="input-field" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          
          <select className="input-field" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select className="input-field" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
            <option value="email_asc">Email (A-Z)</option>
            <option value="created_newest">Newest First</option>
            <option value="created_oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="glass-panel table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="details">
                        <div className="name">{user.name}</div>
                        <div className="email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge`} style={{
                      background: user.role === 'Admin' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                      color: user.role === 'Admin' ? 'var(--primary)' : 'var(--text-secondary)'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge--${user.status === 'Active' ? 'completed' : 'danger'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="actions" style={{justifyContent: 'flex-end'}}>
                      <button className="btn btn--icon" onClick={() => openUserModal('view', user)} title="View">
                        <Eye size={16} />
                      </button>
                      <button className="btn btn--icon" onClick={() => openUserModal('edit', user)} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn btn--icon btn--danger" onClick={() => confirmDelete(user)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'}}>
                  No users found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {totalPages > 1 && (
          <div className="pagination">
            <span>Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedUsers.length)} of {filteredAndSortedUsers.length} entries</span>
            <div className="page-controls">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <UserModal 
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleUserModalSave}
        user={selectedUser}
        mode={modalMode}
      />

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Users;
