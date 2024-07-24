

export default function Footer(){
    return(
        <footer className=" bg-white py-12">
  <div className="container px-4 md:px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">About Me</h3>
        <p className="text-gray-600">
          I'm a passionate web developer dedicated to building functional and aesthetically pleasing web applications. Connect with me on social media.
        </p>
        <div className="flex space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.302 3.438 9.8 8.207 11.387.599.113.82-.26.82-.577 0-.285-.011-1.04-.017-2.04-3.338.728-4.042-1.609-4.042-1.609-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.836 2.807 1.305 3.492.998.108-.774.419-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.467-2.382 1.236-3.222-.124-.302-.535-1.523.117-3.176 0 0 1.008-.322 3.302 1.23a11.5 11.5 0 013.003-.404c1.018.004 2.04.138 3.003.404 2.294-1.552 3.302-1.23 3.302-1.23.653 1.653.242 2.874.118 3.176.77.84 1.236 1.912 1.236 3.222 0 4.61-2.806 5.624-5.476 5.92.43.372.823 1.102.823 2.22 0 1.604-.015 2.897-.015 3.293 0 .319.22.694.825.576C20.565 22.092 24 17.595 24 12.297 24 5.67 18.627.297 12 .297z" /></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.7c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.7h-3v-5.6c0-1.336-.024-3.064-1.866-3.064-1.867 0-2.155 1.458-2.155 2.964v5.7h-3v-10h2.884v1.367h.041c.402-.761 1.384-1.563 2.85-1.563 3.045 0 3.607 2.004 3.607 4.608v5.588z"/></svg>
          </a>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Quick Links</h3>
        <ul className="space-y-2">
         <li><a href="#pricing" className="text-gray-600">Home</a></li>
          <li><a href="#features" className="text-gray-600 ">Features & Benefits</a></li>
          <li><a href="#contact" className="text-gray-600 ">Contact Me</a></li>
        </ul>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Me</h3>
        <p className="text-gray-600">
    Email: <a href="mailto:akhilakhilesh423@gmail.com" className="text-gray-600 hover:underline">akhilakhilesh423@gmail.com</a>
  </p>
      </div>
    </div>
    <div className="mt-12 text-center text-gray-500">
      <p>&copy; 2024 @Akhilesh. All rights reserved.</p>
    </div>
  </div>
</footer>

    )
}