import Link from "next/link";

export const metadata = {
  title: "Resume - CVS CHARAN",
  description: "View or download my resume.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24 px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">Resume</h1>
        <p className="text-lg text-gray-600 mb-8">
          You can view a detailed breakdown of my experience on the <Link href="/experience" className="text-blue-600 hover:underline">Experience page</Link>, 
          or download a formal PDF copy of my resume below.
        </p>
        
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white font-medium text-lg px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          Download PDF
        </a>
      </div>
    </main>
  );
}
