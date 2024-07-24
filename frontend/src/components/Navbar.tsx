import React from 'react';
import "../index.css"

const Navbar: React.FC = () => {
  return (
    <div className=''>
      <header className="w-full bg-muted py-3 md:py-4 lg:py-5">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            <a className="flex items-center gap-2" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
              </svg>
              <span className="text-lg font-semibold">Acme AI Email Assistant</span>
            </a>
            <nav className="hidden md:flex items-center gap-4">
              <a className="text-sm font-medium hover:underline" href="#">
                Home
              </a>
              <a className="text-sm font-medium hover:underline" href="#">
                Features
              </a>
              <a className="text-sm font-medium hover:underline" href="#">
                Pricing
              </a>
              <a className="text-sm font-medium hover:underline" href="#">
                Contact
              </a>
            </nav>
            <button className="inline-flex text-white bg-black items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
              Get Started
            </button>
          </div>
        </div>
      </header>
      </div>
  )
}
export default Navbar