import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/" className="text-xl font-bold text-gray-900">
              CMS Система
            </a>
          </div>

          <nav className="hidden md:flex space-x-10">
            <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Головна
            </a>
            <a href="/news" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Новини
            </a>
            <a href="/users" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Користувачі
            </a>
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Привіт, {user.firstName} {user.lastName}
                </span>
                {user.role === 'admin' && (
                  <a href="/admin" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Адмін-панель
                  </a>
                )}
                <Button variant="secondary" size="sm" onClick={logout}>
                  Вихід
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a href="/login" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Вхід
                </a>
                <Button size="sm">
                  <a href="/register">Реєстрація</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};