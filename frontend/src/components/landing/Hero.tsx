// Hero.tsx

import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 bg-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-4">DataFlow</h1>
      <p className="text-lg mb-6">
        Systém pro sledování a analýzu hrozeb v reálném čase.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-white text-blue-500 rounded hover:bg-gray-200"
        >
          Přihlásit se
        </Link>
        <Link
          to="/dashboard"
          className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          Prohlížet data
        </Link>
      </div>
    </div>
  );
}
