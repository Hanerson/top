import type { Post } from './types';

export const posts: Post[] = [
    {
        id: 10002,
        type: 'folder',
        title: "计算机组成与体系结构复习讲义",
        date: "2026-01-02",
        category: "CS 基础",
        readTime: "FOLDER",
        children: [
            {
                id: 35,
                title: "90. 组成原理总复习",
                excerpt: "COA 全书考点串联与回顾。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "10min",
                type: 'pdf',
                fileUrl: '/papers/COA/90-复习.pdf'
            },
            {
                id: 34,
                title: "17. 输入输出系统",
                excerpt: "中断、DMA 与 I/O 接口逻辑。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/17-输入输出.pdf'
            },
            {
                id: 33,
                title: "16. 总线系统",
                excerpt: "总线仲裁、定时与传输控制。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/16-总线.pdf'
            },
            {
                id: 32,
                title: "15. 控制器逻辑",
                excerpt: "硬连线控制器与微程序控制器。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/15-控制器.pdf'
            },
            {
                id: 31,
                title: "14. 指令流水线",
                excerpt: "流水线冲突（冒险）及性能分析。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/14-指令流水线.pdf'
            },
            {
                id: 30,
                title: "13. 指令系统",
                excerpt: "寻址方式与指令格式设计。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/13-指令系统.pdf'
            },
            {
                id: 29,
                title: "12. 虚拟存储器",
                excerpt: "页式、段式存储与地址转换。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/12-虚拟存储器.pdf'
            },
            {
                id: 28,
                title: "11. RAID 技术",
                excerpt: "磁盘阵列的层级与容错机制。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/11-RAID.pdf'
            },
            {
                id: 27,
                title: "10. 外部存储器",
                excerpt: "磁盘、光盘等辅助存储介质原理。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/10-外部存储器.pdf'
            },
            {
                id: 26,
                title: "09. Cache 映射",
                excerpt: "全相联、直接映射与组相联缓存。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/09-Cache.pdf'
            },
            {
                id: 25,
                title: "08. 内部存储器",
                excerpt: "SRAM、DRAM 存储芯片与扩展。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/08-内部存储器.pdf'
            },
            {
                id: 24,
                title: "07. BCD 运算",
                excerpt: "二进制编码的十进制数处理。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/07-BCD运算.pdf'
            },
            {
                id: 23,
                title: "06. 浮点运算",
                excerpt: "IEEE 754 标准与对阶运算。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/06-浮点运算.pdf'
            },
            {
                id: 22,
                title: "05. 整数运算",
                excerpt: "补码加减法与乘除法逻辑。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/05-整数运算.pdf'
            },
            {
                id: 21,
                title: "04. 校验码",
                excerpt: "奇偶校验、海明码与 CRC 校验。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/04-校验码.pdf'
            },
            {
                id: 20,
                title: "03. 数据表示",
                excerpt: "定点数表示法与数值转换。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/03-数据表示.pdf'
            },
            {
                id: 19,
                title: "02. 计算机的顶层视图",
                excerpt: "冯诺依曼结构与主要组件连接。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/02-计算机的顶层视图.pdf'
            },
            {
                id: 18,
                title: "01. 概述",
                excerpt: "计组课程导论与基本概念。",
                date: "2026-01-02",
                category: "CS 基础",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/COA/01-概述.pdf'
            }
        ]
    },
    {
        id: 10001,
        type: 'folder',
        title: "数据库系统核心复习讲义",
        date: "2026-01-01",
        category: "数据库",
        readTime: "FOLDER",
        children: [
            {
                id: 100012023,
                title: "数据库基础2023往年卷",
                excerpt: "2023年数据库管理基础试题，复习使用",
                date: "2026-01-03",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/2023.pdf'
            },
            {
                id: 100012020,
                title: "数据库基础2020往年卷",
                excerpt: "2020年数据库管理基础试题，复习使用",
                date: "2026-01-03",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/2020.pdf'
            },
            {
                id: 17,
                title: "数据库基础复习总指南",
                excerpt: "针对 NJUSE 课程的综合复习建议。",
                date: "2026-01-01",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/数据管理基础复习指南.pdf'
            },
            {
                id: 16,
                title: "11. 并发控制",
                excerpt: "封锁协议、封锁粒度与死锁。",
                date: "2026-01-01",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/11-并发控制.pdf'
            },
            {
                id: 15,
                title: "10. 数据库恢复技术",
                excerpt: "日志、检查点与恢复策略。",
                date: "2026-01-01",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/10-数据库恢复技术.pdf'
            },
            {
                id: 14,
                title: "07. 数据库设计",
                excerpt: "E-R 模型设计与逻辑映射。",
                date: "2026-01-01",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/07-数据库设计.pdf'
            },
            {
                id: 13,
                title: "06. 关系数据理论",
                excerpt: "范式理论：1NF, 2NF, 3NF, BCNF。",
                date: "2026-01-01",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/06-关系数据理论.pdf'
            },
            {
                id: 12,
                title: "05. 数据库完整性",
                excerpt: "实体完整性、参照完整性与用户定义完整性。",
                date: "2026-01-01",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/05-数据库完整性.pdf'
            },
            {
                id: 11,
                title: "04. 数据库安全性",
                excerpt: "存取控制、审计与加密。",
                date: "2026-01-01",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/04-数据库安全性.pdf'
            },
            {
                id: 10,
                title: "03. 标准语言 SQL",
                excerpt: "数据定义、查询、更新及视图操作。",
                date: "2026-01-01",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/03-关系数据库标准语言SQL.pdf'
            },
            {
                id: 9,
                title: "02. 关系数据库模型",
                excerpt: "关系数据结构、关系操作与完整性约束。",
                date: "2026-01-01",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/02-关系数据库.pdf'
            },
            {
                id: 8,
                title: "01. 数据库系统绪论",
                excerpt: "概述数据库的基本概念与体系结构。",
                date: "2026-01-01",
                category: "数据库",
                readTime: "5min",
                type: 'pdf',
                fileUrl: '/papers/数据库复习相关/01-绪论.pdf'
            }
        ]
    },

    // --- 2025 年 ---
    {
        id: 7,
        title: "Cream -- 一种反向验证的代码生成检查框架",
        excerpt: "通过：“搜索相似” + “代码生成” + “最后修改” 来大大提高 viber_coding 的可行性",
        date: "2025-12-09",
        category: "AI",
        readTime: "28min",
        type: 'pdf',
        fileUrl: '/papers/Cream.pdf'
    },

    // --- 2023 年 ---
    {
        id: 6,
        title: "OSI 模型：物理层到网络层",
        excerpt: "详解网络通信的基础。重点分析物理层、数据链路层与网络层的协议转换与数据封装过程。",
        date: "2023-11-20",
        category: "网络",
        readTime: "12 min read",
        type: 'article',
        fileUrl: '/posts/OSILayers-phi-dataLink-netWork-transformation.md'
    },
    {
        id: 5,
        title: "计算机组成与体系结构复习",
        excerpt: "COA 核心知识点梳理：指令集、流水线技术、存储器层次结构以及处理器设计原理。",
        date: "2023-11-15",
        category: "CS 基础",
        readTime: "20 min read",
        type: 'article',
        fileUrl: '/posts/COA-review.md'
    },
    {
        id: 4,
        title: "Java API 核心指南",
        excerpt: "重温 Java 基础类库。从集合框架到并发编程，一份关于 Basic Java API 的实用复习笔记。",
        date: "2023-11-12",
        category: "Java",
        readTime: "8 min read",
        type: 'article',
        fileUrl: '/posts/BasicJavaAPI.md'
    },
    {
        id: 3,
        title: "B-Tree：数据库索引的核心",
        excerpt: "B-Tree 及其变体是现代数据库和文件系统的基石。",
        date: "2023-11-08",
        category: "数据库",
        readTime: "15 min read",
        type: 'article',
        fileUrl: '/posts/B-tree.md'
    },
    {
        id: 2,
        title: "深入理解 AVL 树",
        excerpt: "AVL 树是一种自平衡二叉搜索树。本文详细解析其旋转机制与平衡原理。",
        date: "2023-11-05",
        category: "数据结构",
        readTime: "10 min read",
        type: 'article',
        fileUrl: '/posts/AVL-tree.md'
    },
    {
        id: 1,
        title: "线性代数笔记 (Linear Algebra II)",
        excerpt: "特征值、特征向量、对角化以及线性变换的高级应用（第二部分）。",
        date: "2023-10-05",
        category: "数学",
        readTime: "PDF Document",
        type: 'pdf',
        fileUrl: '/papers/linear-two.pdf'
    },
    {
        id: 0,
        title: "线性代数笔记 (Linear Algebra I)",
        excerpt: "线性空间、矩阵运算与行列式的基础理论推导与习题解析（第一部分）。",
        date: "2023-10-01",
        category: "数学",
        readTime: "PDF Document",
        type: 'pdf',
        fileUrl: '/papers/linear-one.pdf'
    }
];