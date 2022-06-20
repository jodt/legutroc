import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from '../../Pages/Login/Login';
import { ProtectedRoute } from '../../routes/ProtectedRoute';
import { Dashboard } from '../../Pages/Dashboard/Dasboard';
import { Register } from '../../Pages/Register/Register';
import { UserContext } from '../../contexts/userContext';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const handlelogin = bool => {
    setIsLogin(bool);
  };
  const userPropriety = user => {
    setUser(user);
  };
  return (
    <div className="App">
      <Routes>
        <Route
          index
          element={
            <Login onlogin={handlelogin} userPropriety={userPropriety} />
          }
        />
        <Route
          path="home"
          element={
            <Login onlogin={handlelogin} userPropriety={userPropriety} />
          }
        />
        <Route path="register" element={<Register />} />
        <Route
          path="dashboard"
          element={
            <UserContext.Provider value={user}>
              <ProtectedRoute isLogin={isLogin}>
                <Dashboard />
              </ProtectedRoute>
            </UserContext.Provider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
