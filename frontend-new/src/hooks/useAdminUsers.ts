import { useState, useEffect } from 'react';
import { User, CreateUserData, UpdateUserData } from '@/types/User';
import { useAuth } from '@/context/AuthContext';

export const useAdminUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Не вдалося завантажити користувачів');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: CreateUserData) => {
    if (!token) throw new Error('Немає авторизації');

    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Не вдалося створити користувача');
    }

    await fetchUsers();
  };

  const updateUser = async (id: number, userData: UpdateUserData) => {
    if (!token) throw new Error('Немає авторизації');

    const response = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Не вдалося оновити користувача');
    }

    await fetchUsers();
  };

  const deleteUser = async (id: number) => {
    if (!token) throw new Error('Немає авторизації');

    const response = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Не вдалося видалити користувача');
    }

    setUsers(users.filter(user => user.id !== id));
  };

  const toggleUserStatus = async (id: number, isActive: boolean) => {
    if (!token) throw new Error('Немає авторизації');

    const response = await fetch(`/api/admin/users/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ isActive: !isActive })
    });

    if (!response.ok) {
      throw new Error('Не вдалося змінити статус користувача');
    }

    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    refetch: fetchUsers
  };
};