// src/pages/Home.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import {Search, Terminal, Hash, FileText, ArrowUpRight, Radio} from 'lucide-react';

const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const categories = useMemo(() => ["All", ...new Set(posts.map(p => p.category))], []);

    const filteredPosts = useMemo(() => {
        return posts
            .filter(post => {
                const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
                const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            })
            .sort((a, b) => b.date.localeCompare(a.date));
    }, [selectedCategory, searchQuery]);

    const FeaturedReport = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto mb-16 px-6"
        >
            {/* 外层容器：使用极浅的背景色与细边框 */}
            <Link to="/2025Conclusion" className="group relative block p-8 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50/50 hover:border-indigo-100 transition-all duration-500">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                    <div className="space-y-4">
                        {/* 顶部标签：模拟 IDE 的 Tab 栏样式 */}
                        <div className="flex items-center gap-3 font-mono">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 rounded text-[10px] text-slate-400 border border-slate-100">
                                <Radio size={10} className="text-indigo-400 animate-pulse" />
                                <span>STATUS: PINNED</span>
                            </div>
                            <span className="text-[10px] text-slate-300 tracking-[0.2em]">LOG_FILE_2025</span>
                        </div>

                        {/* 标题：保留大字号但移除重色 */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight flex items-center gap-3">
                                2025 年度总结：视野、屏蔽力与自我重构
                                <ArrowUpRight size={18} className="text-slate-200 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"></ArrowUpRight>
                            </h3>
                        </div>

                        {/* 简介：使用淡色 */}
                        <p className="text-sm text-slate-500 leading-relaxed max-w-2xl font-light">
                            关于过去 365 天的系统审计。涉及信息边界的探索、时间分配的 Debug 以及对 2026 年的可持续性展望。
                        </p>
                    </div>

                    {/* 右侧：装饰性的日期块 */}
                    <div className="flex flex-col items-start md:items-end justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-10">
                        <div className="text-[24px] font-black text-slate-100 font-mono leading-none mb-1 group-hover:text-indigo-50 transition-colors">
                            2025
                        </div>
                        <div className="text-[10px] font-mono text-slate-300 tracking-tighter uppercase whitespace-nowrap">
                            Year_End_Review
                        </div>
                    </div>
                </div>

                {/* 细节：角落的小装饰，体现精致感 */}
                <div className="absolute top-4 right-4 text-slate-50 pointer-events-none group-hover:text-indigo-50 transition-colors">
                    <FileText size={40} />
                </div>
            </Link>

            {/* 分割线：模拟主页列表的逻辑 */}
            <div className="mt-16 flex items-center gap-4">
                <div className="h-[1px] flex-grow bg-slate-50"></div>
                <span className="font-mono text-[9px] text-slate-200 uppercase tracking-widest text-center">Recent_Logs</span>
                <div className="h-[1px] flex-grow bg-slate-50"></div>
            </div>
        </motion.div>
    );


    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
            {/* 极简 Hero 区 */}
            <header className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-indigo-600 font-mono text-xs mb-4 tracking-tighter"
                >
                    <Terminal size={14} />
                    <span>root@hanerson:~# list --all</span>
                </motion.div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">数字美学与逻辑实践</h1>
                <p className="text-slate-500 font-medium italic">“实践是检验真理的唯一标准。”</p>
            </header>
            <FeaturedReport/>

            {/* 交互工具栏 */}
            <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between h-14">
                    <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-xs font-mono transition-all ${
                                    selectedCategory === cat ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <div className="relative flex items-center group">
                        <Search size={14} className="absolute left-0 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH_POSTS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-5 bg-transparent outline-none text-xs font-mono w-32 md:w-48 focus:w-64 transition-all border-b border-transparent focus:border-indigo-100"
                        />
                    </div>
                </div>
            </nav>

            {/* 索引列表 */}
            <main className="px-6 py-12 max-w-4xl mx-auto">
                <div className="flex flex-col border-l border-slate-50">
                    <AnimatePresence mode='popLayout'>
                        {filteredPosts.map((post, idx) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                className="group relative pl-6 py-4 hover:bg-slate-50/50 transition-colors"
                            >
                                {/* 时间轴小圆点 */}
                                <div className="absolute left-[-4.5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors border-2 border-white" />

                                <Link to={`/post/${post.id}`} className="flex flex-col md:flex-row md:items-baseline gap-4">
                                    <span className="font-mono text-[10px] text-slate-400 shrink-0 tracking-tighter">
                                        {post.date.replace(/-/g, '.')}
                                    </span>
                                    <h2 className="text-base font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                        {post.title}
                                    </h2>
                                    <div className="hidden md:flex items-center gap-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                                            <Hash size={10} />{post.category}
                                        </span>
                                        <span className="text-[10px] font-mono text-slate-300 uppercase">{post.readTime}</span>
                                    </div>
                                </Link>
                                <p className="mt-1 text-sm text-slate-400 line-clamp-1 font-light leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Home;