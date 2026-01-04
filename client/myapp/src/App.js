import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';



const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};


function App() {
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser && savedUser !== "undefined") {
    try {
      return JSON.parse(savedUser);
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  }
  return null;
});  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/courses" 
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App