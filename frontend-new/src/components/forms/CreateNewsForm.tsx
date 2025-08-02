import React, { useState } from 'react';
import { CreateNewsData } from '@/types/News';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CreateNewsFormProps {
  onSubmit: (data: CreateNewsData) => Promise<void>;
  onCancel: () => void;
}

export const CreateNewsForm: React.FC<CreateNewsFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateNewsData>({
    title: '',
    content: '',
    summary: '',
    published: false,
    isPublic: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Заголовок обов\'язковий';
    if (!formData.content.trim()) newErrors.content = 'Контент обов\'язковий';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Failed to create news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CreateNewsData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Заголовок"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        error={errors.title}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Короткий опис
        </label>
        <textarea
          value={formData.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Контент
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          rows={10}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => handleChange('published', e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Опублікувати відразу</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isPublic}
            onChange={(e) => handleChange('isPublic', e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Доступна для всіх (не тільки зареєстрованих користувачів)</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Скасувати
        </Button>
        <Button type="submit" loading={loading}>
          Створити
        </Button>
      </div>
    </form>
  );
};