import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Landingpage';
import TabsCalculator from './components/TabCalculator';
import { Analytics } from "@vercel/analytics/react"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<TabsCalculator />} />
        <Route path="*" element={<Home />} />

      </Routes>

      <Analytics />

    </BrowserRouter>
  );
}

export default App;
