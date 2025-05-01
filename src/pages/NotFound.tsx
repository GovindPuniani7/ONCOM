import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
      <p className="text-xl text-gray-800 dark:text-gray-300 mb-6">
        Oops! Page not found.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition font-semibold"
      >
        🔙 Go Back Home
      </Link>
    </div>
  );
}
