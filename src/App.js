import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Register from './Pages/Landing';
import Login from './Pages/Login';
import Conversations from './Pages/Conversations';
//import Conversation from './Pages/Conversation';
// import './App.css';

// React Router v6.0
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/conversations' element={<Conversations/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
