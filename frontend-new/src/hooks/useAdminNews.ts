import { useState, useEffect } from 'react';
import { News, CreateNewsData, UpdateNewsData } from '@/types/News';
import { useAuth } from '@/context/AuthContext';

export const useAdminNews = () => {
  const { token } = useAuth();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'public' | 'private'>('all');

  const fetchNews = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await fetch('/api/admin/news', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Не вдалося завантажити новини');
      }

      const data = await response.json();
      setNews(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNews = async (newsData: CreateNewsData) => {
    if (!token) throw new Error('Немає авторизації');

    const response = await fetch('/api/admin/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newsData)
    });

    if (!response.ok) {
      throw new Error('Не вдалося створити новину');
    }

    await fetchNews();
  };

  const updateNews = async (id: number, newsData: UpdateNewsData) => {
    if (!token) throw new Error('Немає авторизації');

    const response = await fetch(`/api/admin/news/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newsData)
    });

    if (!response.ok) {
      throw new Error('Не вдалося оновити новину');
    }

    await fetchNews();
  };

  const deleteNews = async (id: number) => {
    if (!token) throw new Error('Немає авторизації');

    const response = await fetch(`/api/admin/news/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Не вдалося видалити новину');
    }

    setNews(news.filter(item => item.id !== id));
  };

  const togglePublish = async (id: number, currentStatus: boolean) => {
    if (!token) throw new Error('Немає авторизації');

    const action = currentStatus ? 'unpublish' : 'publish';
    const response = await fetch(`/api/admin/news/${id}/publish?action=${action}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Не вдалося змінити статус публікації');
    }

    await fetchNews();
  };

  useEffect(() => {
    fetchNews();
  }, [token]);

  return {
    news,
    loading,
    error,
    filter,
    setFilter,
    createNews,
    updateNews,
    deleteNews,
    togglePublish,
    refetch: fetchNews
  };
};