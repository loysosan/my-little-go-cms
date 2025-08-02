import React from 'react';
import { News } from '@/types/News';
import { Button } from '@/components/ui/Button';

interface NewsListProps {
  news: News[];
  filter: 'all' | 'published' | 'draft' | 'public' | 'private';
  onEdit: (newsItem: News) => void;
  onDelete: (id: number) => void;
  onTogglePublish: (id: number, currentStatus: boolean) => void;
}

export const NewsList: React.FC<NewsListProps> = ({ 
  news, 
  filter, 
  onEdit, 
  onDelete, 
  onTogglePublish 
}) => {
  const filteredNews = news.filter(item => {
    switch (filter) {
      case 'published':
        return item.published;
      case 'draft':
        return !item.published;
      case 'public':
        return item.isPublic;
      case 'private':
        return !item.isPublic;
      default:
        return true;
    }
  });

  const getStatusBadge = (item: News) => {
    if (!item.published) {
      return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">Чернетка</span>;
    }
    if (item.isPublic) {
      return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Публічна</span>;
    }
    return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Для користувачів</span>;
  };

  if (filteredNews.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <p className="mt-2">Новин не знайдено</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="divide-y divide-gray-200">
        {filteredNews.map((item) => (
          <div key={item.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  {getStatusBadge(item)}
                </div>

                {item.summary && (
                  <p className="text-gray-600 mb-2">{item.summary}</p>
                )}

                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>Автор: {item.authorName}</span>
                  <span>Переглядів: {item.views}</span>
                  <span>Створено: {new Date(item.createdAt).toLocaleDateString('uk-UA')}</span>
                  {item.updatedAt !== item.createdAt && (
                    <span>Оновлено: {new Date(item.updatedAt).toLocaleDateString('uk-UA')}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant={item.published ? 'secondary' : 'success'}
                  size="sm"
                  onClick={() => onTogglePublish(item.id, item.published)}
                >
                  {item.published ? 'Зняти з публікації' : 'Опублікувати'}
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEdit(item)}
                >
                  Редагувати
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(item.id)}
                >
                  Видалити
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};