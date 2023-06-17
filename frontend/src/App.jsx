
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/user/LoginPage'
import Home from './pages/user/HomePage'
import Signup from './pages/user/SignupPage';
import ErrorPage from './pages/404page';
import Admin from './pages/admin/UserManagementPage'
import UserProfilePage from './pages/user/userProfilePage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import { useSelector } from 'react-redux'
function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const adminIsLoggedIn = useSelector((state) => state.user.adminIsLoggedIn)
 const Navigate =  useNavigate()
  return (
    <>
      <Routes>
        <Route path='/login' element={!isLoggedIn ? <Login /> : <Home />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/' element={isLoggedIn ? <Home /> : <Login />} />
        <Route path='/signup' element={!isLoggedIn ? <Signup /> : <Home />} />
        <Route path='/admin' element={adminIsLoggedIn ? <Admin /> : <AdminLoginPage />} />
        <Route path='/profile' element={isLoggedIn ? <UserProfilePage /> : <Login />} />
        <Route path='/admin/login' element={!adminIsLoggedIn ? <AdminLoginPage /> : <Admin />} />
      </Routes>
    </>
  )
}

export default App
