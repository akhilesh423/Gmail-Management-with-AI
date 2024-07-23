import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const VirtualPet: React.FC = () => {
    const [message, setMessage] = useState('Hello! How can I assist you today?');
    const [userInput, setUserInput] = useState('');

    const handleUserInput = async () => {
        if (userInput.trim() === '') return;

        try {
            const response = await axios.post('/api/message', { text: userInput });
            setMessage(response.data.reply);
            setUserInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <h1 className="text-4xl font-bold text-white mb-8">Virtual Pet</h1>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <Webcam
                        audio={false}
                        screenshotFormat="image/jpeg"
                        className="rounded-lg border-2 border-gray-300"
                    />
                </div>
                <p className="text-xl text-gray-700 mb-4">{message}</p>
                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Say something..."
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={handleUserInput}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VirtualPet;
