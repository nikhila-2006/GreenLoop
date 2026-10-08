import { useState } from 'react';
import { Routes, Route ,Navigate} from "react-router-dom";
import LandingPage from './pages/Landing';
import WasteUpload from './pages/WasteUpload';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/upload" element={<WasteUpload/>}/>
    </Routes>
  )
}

export default App
