import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import VisionBoard from './components/VisionBoard';
import ProfessionalGoals from './components/ProfessionalGoals';

function App() {


  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <HeaderWithLocation />
        <main className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<VisionBoard />} />
            <Route path="/professional-goals" element={<ProfessionalGoals />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function HeaderWithLocation() {
  const location = useLocation();

  let headerTitle = "My Vision Board";
  let showHomeButton = false;

  if (location.pathname === "/professional-goals") {
    headerTitle = "Professional/Career Goals";
    showHomeButton = true;
  }

  return <Header title={headerTitle} onHomeClick={showHomeButton ? () => {} : null} />;
}

export default App;


