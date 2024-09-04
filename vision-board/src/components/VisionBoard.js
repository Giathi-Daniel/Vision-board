import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import AuthContext from './AuthContext';

const categories = [
    { name: 'Professional/Career Goals', bgColor: 'bg-blue-50', textColor: 'text-blue-600', path: '/professional-goals' },
    { name: 'School Plans', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { name: 'Athletics', bgColor: 'bg-red-50', textColor: 'text-red-600' },
    { name: 'Learning Goals', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600' },
    { name: 'Social Activism Goals', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { name: 'Health/Fitness', bgColor: 'bg-teal-50', textColor: 'text-teal-600' },
    { name: 'Travel Inspiration/Vacations', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
    { name: 'Friends/Family/Social Goals', bgColor: 'bg-pink-50', textColor: 'text-pink-600' },
    { name: 'Romance/Love Goals', bgColor: 'bg-rose-50', textColor: 'text-rose-600' },
    { name: 'Money Goals', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
    { name: 'Happiness/Contentment Goals', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
    { name: 'Hobby-Related Goals', bgColor: 'bg-lime-50', textColor: 'text-lime-600' },
    { name: 'Reading Goals', bgColor: 'bg-cyan-50', textColor: 'text-cyan-600' },
    { name: 'Meditation/Mindfulness Goals', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
    { name: 'Priorities', bgColor: 'bg-violet-50', textColor: 'text-violet-600' },
    { name: 'Big Life Dreams', bgColor: 'bg-fuchsia-50', textColor: 'text-fuchsia-600' },
];

const VisionBoard = () => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleCategoryClick = (path) => {
    if(!user) {
      toast.error('You must be authenticated to access this goal')
    } else {
      navigate(path)
    }
  }

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} onClick={() => handleCategoryClick(category.path)} className={`${category.bgColor} shadow-md p-6 rounded-md cursor-pointer`}>
            <h2 className={`${category.textColor} text-xl font-semibold mb-4`}>{category.name}</h2>
            <div className="bg-gray-200 px-2 py-2 rounded-sm w-full">
                <p className="text-gray-600 mt-1 truncate">Description not available</p>
              </div>
          </div>
        ))}
        <Link to="/add-goal" className="bg-green-500 text-white px-4 py-2 rounded-md">
          Add New Goal
        </Link>
      </section>
    </>
  );
}

export default VisionBoard;
