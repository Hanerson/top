import React from 'react';
import { motion } from 'framer-motion';
import {
    Github, Code, Cpu, Terminal,
    GraduationCap, BookOpen, Gamepad2,
    Coffee, Heart, Globe, Award
} from 'lucide-react';

// --- 动画配置 ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- 数据配置 ---
const skills = [
    {
        category: "前端核心",
        icon: <Code size={20} className="text-blue-500" />,
        items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
        category: "工具与框架",
        icon: <Terminal size={20} className="text-purple-500" />,
        items: ["Vite", "Webpack", "Next.js", "Redux", "React Query"]
    },
    {
        category: "拓展技能",
        icon: <Cpu size={20} className="text-green-500" />,
        items: ["Node.js", "Git", "UI/UX设计", "性能优化", "自动化测试"]
    }
];

const education = [
    {
        school: "南京大学",
        role: "大学本科 (软件工程)",
        period: "2024.9 ~ 至今",
        desc: "就读于软件学院软件工程专业。积极参与 EL 程序设计大赛，探索计算机科学的深度与广度。",
        color: "bg-indigo-600"
    },
    {
        school: "江苏省淮安中学",
        role: "高中",
        period: "2021.9 ~ 2024.6",
        desc: "2024年高考淮安区状元，位列全省227名。曾获国家奥林匹克学科竞赛数学江苏省一等奖、物理江苏省二等奖。2023年获评淮安中学集团年度人物。",
        color: "bg-rose-500"
    }
];

const interests = [
    { title: "代码开发", icon: <Terminal />, desc: "喜欢探索新的技术栈和编程范式，追求极致的代码优雅。" },
    { title: "阅读", icon: <BookOpen />, desc: "技术书籍沉淀深度，科幻小说拓展想象力。" },
    { title: "游戏", icon: <Gamepad2 />, desc: "偶尔放松，同时以开发者的视角研究游戏交互设计。" },
    { title: "咖啡", icon: <Coffee />, desc: "重度咖啡爱好者，手冲与意式不仅是提神，更是生活方式。" },
    { title: "公益", icon: <Heart />, desc: "参与技术公益项目，相信代码可以传递温度。" },
    { title: "开源", icon: <Globe />, desc: "活跃于 GitHub，通过贡献开源项目与世界连接。" },
];

const About: React.FC = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-gray-50 overflow-hidden">
            {/* 背景装饰 */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <motion.div
                className="max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* --- Header / Hero Section --- */}
                <motion.div variants={itemVariants} className="text-center mb-20">
                    <div className="relative inline-block mb-6">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl">
                            {/* 这里可以用 img 标签替换为你的真实头像 */}
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-bold text-indigo-600">
                                HH
                            </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white" title="Open to work"></div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                        Hanerson <span className="text-indigo-600">HAO</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 font-medium mb-6">
                        致力于成为 <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">前端开发</span> / <span className="text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">算法工程师</span>
                    </p>

                    <p className="text-lg text-gray-500 italic max-w-2xl mx-auto mb-10 font-serif">
                        "关关难过关关过，行之不辍，未来可期"
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://github.com/hanerson"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <Github size={20} /> 查看 GitHub
                        </a>
                        <a
                            href="https://leetcode.cn/u/fu-guang-1e/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-lg hover:shadow-orange-500/30"
                        >
                            <Code size={20} /> LeetCode 主页
                        </a>
                    </div>
                </motion.div>

                {/* --- 技能树 (Grid Layout) --- */}
                <motion.section variants={itemVariants} className="mb-20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                        我的技能库
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {skills.map((skill, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-gray-50 rounded-xl">{skill.icon}</div>
                                    <h3 className="font-bold text-lg text-gray-800">{skill.category}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                      {item}
                    </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* --- 经历与教育 (Timeline) --- */}
                <motion.section variants={itemVariants} className="mb-20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
                        经历与教育
                    </h2>
                    <div className="space-y-8 relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200">
                        {education.map((edu, idx) => (
                            <div key={idx} className="relative group">
                                {/* Timeline Dot */}
                                <div className={`absolute -left-[29px] top-1 w-6 h-6 rounded-full border-4 border-white shadow-md ${edu.color} group-hover:scale-125 transition-transform`}></div>

                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            {edu.school}
                                        </h3>
                                        <span className="inline-flex items-center gap-1 text-sm font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      <Award size={14} /> {edu.period}
                    </span>
                                    </div>
                                    <div className="text-indigo-600 font-medium mb-3 text-sm flex items-center gap-1">
                                        <GraduationCap size={16}/> {edu.role}
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                        {edu.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* --- 兴趣爱好 (Grid) --- */}
                <motion.section variants={itemVariants}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                        兴趣爱好
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {interests.map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors text-center md:text-left"
                            >
                                <div className="inline-flex p-3 rounded-full bg-gray-50 text-gray-700 mb-3">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* --- Footer Quote --- */}
                <motion.div variants={itemVariants} className="mt-20 text-center border-t border-gray-100 pt-10">
                    <div className="inline-block p-4 rounded-full bg-white shadow-sm mb-4">
                        <span className="text-3xl">🚀</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">保持联系</h3>
                    <p className="text-gray-500 text-sm">
                        HanersonHAO · 记录技术成长的个人博客
                    </p>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default About;