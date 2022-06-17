import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from '../../Pages/Login/Login';
import { ProtectedRoute } from '../../routes/ProtectedRoute';
import { Dashboard } from '../../Pages/Dashboard/Dasboard';
import { Register } from '../../Pages/Register/Register';

function App() {
  const [login, setLogin] = useState(false);

  const handlelogin = bool => {
    setLogin(bool);
  };
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login onlogin={handlelogin} />} />
        <Route path="home" element={<Login onlogin={handlelogin} />} />
        <Route path="register" element={<Register />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute user={login}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
