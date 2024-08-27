import React from 'react';
import Header from "../components/Header"

function App() {
  const categories = [
    { name: 'Professional/Career Goals', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
    <Header />

      <main className="max-w-6xl mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className={`${category.bgColor} shadow-md p-6 rounded-md`}>
              <h2 className={`${category.textColor} text-xl font-semibold mb-4`}>{category.name}</h2>
              {/* Goals for this category will be placed here */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700">Goal Title</h3>
                  <p className="text-gray-600 mt-1">Brief description of the goal.</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gray-800 h-2.5 rounded-full" style={{ inlineSize: '60%' }}></div>
                  </div>
                </div>
                {/* Add more goals here */}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
