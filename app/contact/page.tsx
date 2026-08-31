export const metadata = {
  title: "Contact - CVS CHARAN",
  description: "Get in touch with me.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24 px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">Let's Connect</h1>
        <p className="text-lg text-gray-600 mb-8">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <a
          href="mailto:hello@example.com"
          className="inline-block bg-primary text-white font-medium text-lg px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          Say Hello
        </a>

        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center gap-6">
          <a href="#" className="text-gray-500 hover:text-primary transition-colors">
            GitHub
          </a>
          <a href="#" className="text-gray-500 hover:text-primary transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-gray-500 hover:text-primary transition-colors">
            Twitter
          </a>
        </div>
      </div>
    </main>
  );
}
