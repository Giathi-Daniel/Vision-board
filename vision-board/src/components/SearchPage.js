import React, { useState } from 'react';
import SearchBar from './SearchBar';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchResults = (results) => {
        setSearchResults(results);
        setIsLoading(false); 
    };

    const initiateSearch = () => {
        setIsLoading(true); 
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 text-3xl font-bold">Search & Filter Goals</h1>
  
            <SearchBar onSearchResults={handleSearchResults} initiateSearch={initiateSearch} />
            
            <div className="mt-6">
                {isLoading ? (
                    <p>Loading...</p>
                ) : searchResults.length > 0 ? (
                    <ul className="space-y-4">
                        {searchResults.map((goal) => (
                            <li key={goal._id} className="p-4 bg-gray-100 rounded shadow">
                                <h3 className="text-xl font-semibold">{goal.title}</h3>
                                <p>{goal.description}</p>
                                <p className="text-sm text-gray-600">Category: {goal.category}</p>
                                <p className="text-sm text-gray-600">
                                    Status: {goal.completed ? 'Completed' : 'Not Completed'}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No goals found matching your criteria</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
