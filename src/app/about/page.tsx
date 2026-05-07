export const metadata = {
  title: 'About | klip',
  description: 'Learn more about klip, the modern video sharing platform.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">About klip</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Welcome to klip, the premier platform for discovering and sharing amazing video content. 
          Our mission is to connect creators and viewers in a seamless, fast, and beautiful environment.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
        <p className="mb-4">
          We believe that video is the most powerful medium for storytelling. Whether it's educational content, 
          entertainment, or just a quick update from a friend, video brings people together. 
          klip was built from the ground up to be fast, reliable, and accessible on any device.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">The Technology</h2>
        <p className="mb-4">
          klip is powered by cutting-edge web technologies including Next.js 15, React 19, and Tailwind CSS. 
          Our containerized infrastructure ensures high availability and scalability to handle thousands of concurrent video streams.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Join the Community</h2>
        <p className="mb-4">
          Anyone can join klip! Create an account to start uploading your own videos, interacting with other users' content, 
          and building your audience.
        </p>
      </div>
    </div>
  );
}
