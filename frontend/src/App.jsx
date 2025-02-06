import { useState } from 'react';
import './App.css';
import Login from './auth/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './auth/Register';
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Inventory from './pages/Inventory';
import Transactions from './pages/Transactions';
import BatchHistory from './pages/BatchHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/batch-history" element={<BatchHistory />} />
        {/* <Route path="/batch-history" element={<BatchHistory />} /> */}
        {/* <Route path="/accounts" element={<Accounts />} /> */}

      </Routes>
    </Router>




  );
}

export default App;
