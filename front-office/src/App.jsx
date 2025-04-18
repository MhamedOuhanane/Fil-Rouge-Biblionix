import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import SignupForm from './Pages/Auth/SignupForm'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='register' element={<SignupForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
