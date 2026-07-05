import React, { createContext, useState, useEffect } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos?limit=50');
        const data = await response.json();
        
        // Map API data to our required structure
        const mappedTodos = data.todos.map((todo, index) => {
          // Generate a fake date in the past for realistic sorting
          const pastDate = new Date();
          pastDate.setDate(pastDate.getDate() - (50 - index)); // Spread them out

          return {
            id: todo.id.toString(), // Use string ID for consistency with new creations
            title: todo.todo,
            description: `Auto-generated description for task: ${todo.todo}`,
            status: todo.completed ? 'completed' : 'new',
            createdAt: pastDate.toISOString(),
          };
        });

        // Check if there are local todos saved to persist across reloads
        const localTodos = localStorage.getItem('todos');
        if (localTodos) {
           setTodos(JSON.parse(localTodos));
        } else {
           setTodos(mappedTodos);
           localStorage.setItem('todos', JSON.stringify(mappedTodos));
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Update local storage whenever todos change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, loading]);

  const addTodo = (newTodo) => {
    const todo = {
      ...newTodo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'new' // default status
    };
    setTodos((prev) => [todo, ...prev]);
  };

  const updateTodo = (id, updatedFields) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, loading, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
