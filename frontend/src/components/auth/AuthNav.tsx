

// src/components/auth/AuthNav.tsx
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface AuthNavProps {
  userName: string; // Expecting the user's first name
}

const AuthNav: React.FC<AuthNavProps> = ({ userName }) => {
//   const getInitials = (name: string) => {
//     const names = name.split(' ');
//     return names.map(n => n[0].toUpperCase()).join('');
//   };

  return (
    <div className="flex items-center justify-between border-b h-14 p-3 bg-gray-100">
      <div className="w-full max-w-md">
        <input
          placeholder="Search"
          type="search"
          className="border text-gray-900 px-3 border-gray-300 h-10 outline-none bg-transparent rounded-md w-full"
        />
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center bg-gray-300 text-white w-10 h-10 rounded-full">
          <FaUserCircle className="text-2xl" />
          {/* For a more customized profile logo, you can replace FaUserCircle with your logo */}
        </div>
        <span className="text-gray-900 font-medium">{userName}</span>
      </div>
    </div>
  );
};

export default AuthNav;
