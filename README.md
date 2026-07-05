# TaskMaster - Modern Todo Application

A complete, production-ready Todo application built with React, Vite, and Context API. It features a modern glassmorphic UI, responsive design, and robust client-side state management.

## Features

- **Dashboard View**: View statistics of your tasks (Total, Pending, Completed) and quickly glance at the latest top 10 pending or completed tasks.
- **Task Management**: Create, Edit, and Delete tasks. 
- **Advanced Filtering & Sorting**: 
  - Real-time search by task title or description.
  - Filter tasks by status (New vs Completed).
  - Sort tasks chronologically (Newest/Oldest) or alphabetically by Status.
- **Data Persistence**: Uses `localStorage` to save your state across browser reloads, seeded initially via the DummyJSON API.
- **Premium Aesthetics**: Built entirely using SCSS with glassmorphism, dynamic gradients, CSS variables for theming, and responsive layout.

## Prerequisites

- Node.js (v16.0.0 or higher recommended)
- npm (Node Package Manager)

## Getting Started

1. **Install Dependencies**
   Navigate to the project root directory and run:
   ```bash
   npm install
   ```

2. **Run the Development Server**
   To start the app locally with hot-reloading:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173` by default.

3. **Build for Production**
   To create an optimized production build:
   ```bash
   npm run build
   ```
   The built files will be output to the `/dist` directory.

## Technology Stack

- **React 18**
- **Vite** (Next Generation Frontend Tooling)
- **SCSS / SASS** (CSS Preprocessor)
- **React Router v6** (Routing)
- **Lucide React** (Icons)
- **DummyJSON API** (Initial Seed Data)

## Application Architecture

- **State Management**: The application avoids prop-drilling by utilizing the React Context API (`TodoContext`). This centralizes API hydration, local storage syncing, and state mutations (CRUD operations).
- **Styling**: `main.scss` handles design tokens, CSS variables, typography, and utility classes. Scoped styling is used for individual pages and components to ensure maintainability.
