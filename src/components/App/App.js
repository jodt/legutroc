import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../../Pages/Login/Login';
import { ProtectedRoute } from '../../routes/ProtectedRoute';
import { Dashboard } from '../../Pages/Dashboard/Dasboard';
import { Register } from '../../Pages/Register/Register';
import { UserContext } from '../../contexts/userContext';
import { MyAccount } from '../../Pages/MyAccount/MyAccount';
import { Mytrades } from '../../Pages/MyTrades/Mytrades';

function App() {
  const [isLogin, setIsLogin] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('isLogin');
    token && JSON.parse(token) ? setIsLogin(true) : setIsLogin(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('isLogin', isLogin);
  }, [isLogin]);

  useEffect(() => {
    const u = localStorage.getItem('user');
    setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handlelogin = bool => {
    setIsLogin(bool);
  };
  const handlelogout = bool => {
    setIsLogin(bool);
  };
  const userPropriety = user => {
    setUser(user);
  };
  return (
    <div className="App">
      <Routes>
        {!isLogin && (
          <>
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
          </>
        )}
        {isLogin && (
          <>
            <Route
              path="dashboard"
              element={
                <UserContext.Provider value={user}>
                  <Dashboard onlogout={handlelogout} />
                </UserContext.Provider>
              }
            />
            <Route
              path="myaccount"
              element={
                <UserContext.Provider value={user}>
                  <MyAccount />
                </UserContext.Provider>
              }
            />
            <Route
              path="mytrades"
              element={
                <UserContext.Provider value={user}>
                  <Mytrades />
                </UserContext.Provider>
              }
            />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={isLogin ? 'dashboard' : '/'} />}
        />
      </Routes>
    </div>
  );
}

export default App;
