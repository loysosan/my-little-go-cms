export interface Skill {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillData {
  name: string;
  categoryId: number;
}

export interface CreateCategoryData {
  name: string;
}