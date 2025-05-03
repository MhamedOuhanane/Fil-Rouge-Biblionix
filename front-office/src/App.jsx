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
import SubscriptionCancel from './Pages/subscription/SubscriptionCancel'
import CategoriesPage from './Pages/client/CategoriePage'
import LivrePage from './Pages/client/LivrePage'
import LayoutLibrary from './layout/LayoutLibrary'
import LivreDetails from './Pages/client/LivreDetails'
import MesReservations from './Pages/client/ReservationPage'
import EcrivainPage from './Pages/client/EcrivainPage'
import LivreDashboard from './Pages/librarian/LivreDashboard'
import ReviewPage from './Pages/librarian/ReviewPage'
import ReservationDashboard from './Pages/librarian/ReservationDashboard'

function App() {
  const { getUserFromToken, user, badge, setBadge } = useToken();

  useEffect (() => {
    if (!user) getUserFromToken();
    if (!badge) setBadge();
    console.log(badge);
  }, []);
  
 
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route path='login' element={<LoginForm />} />
            <Route path='register' element={<SignupForm />} />

            <Route path='/library' element={<LayoutLibrary />}>
              <Route index element={<CategoriesPage />} />
              <Route path=':categorie_id/livres' element={<LivrePage />} />
              <Route path='livres' element={<LivrePage />} />
              <Route path=':categorie_id/livres/:livre_id' element={<ProtectedRoute allowedRoles={['lecteur', 'auteur']}><LivreDetails /></ProtectedRoute>} />
            </Route>
            <Route path='reservation' element={<ProtectedRoute allowedRoles={['lecteur', 'auteur']}><MesReservations /></ProtectedRoute>} />
            <Route path='ecrivain' element={<ProtectedRoute allowedRoles={['lecteur', 'auteur']}><EcrivainPage /></ProtectedRoute>} />
          
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
            <Route path='livre' element={<LivreDashboard />} />
            <Route path='reservation' element={<ReservationDashboard />} />
            <Route path='review' element={<ReviewPage />} />
          </Route>
          
          <Route path='/subscription/success' element={<SubscriptionSuccess />} />
          <Route path='/subscription/cancel' element={<SubscriptionCancel />} />

          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
