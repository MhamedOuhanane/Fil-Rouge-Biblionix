import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import SignupForm from './Pages/auth/SignupForm'
import LoginForm from './Pages/auth/LoginForm'
import Home from './Pages/client/Home'
import Unauthorized from './Pages/errors/Unauthorized'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<LoginForm />} />
            <Route path='register' element={<SignupForm />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
