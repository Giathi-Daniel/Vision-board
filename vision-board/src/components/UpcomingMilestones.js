import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpcomingMilestones = () => {
    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        const fetchMilestones = async () => {
            try {
                const response = await axios.get('/api/calendar/milestones');
                setMilestones(response.data);
            } catch (error) {
                console.error('Error fetching milestones', error);
            }
        };
        fetchMilestones();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Upcoming Milestones</h2>
            <ul className="space-y-4">
                {milestones.map((milestone) => (
                    <li key={milestone.id} className="bg-gray-100 p-4 rounded shadow">
                        <h3 className="text-xl font-semibold">{milestone.summary}</h3>
                        <p>{milestone.description}</p>
                        <p>{new Date(milestone.start.dateTime).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpcomingMilestones;
