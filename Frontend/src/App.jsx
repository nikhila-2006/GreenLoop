import { useState } from 'react';
import { Routes, Route ,Navigate} from "react-router-dom";
import LandingPage from './pages/Landing';
import WasteUpload from './pages/WasteUpload';
import WasteResult from './pages/WasteResult';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/upload" element={<WasteUpload/>}/>
      <Route path="/result" element={<WasteResult/>}/>
    </Routes>
  )
}

export default App
