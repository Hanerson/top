export type PostType = 'article' | 'pdf';

export interface Post {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readTime: string; // 对于 PDF 可以是 "15 pages"
    image: string;
    type: PostType;   // 新增类型区分
    fileUrl: string;  // 指向 public 下的路径，例如 '/posts/a.md'
}