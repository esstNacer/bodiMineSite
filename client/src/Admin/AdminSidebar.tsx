import { useState } from "react";

export default function Sidebar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white px-6 py-8 flex flex-col justify-between shadow-lg z-50">
      {/* Haut : Logo + Navigation */}
      <div className="space-y-10 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <h2 className="text-3xl font-bold tracking-wide">BodyMine Admin</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 text-base font-semibold">
          <a href="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-colors">
            <span>📊</span>
            <span>Dashboard</span>
          </a>

          <a href="/admin/payments" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-colors">
            <span>💳</span>
            <span>Payements</span>
          </a>

          {/* Menu Utilisateur avec sous-menu */}
          <div>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-colors"
            >
              <span className="flex items-center space-x-3">
                <span>👥</span>
                <span>Utilisateurs</span>
              </span>
              <span>{userMenuOpen ? "▲" : "▼"}</span>
            </button>
            {userMenuOpen && (
              <div className="ml-10 mt-2 space-y-2 text-sm text-gray-300">
                <a href="/admin/patients" className="block hover:text-blue-400">Patients</a>
                <a href="/admin/professionals" className="block hover:text-blue-400">Professionals</a>
              </div>
            )}
          </div>

          <a href="/admin/banners" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-colors">
            <span>🖼️</span>
            <span>Bannières</span>
          </a>

          <a href="/admin/articles" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-colors">
            <span>📰</span>
            <span>Articles</span>
          </a>
        </nav>
      </div>

      {/* Bas : Footer */}
      <div className="pt-6 border-t border-gray-700 text-xs text-gray-400">
        &copy; 2025 BodyMine. Tous droits réservés.
      </div>
    </aside>
  );
}
