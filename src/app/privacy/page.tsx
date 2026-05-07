export const metadata = {
  title: 'Privacy Policy | klip',
  description: 'Privacy Policy for klip.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none text-muted-foreground">
        <p className="mb-4 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p className="mb-6">
          At klip, we take your privacy seriously. This Privacy Policy describes our policies and procedures 
          on the collection, use, and disclosure of your information when you use our service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Information We Collect</h2>
        <p className="mb-4">We collect several different types of information for various purposes to provide and improve our Service to you:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Personal Data:</strong> Email address, first name and last name, profile pictures, and usage data.</li>
          <li><strong>Content:</strong> Any videos, comments, or metadata you upload to the platform.</li>
          <li><strong>Usage Data:</strong> Information on how the Service is accessed and used, including your device's IP address, browser type, and diagnostic data.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">How We Use Your Data</h2>
        <p className="mb-4">klip uses the collected data for various purposes:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>To provide and maintain our Service.</li>
          <li>To notify you about changes to our Service.</li>
          <li>To allow you to participate in interactive features of our Service.</li>
          <li>To provide customer support and gather analysis to improve the Service.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Data Security</h2>
        <p className="mb-4">
          The security of your data is important to us, but remember that no method of transmission over the Internet, 
          or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, 
          we cannot guarantee its absolute security.
        </p>
      </div>
    </div>
  );
}
