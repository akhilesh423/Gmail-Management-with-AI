import React from 'react';
import Sidebar from "./auth/Sidebar";
// import AuthNav from "./auth/AuthNav";
import Prompt from './ai/Prompt';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row bg-white h-screen w-screen">
      <Sidebar />
      <div className="grow flex flex-col">
        <div className='flex flex-row h-full p-5'>
        {children}
        <Prompt/>
        </div>
       
      </div>
    </div>
  );
};

export default Layout;
