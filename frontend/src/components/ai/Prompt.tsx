import React, { useState } from 'react';
import axios from 'axios';
import { FaArrowUp } from 'react-icons/fa';

const Prompt: React.FC = () => {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [chat, setChat] = useState<{ from: string, content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (subject.trim() === '' || recipientEmail.trim() === '') return;

    setChat([...chat, { from: 'user', content: `Subject: ${subject}\nTo: ${recipientEmail}` }]);
    setMessage('');
    setLoading(true);

    try {
      const emailBody = recipientEmail
      const response = await axios.post('https://gmail-management-with-ai.onrender.com/api/auth/prompt', 
      { subject,emailBody}, { withCredentials: true });
      const aiResponse = response.data.text;
      console.log(message)
      setChat([...chat, { from: 'user', content: `Subject: ${subject}\nTo: ${recipientEmail}` }, { from: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChat([...chat, { from: 'user', content: `Subject: ${subject}\nTo: ${recipientEmail}` }, { from: 'ai', content: 'Error: Could not get response' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col border-gray-300 border rounded-lg max-w-screen-sm ml-4 grow p-4 h-full bg-white shadow">
      <div className="flex-1 overflow-auto mb-3">
        <div className="flex flex-col space-y-3">
          {chat.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <p className="text-gray-500 italic mb-4">Generate the emails with AI</p>
                <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-gray-100">
                  <p className="text-gray-700">Enter a subject and recipient email to generate an email message.</p>
                </div>
              </div>
            </div>
          ) : (
            chat.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.from === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${msg.from === 'ai' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-900'} shadow-md`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="Subject"
        />
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="Recipient Email"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-black text-white rounded-full hover:bg-gray-800 flex items-center justify-center transition-all duration-300"
        >
          <FaArrowUp size={20} />
        </button>
      </div>
    </div>
  );
};

export default Prompt;
