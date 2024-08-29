import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import VisionBoard from './components/VisionBoard';
import ProfessionalGoals from './components/ProfessionalGoals';
import ManageCategories from "./components/Category/ManageCategories"
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'; 

function App() {


  return (
    <Router>
      <div className="min-h-screen p-4 bg-gray-100">
        <HeaderWithLocation />
        <main className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<VisionBoard />} />
            <Route path="/professional-goals" element={<ProfessionalGoals />} />
            <Route path="/manage-categories" element={<ManageCategories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function HeaderWithLocation() {
  const location = useLocation();

  const pathTitleMap = {
    '/': 'My Vision Board',
    '/professional-goals': 'Professional/Career Goals',
    '/school-plans': 'School Plans',
    '/athletics': 'Athletics',
    '/learning-goals': 'Learning Goals',
    '/social-activism': 'Social Activism Goals',
    '/health-fitness': 'Health/Fitness',
    '/travel-inspiration': 'Travel Inspiration/Vacations',
    '/friends-family': 'Friends/Family/Social Goals',
    '/romance-love': 'Romance/Love Goals',
    '/money-goals': 'Money Goals',
    '/happiness-contentment': 'Happiness/Contentment Goals',
    '/hobby-related-goals': 'Hobby-Related Goals',
    '/reading-goals': 'Reading Goals/Books to Read',
    '/meditation-mindfulness': 'Meditation/Mindfulness Goals',
    '/priorities': 'Priorities to Focus On',
    '/big-life-dreams': 'Big Life Dreams',
    '/manage-categories': 'Manage Categories',
  };
  

  const headerTitle = pathTitleMap[location.pathname] || 'My Vision Board';
  const showHomeButton = location.pathname !== '/';

  return <Header title={headerTitle} onHomeClick={showHomeButton ? () => {} : null} />;
}

export default App;


