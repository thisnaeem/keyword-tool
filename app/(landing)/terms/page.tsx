export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white mt-32">Terms of Service</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Terms of Use</h2>
          <p className="mb-4">
            By accessing and using this website, you accept and agree to be bound by these terms and conditions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Service Modifications</h2>
          <p className="mb-4">
            We reserve the right to modify or discontinue the service at any time without notice.
          </p>
        </section>
      </div>
    </div>
  );
} 