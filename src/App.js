import React from 'react'
import { Route, Routes } from 'react-router-dom';
import CreateUser from './components/createUser/CreateUser';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/createUser" element={<CreateUser />} />
      </Routes>
    </div>
  )
}

export default App
