
const Hero = () => {
  return (
    <section id="hero" className="w-full bg-white py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm">AI-Powered Email Management</div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Take Control of Your Inbox with AI</h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Our AI-driven email management service revolutionizes the way you handle your inbox. Automate tedious tasks,
          boost productivity, and improve communication with personalized insights and intelligent features.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-black text-white h-10 px-4 py-2">
            Get Started
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border h-10 px-4 py-2">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </section>

  );
};

export default Hero;
