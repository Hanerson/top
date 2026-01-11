import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data';
import { Post, CATEGORY_CONFIG, MainCategory } from '../types'; // 确保导入了类型
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Hash, HardDrive, Menu, X, Command, LayoutGrid, Clock } from 'lucide-react';
import FileNode from './FileNode';

const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 预计算分类选项：Everything + 三大核心分类 + 归档
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
            {/* 品牌标识 */}
            <div className="p-6 border-b border-slate-50">
                <Link to="/" className="flex items-center gap-2 group mb-6">
                    <Terminal size={18} className="text-indigo-600 group-hover:rotate-12 transition-transform" />
                    <span className="font-mono text-sm font-bold tracking-tighter text-slate-800">
                        ~/hanerson<span className="text-indigo-600">_</span>hao
                    </span>
                </Link>

                <div className="flex items-center gap-2 text-indigo-400 mb-1">
                    <LayoutGrid size={14} />
                    <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase">Archive_Unit</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900">数字档案库</h1>
            </div>

            {/* 功能导航 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="relative group">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="快速搜索..."
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
                    {categoryOptions.map(cat => {
                        // 修正：根据你的 types.ts，Key 就是 Label，不再访问不存在的 .label 属性
                        let labelText = cat;
                        if (cat === "All") labelText = "所有资源";
                        if (cat === "Archive") labelText = "归档卷宗";

                        // 获取图标：只有三大分类有图标
                        const icon = CATEGORY_CONFIG[cat as MainCategory]?.icon || null;

                        return (
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
                                {icon ? (
                                    <span className="text-xs w-3 text-center opacity-80">{icon}</span>
                                ) : (
                                    <Hash size={12} className={selectedCategory === cat ? 'text-slate-400' : 'text-slate-300'} />
                                )}
                                {labelText}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-slate-50 bg-slate-50/30">
                <div className="flex flex-col gap-2 font-mono text-[10px] text-slate-400 uppercase tracking-tighter">
                    <Link to="/about" className="hover:text-indigo-600 transition-colors"> system_info</Link>
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

            {/* 侧边栏及主内容区布局保持不变... */}
            <aside className="hidden md:flex w-64 border-r border-slate-100 flex-col shrink-0">
                <SidebarContent />
            </aside>

            {/* 移动端菜单抽屉 */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden" />
                        <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl md:hidden">
                            <SidebarContent />
                            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-4 p-2 text-slate-400">
                                <X size={20} />
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#fafafa]/40">
                <header className="h-16 border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0 bg-white/80 backdrop-blur-md z-30">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 hover:bg-slate-100 rounded-lg md:hidden">
                            <Menu size={20} className="text-slate-600" />
                        </button>

                        <Link to="/" className="md:hidden flex items-center gap-2">
                            <Terminal size={14} className="text-indigo-600" />
                            <span className="font-mono text-xs font-bold tracking-tighter text-slate-800 uppercase">
                                hanerson<span className="text-indigo-600">_</span>hao
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-slate-400">
                            <HardDrive size={12} className="opacity-40" />
                            <span className="uppercase tracking-widest opacity-60">Root</span>
                            <span className="opacity-20">/</span>
                            <span className="text-indigo-600 font-bold bg-indigo-50/50 px-2 py-0.5 rounded border border-indigo-100/50">
                                {selectedCategory.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-100 shadow-sm">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                            </span>
                            SYS_ACTIVE // {displayPosts.length}_NODES
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-5xl mx-auto px-4 md:px-12 py-10">
                        <AnimatePresence mode='popLayout'>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
                                {displayPosts.length > 0 ? (
                                    <div className="divide-y divide-slate-50">
                                        {displayPosts.map((post) => (
                                            <FileNode key={post.id} post={post} level={0} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-32 flex flex-col items-center justify-center font-mono">
                                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                                            <Search size={20} />
                                        </div>
                                        <div className="text-[10px] text-slate-400 tracking-[0.2em] uppercase">No_Records_Found</div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <footer className="max-w-5xl mx-auto px-12 pb-16">
                        <div className="border-t border-slate-100 pt-8 flex justify-between items-center opacity-40 grayscale">
                            <div className="font-mono text-[8px] tracking-[0.4em] uppercase">Binary_Archive_Kernel_v1.0.4</div>
                            <div className="flex gap-1.5">
                                {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-slate-300 rounded-full" />)}
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default Home;