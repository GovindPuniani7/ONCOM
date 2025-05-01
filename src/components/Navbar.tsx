import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="flex flex-wrap justify-between items-center max-w-7xl mx-auto px-4">
      {/* Branding */}
      <div className="flex items-center space-x-2 text-xl font-bold text-blue-600 dark:text-blue-400">
        <span>🔥</span>
        <span>OnCom</span>
      </div>

      {/* Nav Links + Theme Toggle */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-semibold underline' : 'text-gray-700 dark:text-white hover:text-blue-500'
          }
        >
          Editor
        </NavLink>
        <NavLink
          to="/docs"
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-semibold underline' : 'text-gray-700 dark:text-white hover:text-blue-500'
          }
        >
          Docs
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-semibold underline' : 'text-gray-700 dark:text-white hover:text-blue-500'
          }
        >
          About
        </NavLink>

        {/* Single Theme Toggle button */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
