import type { Post } from './types';

export const posts: Post[] = [
    // --- 2026 年最新资源 (课程资料 & 技术探索) ---
    {
        id: 20260110,
        title: "图论算法Kruskal、Prim与Dijkstra详细解析",
        excerpt: "对于Kruskal、Prim与Dijkstra三大图论算法的详细解释，附带Java实现",
        date: "2026-01-10",
        category: "技术探索",
        tags: ["算法", "图论", "Java", "原创"],
        readTime: "15min",
        type: 'pdf',
        fileUrl: '/papers/图论三算法.pdf'
    },
    {
        id: 20260109,
        title: "基于Java实现的各类排序算法详解",
        excerpt: "详细解释了各种排序算法的运行逻辑以及复杂度分析",
        date: "2026-01-09",
        category: "技术探索",
        tags: ["算法", "排序", "Java", "原创"],
        readTime: "15min",
        type: 'pdf',
        fileUrl: '/papers/基于代码实现的排序算法深入讲解.pdf'
    },

    // --- 课程资料文件夹：数据结构 (ID: 900) ---
    {
        id: 900,
        type: 'folder',
        title: "数据结构与算法往年卷复习参考",
        date: "2026-01-02",
        category: "课程资料",
        readTime: "FOLDER",
        tags: ["算法", "往年卷"],
        children: [
            {
                id: 90001,
                title: "数据结构与算法2023",
                excerpt: "2023年往年卷（2021级前辈试卷）",
                date: "2026-01-08",
                category: "课程资料",
                tags: ["往年卷", "算法"],
                readTime: "8min",
                type: 'pdf',
                fileUrl: '/papers/DStructure_Review/2023.pdf'
            },
            {
                id: 90002,
                title: "数据结构与算法2021",
                excerpt: "2021年往年卷",
                date: "2026-01-08",
                category: "课程资料",
                tags: ["往年卷", "算法"],
                readTime: "8min",
                type: 'pdf',
                fileUrl: '/papers/DStructure_Review/2021.pdf'
            },
        ]
    },

    // --- 课程资料：南软通识 ---
    {
        id: 2026010501,
        title: "南京大学2025年毛泽东思想概述重点问题整理",
        excerpt: "课程梳理以及问题概述",
        date: "2026-01-05",
        category: "课程资料",
        tags: ["南软", "通识", "复习资料"],
        readTime: "28min",
        type: 'pdf',
        fileUrl: '/papers/maoTheory.pdf'
    },
    {
        id: 2026010502,
        title: "南京大学2025年习概重点问题整理",
        excerpt: "重点理论整理",
        date: "2026-01-05",
        category: "课程资料",
        tags: ["共创", "南软", "通识"],
        readTime: "28min",
        type: 'pdf',
        fileUrl: '/papers/xiTheory.pdf'
    },

    {
        id: 800,
        type: 'folder',
        title: "计算机组成与体系结构复习讲义",
        date: "2026-01-02",
        category: "课程资料",
        readTime: "FOLDER",
        tags: ["计组", "CS基础"],
        children: [
            {
                id: 80099,
                type: 'folder',
                title: "COA 相关作业整合",
                date: "2026-01-07",
                category: "课程资料",
                readTime: "FOLDER",
                tags: ["作业"],
                children: Array.from({ length: 10 }, (_, i) => ({
                    id: 8009901 + i,
                    title: `COA 作业 ${i + 1}`,
                    excerpt: `计算机组成原理第${i + 1}次作业`,
                    date: "2026-01-02",
                    category: "课程资料" as const,
                    tags: ["作业", "计组"],
                    readTime: "5min",
                    type: "pdf" as const,
                    fileUrl: `/papers/COA/COA_homeworks/HW_${i + 1}.pdf`
                }))
            },
            ...[
                { id: 80018, title: "90. 组成原理总复习", file: "90-复习.pdf" },
                { id: 80017, title: "17. 输入输出系统", file: "17-输入输出.pdf" },
                { id: 80016, title: "16. 总线系统", file: "16-总线.pdf" },
                { id: 80015, title: "15. 控制器逻辑", file: "15-控制器.pdf" },
                { id: 80014, title: "14. 指令流水线", file: "14-指令流水线.pdf" },
                { id: 80013, title: "13. 指令系统", file: "13-指令系统.pdf" },
                { id: 80012, title: "12. 虚拟存储器", file: "12-虚拟存储器.pdf" },
                { id: 80011, title: "11. RAID 技术", file: "11-RAID.pdf" },
                { id: 80010, title: "10. 外部存储器", file: "10-外部存储器.pdf" },
                { id: 80009, title: "09. Cache 映射", file: "09-Cache.pdf" },
                { id: 80008, title: "08. 内部存储器", file: "08-内部存储器.pdf" },
                { id: 80007, title: "07. BCD 运算", file: "07-BCD运算.pdf" },
                { id: 80006, title: "06. 浮点运算", file: "06-浮点运算.pdf" },
                { id: 80005, title: "05. 整数运算", file: "05-整数运算.pdf" },
                { id: 80004, title: "04. 校验码", file: "04-校验码.pdf" },
                { id: 80003, title: "03. 数据表示", file: "03-数据表示.pdf" },
                { id: 80002, title: "02. 计算机的顶层视图", file: "02-计算机的顶层视图.pdf" },
                { id: 80001, title: "01. 概述", file: "01-概述.pdf" }
            ].map(item => ({
                id: item.id,
                title: item.title,
                excerpt: "COA 课程核心讲义内容。",
                date: "2026-01-02",
                category: "课程资料" as const,
                tags: ["讲义", "计组"],
                readTime: "5min",
                type: 'pdf' as const,
                fileUrl: `/papers/COA/${item.file}`
            }))
        ]
    },

    // --- 课程资料文件夹：数据库 (ID: 700) ---
    {
        id: 700,
        type: 'folder',
        title: "数据库系统核心复习讲义",
        date: "2026-01-01",
        category: "课程资料",
        readTime: "FOLDER",
        tags: ["数据库"],
        children: [
            {
                id: 70099,
                type: "folder",
                title: "重点章节",
                date: "2026-01-04",
                category: "课程资料",
                readTime: "FOLDER",
                tags: ["重点章节"],
                children: [
                    { id: 7009901, title: "视图", date: "2026-01-04", category: "课程资料", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库/视图.pdf', readTime: "20min" },
                    { id: 7009902, title: "关系范式", date: "2026-01-04", category: "课程资料", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库/关系范式.pdf', readTime: "20min" },
                    { id: 7009903, title: "存取控制", date: "2026-01-04", category: "课程资料", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库/存取控制.pdf', readTime: "20min" },
                    { id: 7009904, title: "并发", date: "2026-01-04", category: "课程资料", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库/并发.pdf', readTime: "20min" },
                    { id: 7009905, title: "概念模型以及ER图", date: "2026-01-04", category: "课程资料", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库/ER图.pdf', readTime: "20min" },
                    { id: 7009906, title: "数据库故障相关", date: "2026-01-04", category: "课程资料", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库/故障.pdf', readTime: "20min" },
                    { id: 7009907, title: "断言与触发器", date: "2026-01-04", category: "课程资料", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库/触发器.pdf', readTime: "20min" },
                    { id: 7009908, title: "NoSQL与仲裁", date: "2026-01-04", category: "课程资料", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库/NoSQL.pdf', readTime: "20min" },
                ]
            },
            { id: 70010, title: "数据库作业整合", date: "2026-01-04", category: "课程资料", tags: ["作业", "数据库"], type: 'pdf', fileUrl: '/papers/数据库/作业.pdf', readTime: "20min" },
            { id: 70009, title: "数据库个人笔记", date: "2026-01-04", category: "课程资料", tags: ["笔记", "数据库"], type: 'pdf', fileUrl: '/papers/数据库/笔记.pdf', readTime: "20min" },
            { id: 70008, title: "数据库课件章节导航", date: "2026-01-04", category: "课程资料", tags: ["导航", "数据库"], type: 'pdf', fileUrl: '/papers/数据库/导航.pdf', readTime: "20min" },
            { id: 70007, title: "数据库基础2023往年卷", date: "2026-01-03", category: "课程资料", tags: ["往年卷", "数据库"], type: 'pdf', fileUrl: '/papers/数据库/2023.pdf', readTime: "5min" },
            { id: 70006, title: "数据库基础2020往年卷", date: "2026-01-03", category: "课程资料", tags: ["往年卷", "数据库"], type: 'pdf', fileUrl: '/papers/数据库/2020.pdf', readTime: "5min" },
            { id: 70005, title: "数据库基础复习总指南", date: "2026-01-01", category: "课程资料", tags: ["复习指南", "数据库"], type: 'pdf', fileUrl: '/papers/数据库/复习指南.pdf', readTime: "5min" }
        ]
    },
    {
        id: 20260101,
        title: "我的2025年年度总结",
        excerpt: "“在奋勇向前的路上，也别忘了停下来反思自己走过的路2025”",
        date: "2026-01-01",
        category: "日常思考",
        tags: ["年度总结"],
        readTime: "5min",
        type: 'pdf',
        fileUrl: '/papers/2025Conclusion.pdf'
    },
    {
        id: 20251209,
        title: "Cream -- 一种反向验证的代码生成检查框架",
        excerpt: "通过“搜索相似” + “代码生成”提高 viber_coding 可行性",
        date: "2025-12-09",
        category: "技术探索",
        tags: ["AI", "原创", "代码生成"],
        readTime: "28min",
        type: 'pdf',
        fileUrl: '/papers/Cream.pdf'
    }
];