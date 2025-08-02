export interface News {
  id: number;
  title: string;
  content: string;
  summary?: string;
  published: boolean;
  isPublic: boolean;
  authorId: number;
  authorName: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNewsData {
  title: string;
  content: string;
  summary?: string;
  published: boolean;
  isPublic: boolean;
}

export interface UpdateNewsData {
  title?: string;
  content?: string;
  summary?: string;
  published?: boolean;
  isPublic?: boolean;
}