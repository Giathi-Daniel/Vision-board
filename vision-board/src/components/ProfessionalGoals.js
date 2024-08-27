import {useState, useEffect} from 'react';

function ProfessionalGoals() {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    fetch('/api/goals')
    .then(response => response.json())
    .then(data => setGoals(data))
    .catch(error => console.err('Error fetching goals:', error))
  }, [])


  return (
    <div>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal._id} className="bg-white p-4 rounded-md shadow-sm">
           <h3 className="text-lg font-medium text-gray-700">{goal.title}</h3>
           <p className="text-gray-600 mt-1">{goal.description}</p>
           <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ inlineSize: `${goal.progress}%`}}></div>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfessionalGoals;
