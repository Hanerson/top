// src/types.ts
export type PostType = 'article' | 'pdf';

export interface Post {
    id: number;
    title: string;
    excerpt: string;
    date: string;     // 格式建议: YYYY-MM-DD
    category: string;
    readTime: string;
    type: PostType;
    fileUrl: string;
    tags?: string[];  // 预留标签位，增强检索理性
}