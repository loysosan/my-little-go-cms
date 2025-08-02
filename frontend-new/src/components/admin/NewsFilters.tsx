import React from 'react';
import { News } from '@/types/News';
import { Button } from '@/components/ui/Button';

interface NewsFiltersProps {
  filter: 'all' | 'published' | 'draft' | 'public' | 'private';
  setFilter: (filter: 'all' | 'published' | 'draft' | 'public' | 'private') => void;
  news: News[];
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({ filter, setFilter, news }) => {
  const filterButtons = [
    { key: 'all', label: 'Всі', count: news.length },
    { key: 'published', label: 'Опубліковані', count: news.filter(n => n.published).length },
    { key: 'draft', label: 'Чернетки', count: news.filter(n => !n.published).length },
    { key: 'public', label: 'Публічні', count: news.filter(n => n.isPublic).length },
    { key: 'private', label: 'Приватні', count: news.filter(n => !n.isPublic).length }
  ] as const;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {filterButtons.map(({ key, label, count }) => (
        <Button
          key={key}
          variant={filter === key ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter(key)}
        >
          {label} ({count})
        </Button>
      ))}
    </div>
  );
};