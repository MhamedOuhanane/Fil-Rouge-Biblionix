import React from 'react';
import SignupPage from './Pages/Auth/SignupPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Pages/layouts/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='register' element={<SignupPage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
