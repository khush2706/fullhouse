import { useState } from 'react'
import Home from './Home/Home'
import RegisterForm from '../components/registerForm'
import LoginForm from '../components/loginForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from '../styles/globalStyles'
import Dashboard from './Dashboard'
import ProtectedRoute from '../components/ProtectedRoute'
import Room from './Room'
import { SocketContext, socket } from '../contexts/socket'
import { QueueIdProvider } from '../contexts/queue'
import { PlaylistProvider } from '../contexts/playlist'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState({
    username: localStorage.getItem('username')
  })

  return (
    <>
      <GlobalStyle />
      <PlaylistProvider>
      <SocketContext.Provider value={socket}>
        <QueueIdProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="register" element={<RegisterForm />} />
                <Route path="login" element={<LoginForm setToken={setToken} setUser={setUser} />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute token={token}>
                      <Dashboard user={user} token={token} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="dashboard/:roomId"
                  element={
                    <ProtectedRoute token={token}>
                      <Room />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
        </QueueIdProvider>
      </SocketContext.Provider>
      </PlaylistProvider>
    </>
  )
}

export default App
