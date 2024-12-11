export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white mt-32">Cookie Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small text files that are stored on your computer or mobile device when you visit our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
          <p className="mb-4">
            We use cookies to enhance your experience on our website, analyze site usage, and assist in our marketing efforts.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p className="mb-4">
            You can control and manage cookies in your browser settings. Please note that removing or blocking cookies may impact your user experience.
          </p>
        </section>
      </div>
    </div>
  );
} 