import type {Post} from './types';

export const posts: Post[] = [
    // --- Markdown 文章 (posts 文件夹) ---
    {
        id: 1,
        title: "深入理解 AVL 树",
        excerpt: "AVL 树是一种自平衡二叉搜索树。本文详细解析其旋转机制与平衡原理，探讨如何在动态数据中维持高效查询。",
        date: "2023-11-05",
        category: "数据结构",
        readTime: "10 min read",
        type: 'article',
        fileUrl: '/posts/AVL-tree.md'
    },
    {
        id: 2,
        title: "B-Tree：数据库索引的核心",
        excerpt: "B-Tree 及其变体是现代数据库和文件系统的基石。让我们深入了解这种多路平衡查找树的设计哲学。",
        date: "2023-11-08",
        category: "数据库",
        readTime: "15 min read",
        type: 'article',
        fileUrl: '/posts/B-tree.md'
    },
    {
        id: 3,
        title: "Java API 核心指南",
        excerpt: "重温 Java 基础类库。从集合框架到并发编程，一份关于 Basic Java API 的实用复习笔记。",
        date: "2023-11-12",
        category: "Java",
        readTime: "8 min read",
        type: 'article',
        fileUrl: '/posts/BasicJavaAPI.md'
    },
    {
        id: 4,
        title: "计算机组成与体系结构复习",
        excerpt: "COA 核心知识点梳理：指令集、流水线技术、存储器层次结构以及处理器设计原理。",
        date: "2023-11-15",
        category: "CS 基础",
        readTime: "20 min read",
        type: 'article',
        fileUrl: '/posts/COA-review.md'
    },
    {
        id: 5,
        title: "OSI 模型：物理层到网络层",
        excerpt: "详解网络通信的基础。重点分析物理层、数据链路层与网络层的协议转换与数据封装过程。",
        date: "2023-11-20",
        category: "网络",
        readTime: "12 min read",
        type: 'article',
        fileUrl: '/posts/OSILayers-phi-dataLink-netWork-transformation.md'
    },
    {
        id: 6,
        title: "线性代数笔记 (Linear Algebra I)",
        excerpt: "线性空间、矩阵运算与行列式的基础理论推导与习题解析（第一部分）。",
        date: "2023-10-01",
        category: "数学",
        readTime: "PDF Document",
        type: 'pdf',
        fileUrl: '/papers/linear-one.pdf'
    },
    {
        id: 7,
        title: "线性代数笔记 (Linear Algebra II)",
        excerpt: "特征值、特征向量、对角化以及线性变换的高级应用（第二部分）。",
        date: "2023-10-05",
        category: "数学",
        readTime: "PDF Document",
        type: 'pdf',
        fileUrl: '/papers/linear-two.pdf'
    },
    {
        id: 8,
        title: "Cream -- 一种反向验证的代码生成检查框架",
        excerpt: "通过：“搜索相似” + “代码生成” + “最后修改” 来大大提高 viber_coding 的可行性",
        date: "2025-12-09",
        category: "AI",
        readTime: "28min",
        type: 'pdf',
        fileUrl: '/papers/Cream.pdf'
    },
    {
        id: 9,
        title: "数据库系统复习",
        excerpt: "概述--本文来自于'https://eaglebear2002.github.io/'",
        date: "2026-1-1",
        category: "数据库",
        readTime: "5min",
        type: 'pdf',
        fileUrl: '/papers/数据库复习相关/01-绪论.pdf'
    },
    {
        id: 10,
        title: "数据库系统复习",
        excerpt: "关系数据库--本文来自于'https://eaglebear2002.github.io/'",
        date: "2026-1-1",
        category: "数据库",
        readTime: "5min",
        type: 'pdf',
        fileUrl: '/papers/数据库复习相关/02-关系数据库.pdf'
    },
    {
        id: 11,
        title: "数据库系统复习",
        excerpt: "SQL--本文来自于'https://eaglebear2002.github.io/'",
        date: "2026-1-1",
        category: "数据库",
        readTime: "5min",
        type: 'pdf',
        fileUrl: '/papers/数据库复习相关/03-关系数据库标准语言SQL.pdf'
    },
    {
        id: 12,
        title: "数据库系统复习",
        excerpt: "数据库安全性--本文来自于'https://eaglebear2002.github.io/'",
        date: "2026-1-1",
        category: "数据库",
        readTime: "5min",
        type: 'pdf',
        fileUrl: '/papers/数据库复习相关/04-数据库安全性.pdf'
    },
    {
        id: 13,
        title: "数据库系统复习",
        excerpt: "数据库完整性--本文来自于'https://eaglebear2002.github.io/'",
        date: "2026-1-1",
        category: "数据库",
        readTime: "5min",
        type: 'pdf',
        fileUrl: '/papers/数据库复习相关/05-数据库完整性.pdf'
    },
    {
        id: 14,
        title: "数据库系统复习",
        excerpt: "关系数据理论--本文来自于'https://eaglebear2002.github.io/'",
        date: "2026-1-1",
        category: "数据库",
        readTime: "5min",
        type: 'pdf',
        fileUrl: '/papers/数据库复习相关/06-关系数据理论.pdf'
    },

    {
        id: 15,
        title: "数据库系统复习",
        excerpt: "数据库设计--本文来自于'https://eaglebear2002.github.io/'",
        date: "2026-1-1",
        category: "数据库",
        readTime: "5min",
        type: 'pdf',
        fileUrl: '/papers/数据库复习相关/07-数据库设计.pdf'
    },

    {
        id: 16,
        title: "数据库系统复习",
        excerpt: "数据库恢复技术--本文来自于'https://eaglebear2002.github.io/'",
        date: "2026-1-1",
        category: "数据库",
        readTime: "5min",
        type: 'pdf',
        fileUrl: '/papers/数据库复习相关/10-数据库恢复技术.pdf'
    },
    {
        id: 17,
        title: "数据库系统复习",
        excerpt: "并发控制--本文来自于'https://eaglebear2002.github.io/'",
        date: "2026-1-1",
        category: "数据库",
        readTime: "5min",
        type: 'pdf',
        fileUrl: '/papers/数据库复习相关/11-并发控制.pdf'
    },
    {
        id: 18,
        title: "数据库系统复习",
        excerpt: "数据库基础复习指南--本文来自于'https://costg.gitbook.io/njuse'",
        date: "2026-1-1",
        category: "数据库",
        readTime: "5min",
        type: 'pdf',
        fileUrl: '/papers/数据库复习相关/数据管理基础复习指南.pdf'
    },
];