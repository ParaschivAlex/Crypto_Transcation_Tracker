/*import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'

function App() {
  const { alreadyLogged }: any = useAuthContext()

  return (
    <div className="App">
      {(alreadyLogged) && (
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path ="/" element={<Home />} />
          <Route path ="/login" element={<Login />} />
          <Route path ="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;
*/ 
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'

function App() {
  const { alreadyLogged, user }: any = useAuthContext()

  return (
    <div className="App">
      {(alreadyLogged) && (
      <BrowserRouter>
      <Navbar />
        <Routes>
          {(user) && (
            <>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element ={<Navigate to="/"/>}/>
          <Route path="/signup" element={user.displayName && <Navigate to="/" />}/>
          </>
          )}
          
          {(!user) && (
            <>
            <Route path="/" element={<Navigate to="/login" />}/>
            <Route path="/login" element ={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            </>
          )}
        </Routes>
      </BrowserRouter>
      )}
    </div>
  );
}
export default App;