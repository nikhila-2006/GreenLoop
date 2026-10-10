import { useState } from 'react';
import { Routes, Route ,Navigate} from "react-router-dom";
import LandingPage from './pages/Landing';
import LoginPage from './pages/loginPage'
import SignupPage from  './pages/signupPage'
import WasteUpload from './pages/WasteUpload';
import WasteResult from './pages/WasteResult';
import Recyler from "./pages/Recycler";
import ProtectedRoute from './components/protectedRoute';
function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/user/login" element={<LoginPage role="user"/>}/>
        <Route path="/user/signup" element={<SignupPage role="user"/>}/>
        <Route path="/recycler/login" element={<LoginPage role="recycler"/>}/>
        <Route path="/recycler/signup" element={<SignupPage role="recycler"/>}/>
        <Route element={<ProtectedRoute role="user"/>}>
          <Route path="/upload" element={<WasteUpload/>}/>
          <Route path="/result" element={<WasteResult/>}/>
        </Route>
        <Route element={<ProtectedRoute role="recycler"/>}>
            <Route path="/pickup" element={<Recyler/>}/>
        </Route>
    </Routes>
  )
}

export default App
