import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import CreateUser from './components/createUser/CreateUser';
import Login from './components/login/Login';
import { Navigate } from 'react-router-dom'

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    }
  }, [])

  return (
    <div>
      <Routes>

        <Route exact path="/" element={isAuth ? <Navigate to="/createUser" /> : <Login />} />

        <Route path="/createUser" element={isAuth ? <CreateUser /> : <Navigate to="/" />} />

      </Routes>
    </div>
  )
}

export default App
