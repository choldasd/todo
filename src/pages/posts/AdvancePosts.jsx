import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { 
  useGetAdvancePostsWithPaginationQuery, 
  useAddPostMutation, 
  useUpdatePostMutation, 
  useDeletePostMutation 
} from '../../services/jsonPlaceholderApi';
import { Edit, Trash2, Plus, Search, SlidersHorizontal, AlertCircle } from 'lucide-react';
import './AdvancePosts.css';

const AdvancePosts = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  
  // Real-time API states (applied when search button clicked)
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('asc');

  // Local form inputs (before applying)
  const [searchInput, setSearchInput] = useState('');
  const [localSort, setLocalSort] = useState('');
  const [localOrder, setLocalOrder] = useState('asc');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', body: '' });

  const { data, isLoading, isFetching, error } = useGetAdvancePostsWithPaginationQuery({
    page,
    limit,
    search,
    sort,
    order
  });

  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / limit) : 0;

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyFilters = () => {
    setSearch(searchInput);
    setSort(localSort);
    setOrder(localOrder);
    setPage(1);
  };

  const openModal = (post = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({ title: post.title, body: post.body });
    } else {
      setEditingPost(null);
      setFormData({ title: '', body: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
    setFormData({ title: '', body: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPost) {
      await updatePost({ id: editingPost.id, ...formData, userId: 1 });
    } else {
      await addPost({ ...formData, userId: 1 });
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
    }
  };

  return (
    <div className="dark-theme advance-posts-wrapper">
      <div className="layout-stacked">
        {/* TOP PANEL: Search and Sort */}
        <aside className="control-panel dark-panel">
          <div className="panel-header">
            <SlidersHorizontal size={20} className="text-accent" />
            <h2>Filters & Controls</h2>
          </div>
          
          <div className="horizontal-filters">
            <div className="control-group">
              <label>Search Posts</label>
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Type to search..." 
                  value={searchInput} 
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                />
              </div>
            </div>

            <div className="control-group">
              <label>Sort By</label>
              <div className="select-wrapper">
                <select value={localSort} onChange={(e) => setLocalSort(e.target.value)}>
                  <option value="">Default (None)</option>
                  <option value="title">Title</option>
                  <option value="id">ID</option>
                  <option value="views">Views</option>
                </select>
              </div>
            </div>

            <div className="control-group">
              <label>Order</label>
              <div className="select-wrapper">
                <select value={localOrder} onChange={(e) => setLocalOrder(e.target.value)} disabled={!localSort}>
                  <option value="asc">Ascending (A-Z)</option>
                  <option value="desc">Descending (Z-A)</option>
                </select>
              </div>
            </div>

            <div className="panel-actions">
              <button className="btn btn-primary" onClick={handleApplyFilters}>
                <Search size={18} /> Apply Filters
              </button>
            </div>
          </div>
        </aside>

        {/* BOTTOM PANEL: Post List */}
        <main className="content-panel dark-panel">
          <div className="panel-header list-header">
            <div className="list-title-group">
              <h2>Post List</h2>
              {isFetching && <span className="updating-badge">Updating...</span>}
            </div>
            <button className="btn btn-primary" onClick={() => openModal()}>
              <Plus size={18} /> Create New Post
            </button>
          </div>

          <div className="post-list-container">
            {isLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading posts...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <AlertCircle size={40} className="error-icon" />
                <p>Failed to load posts. Please try again.</p>
              </div>
            ) : data?.data?.length > 0 ? (
              <div className={`post-grid ${isFetching ? 'is-fetching' : ''}`}>
                {data.data.map(post => (
                  <div key={post.id} className="post-card">
                    <div className="post-card-header">
                      <span className="post-id">#{post.id}</span>
                      <div className="post-actions">
                        <button className="btn-icon btn-edit" onClick={() => openModal(post)} title="Edit">
                          <Edit size={16} />
                        </button>
                        <button className="btn-icon btn-delete" onClick={() => handleDelete(post.id)} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-body">{post.body}</p>
                    <div className="post-footer">
                      {post.tags && (
                        <div className="post-tags">
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data-state">
                <Search size={40} className="text-muted" />
                <p>No posts found matching your criteria</p>
                <button className="btn btn-secondary mt-3" onClick={() => { 
                  setSearchInput(''); setLocalSort(''); setLocalOrder('asc');
                  setSearch(''); setSort(''); setOrder('asc'); setPage(1);
                }}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {!isLoading && totalPages > 0 && (() => {
            const PaginateComponent = ReactPaginate.default || ReactPaginate;
            return (
              <div className="pagination-container">
                <PaginateComponent
                  breakLabel="..."
                  nextLabel="Next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  pageCount={totalPages}
                  previousLabel="< Previous"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination dark-pagination"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  activeClassName="active"
                  forcePage={page - 1}
                />
              </div>
            );
          })()}
        </main>
      </div>

      {isModalOpen && (
        <div className="modal-overlay dark-overlay">
          <div className="modal-content dark-modal">
            <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
            <form onSubmit={handleSubmit} className="post-form">
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  required
                  placeholder="Enter a descriptive title..."
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea 
                  value={formData.body} 
                  onChange={(e) => setFormData({...formData, body: e.target.value})} 
                  required
                  rows="6"
                  placeholder="What's on your mind?"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingPost ? 'Save Changes' : 'Publish Post'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancePosts;
