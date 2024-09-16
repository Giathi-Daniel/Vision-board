import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TemplateLibrary = () => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get('/api/templates');
                setTemplates(response.data);
            } catch (error) {
                console.error('Error fetching templates', error);
            }
        };
        fetchTemplates();
    }, []);

    const cloneTemplate = async (templateId) => {
        try {
            await axios.post(`/api/templates/${templateId}/clone`);
            alert('Template cloned successfully');
        } catch (error) {
            console.error('Error cloning template', error);
        }
    };

    return (
        <div className='p-4'>
            <h2 className='text-3xl font-bold text-center mb-6'>Goal Templates</h2>
            <div className="grid grid-cols-1 sm:grid-grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {templates.map((template) => (
                    <div key={template._id} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className='text-xl font-semibold mb-2'>{template.title}</h3>
                        <p className='text-gray-600'>{template.description}</p>
                        <button onClick={() => cloneTemplate(template._id)} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out'>Add to Vision Board</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplateLibrary;
