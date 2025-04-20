import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './Pages/client/Home'
import Unauthorized from './Pages/errors/Unauthorized'
import LoginForm from './Pages/Auth/LoginForm'
import SignupForm from './Pages/Auth/SignupForm'
import NotFound from './Pages/errors/NotFound'
import ProtectedRoute from './components/ptotectection/ProtectedRoute'
import AdminDashboard from './Pages/admin/AdminDashboard'
import DashboardLayout from './layout/DashboardLayout'
import useToken from './store/useToken'
import { useEffect } from 'react'
import BadgePage from './Pages/admin/BadgePage'

function App() {
  const { getUserFromToken, user } = useToken();

  useEffect (() => {
    if (!user) return getUserFromToken();
  }, []);
  
 
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<LoginForm />} />
            <Route path='register' element={<SignupForm />} />
          </Route>

          <Route path='/admin' element={ <ProtectedRoute allowedRoles={['admin']}> <DashboardLayout /> </ProtectedRoute> } >
            <Route index element={ <AdminDashboard /> } />
            <Route path='badge' element={ <BadgePage /> } />
          </Route>

          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
