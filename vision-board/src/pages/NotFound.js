import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="mt-4 inline-block px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
