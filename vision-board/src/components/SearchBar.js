import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearchResults, initiateSearch }) => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [completed, setCompleted] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => {
            clearTimeout(timerId)
        };
    }, [query]);

    useEffect(() => {
        const handleSearch = async () => {
            if (debouncedQuery || category || completed) {
                initiateSearch();
                try {
                    const response = await axios.get('/api/goals/search', {
                        params: {
                            query: debouncedQuery,
                            category,
                            completed,
                        },
                    });
                    onSearchResults(response.data);
                } catch (error) {
                    console.error('Error searching goals', error);
                }
            }
        };

        handleSearch();
    }, [debouncedQuery, category, completed, onSearchResults, initiateSearch]);

    return (
        <div className="flex flex-col items-center p-4 space-y-2 bg-gray-100 rounded shadow-lg md:flex-row md:space-y-0 md:space-x-4">
            <input
                type="text"
                placeholder="Search goals..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 border rounded-md md:w-1/3"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md md:w-1/2"
            >
                <option value="">All Categories</option>
                <option value="Fitness">Fitness</option>
                <option value="Education">Education</option>
                <option value="Career">Career</option>
            </select>
            <select
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
                className="w-full p-2 border rounded-md md:w-1/2"
            >
                <option value="">All</option>
                <option value="true">Completed</option>
                <option value="false">Not Completed</option>
            </select>
            <button
                onClick={() => initiateSearch()} 
                className="px-4 py-2 text-white transition duration-150 ease-in-out bg-blue-500 rounded hover:bg-blue-600"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
