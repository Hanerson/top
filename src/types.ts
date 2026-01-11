export type PostType = 'article' | 'pdf' | 'folder';

// 定义三大核心分类
export type MainCategory = '课程资料' | '技术探索' | '日常思考';

export interface Post {
    id: number;
    title: string;
    excerpt?: string;
    date: string;
    category: MainCategory; // 仅限这三个
    readTime: string;
    type: PostType;
    fileUrl?: string;
    children?: Post[];
    tags: string[]; // 具体的描述全部收纳到这里
}

// UI 映射配置
export const CATEGORY_CONFIG: Record<MainCategory, { color: string; icon: string }> = {
    '课程资料': { color: 'text-blue-600 bg-blue-50', icon: '📚' },
    '技术探索': { color: 'text-orange-600 bg-orange-50', icon: '🚀' },
    '日常思考': { color: 'text-purple-600 bg-purple-50', icon: '💡' }
};