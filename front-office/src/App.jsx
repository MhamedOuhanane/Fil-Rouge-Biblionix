import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
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
import CategoriePage from './Pages/admin/CategoriePage'
import TagPage from './Pages/admin/TagPage'
import SubscriptionSuccess from './Pages/subscription/SubscriptionSuccess'
import UserManagementPage from './Pages/admin/UserManagement'
import TransactionPage from './Pages/admin/transactionPages'
import HomePage from './Pages/client/HomePage'
import LibrarianDashboard from './Pages/librarian/LibrarianDashboard'

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
            <Route index element={<HomePage />} />

            <Route path='login' element={<LoginForm />} />
            <Route path='register' element={<SignupForm />} />

            {/* <Route path='/library' element={<Layout />}>
              <Route index element={<Categories />} />
              <Route path='livre' element={<Livre />} />
            </Route> */}
          </Route>

          <Route path='/admin' element={ <ProtectedRoute allowedRoles={['admin']}><DashboardLayout role={'Administrateur'}/> </ProtectedRoute> } >
            <Route index element={ <AdminDashboard /> } />
            <Route path='user' element={ <UserManagementPage /> } />
            <Route path='categorie' element={ <CategoriePage /> } />
            <Route path='tag' element={ <TagPage /> } />
            <Route path='badge' element={ <BadgePage /> } />
            <Route path='transaction' element={ <TransactionPage /> } />
          </Route>
          
          <Route path='/librarian' element={<ProtectedRoute allowedRoles={['librarian']}> <DashboardLayout role={'Librarian'}/> </ProtectedRoute>} >
            <Route index element={<LibrarianDashboard />} />
          </Route>
          <Route path='/subscription/success' element={<SubscriptionSuccess />} />

          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
