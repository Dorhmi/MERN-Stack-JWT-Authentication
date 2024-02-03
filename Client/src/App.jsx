import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import EditUserPage from './pages/EditUserPage'
import SingleUserPage from './pages/SingleUserPage'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/edit' element={<EditUserPage/>}/>
        <Route path='/user/:id' element={<SingleUserPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App