import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      {/* Left: Logo & Name */}
      <div className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400">
        <span className="text-2xl">💻</span> 
        <span>OnCom</span>
      </div>

      {/* Center: Links */}
      <div className="flex gap-6 text-sm font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 dark:text-blue-400 underline'
              : 'text-gray-800 dark:text-gray-200 hover:text-blue-500'
          }
        >
          Editor
        </NavLink>

        <NavLink
          to="/docs"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 dark:text-blue-400 underline'
              : 'text-gray-800 dark:text-gray-200 hover:text-blue-500'
          }
        >
          Docs
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 dark:text-blue-400 underline'
              : 'text-gray-800 dark:text-gray-200 hover:text-blue-500'
          }
        >
          About
        </NavLink>
      </div>

      {/* Right: Theme Toggle */}
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
