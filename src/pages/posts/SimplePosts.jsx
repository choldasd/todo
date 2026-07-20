import React from 'react';
import { useGetSimplePostsQuery } from '../../services/jsonPlaceholderApi';
import { FileText, Loader, AlertCircle } from 'lucide-react';

const SimplePosts = () => {
  const { data: posts, error, isLoading } = useGetSimplePostsQuery();

  if (isLoading) {
    return (
      <div className="posts-page animate-fade-in" style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
        <Loader className="animate-spin" size={32} style={{ color: 'var(--primary)' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-page animate-fade-in" style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem', color: 'var(--danger)' }}>
        <AlertCircle size={32} />
        <p>Error loading posts.</p>
      </div>
    );
  }

  return (
    <div className="posts-page animate-fade-in">
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1>Simple Posts</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Fetched using RTK Query</p>
      </div>

      <div className="posts-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
      }}>
        {posts?.map((post) => (
          <div key={post.id} className="glass-panel" style={{ 
            padding: '1.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div className="post-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div className="icon-wrapper" style={{ 
                background: 'rgba(99, 102, 241, 0.1)', 
                color: 'var(--primary)', 
                padding: '0.75rem', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <FileText size={24} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', lineHeight: '1.4', fontWeight: 600, color: 'var(--text-primary)' }}>
                {post.title}
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0, flex: 1 }}>
              {post.body}
            </p>
            <div className="post-footer" style={{ 
              marginTop: 'auto', 
              paddingTop: '1rem', 
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Post ID: {post.id}</span>
              <span>User ID: {post.userId}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimplePosts;
