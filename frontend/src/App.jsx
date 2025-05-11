import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router'
import Homepage from './pages/Homepage'
import AddBook from './pages/AddBook'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore.js'
import RedirectAuthenticatedUsers from './providers/RedirectAuthenticatedUsers.jsx'
import RedirectUnauthenticatedUsers from './providers/RedirectUnauthenticatedUsers.jsx'
import Footer from "./components/Footer";
import Searchpage from './pages/Searchpage'
import Bookpage from './pages/Bookpage'
import UpdateBook from './pages/UpdateBook'

const App = () => {
  const { fetchUser, fetchingUser } = useAuthStore()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (fetchingUser) {
    return <p>Loading...</p>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route 
            path="/add-book" 
            element={
              <RedirectUnauthenticatedUsers>
                <AddBook />
              </RedirectUnauthenticatedUsers>
            } 
          />
          <Route 
            path="/login" 
            element={
              <RedirectAuthenticatedUsers>
                <LogIn />
              </RedirectAuthenticatedUsers>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <RedirectAuthenticatedUsers>
                <SignUp />
              </RedirectAuthenticatedUsers>
            } 
          />
          <Route path="/search" element={<Searchpage />} />
          <Route path="/book/:id" element={<Bookpage />} />
          <Route path="/book/:id/update" element={<UpdateBook />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;
