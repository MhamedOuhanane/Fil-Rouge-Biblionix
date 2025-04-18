import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import SignupForm from './Pages/Auth/SignupForm'
import LoginForm from './Pages/Auth/LoginForm'
import Home from './Pages/client/Home'

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
