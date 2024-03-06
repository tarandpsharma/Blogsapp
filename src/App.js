import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import  About  from './components/About';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Myblogs } from './components/Myblogs';
import BlogsPage from './components/BlogsPage';
import { Profile } from './components/profileUser/Profile';
import Logout from './components/Logout';

const App = () => {

  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />} />
          <Route path='/home' element= {<Header />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/myblogs/*' element={<Myblogs />} />
          <Route path='/blogs' element={<BlogsPage />} />
          <Route path='/profile' element= {<Profile />} />
          <Route path='/logout' element={<Logout />} />        
        </Routes>
      </BrowserRouter>
    
    </div>
  )
}

export default App