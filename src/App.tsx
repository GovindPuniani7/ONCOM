import { Routes, Route } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import Editor from './components/Editor';
import Docs from './pages/Docs';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-inter dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md px-6 py-4">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer - Sticky */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
        Built by <span className="font-semibold text-blue-600 dark:text-blue-400">Govind Puniani</span>
      </footer>

      {/* Toast Notifications */}
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
    </div>
  );
}
