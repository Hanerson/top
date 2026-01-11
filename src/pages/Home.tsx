import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data';
import { Post, CATEGORY_CONFIG } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Hash, HardDrive, Menu, X, Command, LayoutGrid, Clock } from 'lucide-react';
import FileNode from './FileNode';

const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const categoryOptions = useMemo(() => ["All", ...Object.keys(CATEGORY_CONFIG), "Archive"], []);

    const displayPosts = useMemo(() => {
        const getFlattened = (items: Post[]): Post[] => {
            let res: Post[] = [];
            items.forEach(p => {
                if (p.type !== 'folder') res.push(p);
                if (p.children) res = [...res, ...getFlattened(p.children)];
            });
            return res;
        };

        if (searchQuery.trim() !== "") {
            return getFlattened(posts).filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            ).sort((a, b) => b.date.localeCompare(a.date));
        }

        if (selectedCategory === "Archive") return posts.filter(p => p.type === 'folder');
        if (selectedCategory !== "All") return posts.filter(p => p.category === selectedCategory);

        return posts;
    }, [selectedCategory, searchQuery]);

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-white select-none">
            {/* 品牌区域 (原 Navbar 整合) */}
            <div className="p-6 border-b border-slate-50">
                <Link to="/" className="flex items-center gap-2 group mb-6">
                    <Terminal size={18} className="text-indigo-600 group-hover:rotate-12 transition-transform" />
                    <span className="font-mono text-sm font-bold tracking-tighter text-slate-800">
                        ~/hanerson<span className="text-indigo-600">_</span>hao
                    </span>
                </Link>

                <div className="flex items-center gap-2 text-indigo-400 mb-1">
                    <LayoutGrid size={14} />
                    <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase">Digital_Archive</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900">数字档案库</h1>
            </div>

            {/* 导航与搜索 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                <div className="relative group">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="快速索引..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 border border-slate-200 px-1 rounded bg-white text-[8px] text-slate-300 font-mono">
                        <Command size={8} />K
                    </div>
                </div>

                <nav className="space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3 px-3">Directories</div>
                    {categoryOptions.map(cat => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all
                                ${selectedCategory === cat
                                ? 'bg-slate-900 text-white shadow-md font-bold'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            <Hash size={12} className={selectedCategory === cat ? 'text-slate-400' : 'text-slate-300'} />
                            {cat === "All" ? "Everything" : (CATEGORY_CONFIG[cat]?.label || cat)}
                        </button>
                    ))}
                </nav>
            </div>

            {/* 底部功能链接 */}
            <div className="p-4 border-t border-slate-50 bg-slate-50/30">
                <div className="flex flex-col gap-2 font-mono text-[10px] text-slate-400 uppercase tracking-tighter">
                    <Link to="/about" className="hover:text-indigo-600 transition-colors"> system_about</Link>
                    <div className="flex items-center gap-2 opacity-50">
                        <Clock size={10} />
                        <span>UPDATED: 2026.01.10</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-white text-slate-900 overflow-hidden relative">

            {/* --- 桌面端侧边栏 --- */}
            <aside className="hidden md:flex w-64 border-r border-slate-100 flex-col shrink-0 z-20">
                <SidebarContent />
            </aside>

            {/* --- 移动端抽屉 (Drawer) --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl md:hidden"
                        >
                            <SidebarContent />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-6 right-4 p-2 text-slate-400 hover:text-slate-900"
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* --- 主体内容区 --- */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-[#fafafa]/30">
                {/* 常驻顶栏 (解决无头苍蝇感) */}
                <header className="h-16 border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0 bg-white/80 backdrop-blur-md z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 -ml-2 hover:bg-slate-100 rounded-lg md:hidden text-slate-600 transition-colors"
                        >
                            <Menu size={20} />
                        </button>

                        {/* 移动端 Logo 锚点 */}
                        <Link to="/" className="md:hidden flex items-center gap-2">
                            <Terminal size={14} className="text-indigo-600" />
                            <span className="font-mono text-xs font-bold tracking-tighter text-slate-800 uppercase">
                                hanerson<span className="text-indigo-600">_</span>hao
                            </span>
                        </Link>

                        {/* 桌面端路径面包屑 */}
                        <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-slate-400">
                            <HardDrive size={12} className="opacity-50" />
                            <span className="hover:text-slate-600 cursor-default transition-colors uppercase">Archive</span>
                            <span className="opacity-20">/</span>
                            <span className="text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">{selectedCategory.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] text-slate-300 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                            </span>
                            SYS_STABLE // {displayPosts.length}_RECORDS
                        </div>
                    </div>
                </header>

                {/* 滚动列表 */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto px-4 md:px-12 py-10">
                        <AnimatePresence mode='popLayout'>
                            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                                {displayPosts.length > 0 ? (
                                    <div className="divide-y divide-slate-50">
                                        {displayPosts.map((post) => (
                                            <FileNode key={post.id} post={post} level={0} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-32 flex flex-col items-center justify-center font-mono">
                                        <div className="text-slate-200 mb-4 scale-150"><Search size={40} /></div>
                                        <div className="text-[10px] text-slate-400 tracking-[0.2em] uppercase">No_Matches_Found</div>
                                        <button
                                            onClick={() => {setSelectedCategory("All"); setSearchQuery("");}}
                                            className="mt-6 text-[10px] text-indigo-500 hover:underline underline-offset-4"
                                        >
                                            RESET_DATABASE_SEARCH
                                        </button>
                                    </div>
                                )}
                            </div>
                        </AnimatePresence>
                    </div>

                    {/* 底部装饰 */}
                    <footer className="max-w-4xl mx-auto px-12 pb-12">
                        <div className="border-t border-slate-100 pt-8 flex justify-between items-center opacity-30 grayscale">
                            <div className="font-mono text-[8px] tracking-[0.3em] uppercase">Binary_Archive_System</div>
                            <div className="flex gap-1">
                                {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-slate-400 rounded-full" />)}
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default Home;