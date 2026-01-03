export type PostType = 'article' | 'pdf' | 'folder'; // 新增 folder 类型

export interface Post {
    id: number; // 文件夹也需要一个唯一 id
    title: string;
    excerpt?: string; // 文件夹可不提供
    date: string;
    category: string;
    readTime: string;
    type: PostType;
    fileUrl?: string; // 文件夹没有文件路径
    children?: Post[]; // 用于实现嵌套逻辑
    tags?: string[];
}