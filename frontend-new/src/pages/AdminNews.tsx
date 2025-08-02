import React, { useState } from 'react';
import { useAdminNews } from '@/hooks/useAdminNews';
import { News } from '@/types/News';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { NewsList } from '@/components/admin/NewsList';
import { NewsFilters } from '@/components/admin/NewsFilters';
import { CreateNewsForm } from '@/components/forms/CreateNewsForm';
import { EditNewsForm } from '@/components/forms/EditNewsForm';
import { ConfirmationDialog } from '@/components/shared/ConfirmationDialog';

const AdminNews: React.FC = () => {
  const { 
    news, 
    loading, 
    error, 
    filter, 
    setFilter, 
    createNews, 
    updateNews, 
    deleteNews, 
    togglePublish 
  } = useAdminNews();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<number | null>(null);

  const handleEdit = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setNewsToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (newsToDelete) {
      await deleteNews(newsToDelete);
      setIsDeleteDialogOpen(false);
      setNewsToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Управління новинами</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Створити новину
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <NewsFilters filter={filter} setFilter={setFilter} news={news} />

      <NewsList
        news={news}
        filter={filter}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePublish={togglePublish}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Створити новину"
        size="lg"
      >
        <CreateNewsForm
          onSubmit={async (data) => {
            await createNews(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedNews(null);
        }}
        title="Редагувати новину"
        size="lg"
      >
        {selectedNews && (
          <EditNewsForm
            news={selectedNews}
            onSubmit={async (data) => {
              await updateNews(selectedNews.id, data);
              setIsEditModalOpen(false);
              setSelectedNews(null);
            }}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedNews(null);
            }}
          />
        )}
      </Modal>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Підтвердження видалення"
        message="Ви впевнені, що хочете видалити цю новину? Цю дію неможливо скасувати."
      />
    </div>
  );
};

export default AdminNews;