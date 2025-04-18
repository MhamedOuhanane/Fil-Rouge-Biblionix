import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import SignupForm from './Pages/Auth/SignupForm'
import LoginForm from './Pages/Auth/LoginForm'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='register' element={<SignupForm />} />
            <Route path='login' element={<LoginForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
