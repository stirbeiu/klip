export const metadata = {
  title: 'Terms of Service | klip',
  description: 'Terms of Service for using klip.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <div className="prose prose-invert max-w-none text-muted-foreground">
        <p className="mb-4 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using klip, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
          If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. User Accounts</h2>
        <p className="mb-4">
          When you create an account with us, you must provide accurate, complete, and current information at all times. 
          Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Content</h2>
        <p className="mb-4">
          Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material.
          You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Acceptable Use</h2>
        <p className="mb-4">
          You agree not to use the Service to upload, post, or otherwise transmit any content that:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Is unlawful, harmful, threatening, abusive, harassing, or defamatory.</li>
          <li>Infringes on any patent, trademark, trade secret, copyright, or other proprietary rights of any party.</li>
          <li>Contains software viruses or any other computer code designed to interrupt, destroy, or limit functionality.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
          including without limitation if you breach the Terms.
        </p>
      </div>
    </div>
  );
}
