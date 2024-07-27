// src/components/Sidebar.tsx
import React from 'react';
import { FiSend } from "react-icons/fi";
import { MdOutlineDrafts ,MdForwardToInbox,MdLogout} from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("https://gmail-management-with-ai.onrender.com/api/auth/logout", {
        withCredentials: true
      });
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="bg-white border-gray-300 border-r h-screen flex flex-col">
      <div className='border-b h-14 text-center flex items-center justify-center bg-gray-100'>
        <h1 className="text-lg font-bold">Email X AI</h1>
      </div>

      <div className='flex flex-col justify-between grow p-1'>
      <ul className="flex flex-col p-4 space-y-2">
        <li className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-150">
          <Link to="/inbox" className="flex items-center w-full">
            <MdForwardToInbox className="mr-3 text-xl" />
            <span className="text-lg">Inbox</span>
          </Link>
        </li>
        <li className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-150">
          <Link to="/sent" className="flex items-center w-full">
            <FiSend className="mr-3 text-xl" />
            <span className="text-lg">Sent</span>
          </Link>
        </li>
        <li className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-150">
          <Link to="/drafts" className="flex items-center w-full">
            <MdOutlineDrafts className="mr-3 text-xl" />
            <span className="text-lg">Drafts</span>
          </Link>
        </li>
      </ul>

      <div className="flex items-center justify-center p-1  mb-4">
        <div onClick={handleLogout} className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-150">
          <MdLogout className="mr-3 text-xl" />
          <span className="text-lg">Sign Out</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
