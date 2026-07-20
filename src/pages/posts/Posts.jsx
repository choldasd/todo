import React, { useContext, useState, useMemo } from 'react';

import ListItemTile from '../../components/ListItemTile';
import '../../styles/TodoList.scss';

const Posts = () => {

  return (
    <div className="todo-list-page animate-fade-in">
      <div className="page-header">
        <h1>All Posts</h1>
      </div>

      <div className="todo-list">
          <ListItemTile item={{url:'simple-posts', title:'Simple Post List using DummyJSON.', description:'Using useGetPostsQuery.'}}/>
          <ListItemTile item={{url:'simple-posts',title:'Post List using RTK Query.', description: 'Using useGetPostListQuery.'}}/>
          <ListItemTile item={{url:'simple-posts',title:'Post List with pagination using RTK Query.', description: 'Using useGetPostListWithPaginationQuery.'}}/>
          {/* <div className="glass-panel" style={{padding: '3rem', textAlign: 'center'}}>
            <p style={{color: 'var(--text-muted)'}}>No tasks match your filters.</p>
          </div> */}
      </div>

    </div>
  );
};

export default Posts;
