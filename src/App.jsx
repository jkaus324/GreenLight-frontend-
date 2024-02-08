// App.jsx
import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Classroom from './components/Classroom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/classroom/:classId' element={<Classroom/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
