import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './Pages/client/Home'
import Unauthorized from './Pages/errors/Unauthorized'
import LoginForm from './Pages/Auth/LoginForm'
import SignupForm from './Pages/Auth/SignupForm'
import NotFound from './Pages/errors/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<LoginForm />} />
            <Route path='register' element={<SignupForm />} />
          </Route>
    
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
