import React from 'react';

const EmailManagementSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                Take Control of Your Inbox with AI
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our email management AI analyzes your messages, prioritizes important tasks, and helps you stay on top
                of your inbox.
              </p>
            </div>
            <div>
              <button className="whitespace-nowrap ring-offset-background focus-visible:ring-offset-2 py-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Get Started
              </button>
            </div>
          </div>
          <img
            src="/placeholder.svg"
            width="550"
            height="400"
            alt="Email Management AI"
            className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  );
};

export default EmailManagementSection;
