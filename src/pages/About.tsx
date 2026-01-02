// src/pages/About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
    Github, Code, Cpu, Terminal,
    GraduationCap, BookOpen, Gamepad2,
    Coffee, Heart, Globe, Award,
    Fingerprint, ExternalLink, MapPin
} from 'lucide-react';

const About: React.FC = () => {
    const skills = [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite"] },
        { category: "Tools", items: ["Git", "Docker", "Webpack", "Vercel"] },
        { category: "Others", items: ["Node.js", "UI/UX Design", "Algorithms (Competitive)"] }
    ];

    const education = [
        {
            school: "南京大学 (NJU)",
            role: "软件工程 · 本科",
            period: "2024.09 - PRESENT",
            desc: "就读于软件学院。探索底层原理与现代架构，积极参与算法竞赛与开源项目实践。",
            tags: ["Software Engineering", "Competitive Programming"]
        },
        {
            school: "江苏省淮安中学",
            role: "高级中学",
            period: "2021.09 - 2024.06",
            desc: "2024年高考淮安区状元 (江苏省第227名)。曾获数学奥赛省一等奖、物理省二等奖。2023年年度人物。",
            tags: ["High School Hero", "Olympiad in Math"]
        }
    ];

    const interests = [
        { title: "Develop", icon: <Terminal size={14} />, desc: "追求代码的极致简洁与逻辑闭环。" },
        { title: "Read", icon: <BookOpen size={14} />, desc: "在科幻与硬核技术书籍中寻找边界。" },
        { title: "Coffee", icon: <Coffee size={14} />, desc: "逻辑引擎的燃料，手冲爱好者。" },
        { title: "OpenSource", icon: <Globe size={14} />, desc: "相信代码开源是人类知识的共建。" }
    ];

    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-6 text-slate-900 font-sans">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto"
            >
                {/* --- Profile Header --- */}
                <header className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 border-b border-slate-100 pb-16">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 text-indigo-600 font-mono text-xs mb-4 tracking-tighter uppercase">
                            <Fingerprint size={14} />
                            <span>Subject_Profile_Initialization</span>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tighter mb-6">
                            Hanerson <span className="text-slate-300">HAO</span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-lg leading-relaxed mb-8">
                            南京大学软件学院在读。专注于 <span className="text-slate-900 font-semibold underline decoration-indigo-200 underline-offset-4">前端架构</span> 与 <span className="text-slate-900 font-semibold underline decoration-indigo-200 underline-offset-4">算法优化</span>。
                            以理性的思维构建美学，以工程的严谨驱动体验。
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="https://github.com/hanerson" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded text-xs font-mono hover:bg-slate-800 transition-all">
                                <Github size={14} /> GITHUB_REPO
                            </a>
                            <a href="https://leetcode.cn/u/fu-guang-1e/" target="_blank" className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded text-xs font-mono hover:bg-slate-50 transition-all">
                                <Code size={14} /> LEETCODE_PROFILE
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col justify-end space-y-4 border-l border-slate-50 pl-8 font-mono text-[10px] text-slate-400">
                        <div>
                            <p className="text-slate-300 uppercase">Location</p>
                            <p className="text-slate-600 flex items-center gap-1"><MapPin size={10} /> Nanjing, China</p>
                        </div>
                        <div>
                            <p className="text-slate-300 uppercase">Status</p>
                            <p className="text-slate-600 flex items-center gap-1"><ActivityIcon /> ACTIVE_LEARNING</p>
                        </div>
                        <div>
                            <p className="text-slate-300 uppercase">Quote</p>
                            <p className="text-slate-600 italic">"Stay hungry, stay rigorous."</p>
                        </div>
                    </div>
                </header>

                {/* --- Skills Grid --- */}
                <section className="mb-24">
                    <h2 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
                        <Cpu size={14} /> 01_Technical_Stack
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {skills.map((skill, i) => (
                            <div key={i} className="space-y-4">
                                <h3 className="font-mono text-[10px] font-bold text-indigo-600 uppercase border-b border-indigo-50 pb-2">{skill.category}</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-2">
                                    {skill.items.map(item => (
                                        <span key={item} className="text-sm font-medium text-slate-600 hover:text-indigo-600 cursor-default transition-colors">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Education Timeline --- */}
                <section className="mb-24">
                    <h2 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
                        <GraduationCap size={14} /> 02_Education_Log
                    </h2>
                    <div className="space-y-12">
                        {education.map((edu, i) => (
                            <div key={i} className="relative pl-8 border-l border-slate-100 group">
                                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-slate-200 group-hover:bg-indigo-500 transition-colors" />
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">{edu.school}</h3>
                                    <span className="font-mono text-[10px] text-slate-400 tracking-tighter">{edu.period}</span>
                                </div>
                                <div className="text-indigo-600 font-mono text-xs mb-4 uppercase tracking-wider">{edu.role}</div>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mb-4">{edu.desc}</p>
                                <div className="flex gap-3">
                                    {edu.tags.map(tag => (
                                        <span key={tag} className="text-[9px] font-mono text-slate-300 border border-slate-100 px-2 py-0.5 rounded">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Interests --- */}
                <section className="border-t border-slate-50 pt-20">
                    <h2 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
                        <Heart size={14} /> 03_Life_Interface
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {interests.map((item, i) => (
                            <div key={i} className="group">
                                <div className="flex items-center gap-2 text-slate-900 font-bold mb-2 transition-transform group-hover:translate-x-1">
                                    {item.icon} <span className="text-sm tracking-tight">{item.title}</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="mt-32 text-center">
                    <div className="inline-block px-6 py-2 border border-slate-100 rounded-full font-mono text-[10px] text-slate-300 uppercase tracking-widest">
                        End_of_Transmission
                    </div>
                </footer>
            </motion.div>
        </div>
    );
};

const ActivityIcon = () => (
    <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
    </span>
);

export default About;