// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-600">TaskFlow</div>
          <div className="flex space-x-4">
            <Link href="/user/login" className="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition">
              Sign In
            </Link>
            <Link
              href="/user/register"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Team's <span className="text-indigo-600">Task Management</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Assign, track, and complete tasks with ease. Perfect for managers and employees to collaborate efficiently.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-lg text-lg font-medium"
            >
              Try for Free
            </Link>
            <Link
              href="/demo"
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition text-lg font-medium"
            >
              Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-6 py-16 bg-white rounded-t-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="text-indigo-600 text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Intuitive Calendar</h3>
              <p className="text-gray-600">Visual task management with drag-and-drop scheduling.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="text-indigo-600 text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600">Managers assign tasks, employees track their workload.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="text-indigo-600 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-gray-600">Instant notifications when tasks are assigned or completed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}