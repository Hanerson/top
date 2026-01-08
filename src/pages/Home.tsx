import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data';
import { Post } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Terminal, Hash, Radio, Folder, ChevronRight
} from 'lucide-react';

// --- 子组件：递归文件节点 ---
const FileNode: React.FC<{ post: Post; level: number }> = ({ post, level }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = post.type === 'folder';
    const paddingLeft = level * 20;

    if (!isFolder) {
        return (
            <motion.div
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                className="group relative py-4 hover:bg-slate-50/50 transition-colors"
                style={{ paddingLeft: level > 0 ? `${paddingLeft + 24}px` : '24px' }}
            >
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
                    </div>
                </Link>
                <p className="mt-1 text-sm text-slate-400 line-clamp-1 font-light leading-relaxed">{post.excerpt}</p>
            </motion.div>
        );
    }

    return (
        <div className="w-full mb-2">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative py-5 flex items-center cursor-pointer border border-transparent hover:border-slate-100 hover:bg-slate-50/50 rounded-xl transition-all ${isOpen ? 'bg-slate-50/30 border-slate-100' : ''}`}
                style={{ paddingLeft: `${paddingLeft + 16}px`, paddingRight: '16px' }}
            >
                <div className={`mr-4 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isOpen ? 'bg-white shadow-sm text-indigo-500' : 'bg-slate-50 text-slate-400'}`}>
                    <Folder size={20} className={isOpen ? 'fill-indigo-50' : ''} />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-base font-bold text-slate-800 tracking-tight">{post.title}</h3>
                    <div className="flex items-center gap-3 mt-0.5">
                        <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">{post.children?.length || 0} FILES</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span className="font-mono text-[9px] text-slate-400">{post.date}</span>
                    </div>
                </div>
                <div className={`ml-auto transition-transform duration-300 ${isOpen ? 'rotate-90 text-indigo-500' : 'text-slate-300'}`}>
                    <ChevronRight size={18} />
                </div>
            </div>
            <AnimatePresence>
                {isOpen && post.children && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-l border-slate-100 ml-6"
                        style={{ marginLeft: `${paddingLeft + 35}px` }}
                    >
                        {post.children.map(child => <FileNode key={child.id} post={child} level={level + 1} />)}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- 主页面 ---
const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // 筛选标签：All, ARCHIVE, 以及其他文章分类
    const categories = useMemo(() => {
        const cats = new Set<string>();
        posts.forEach(p => { if (p.type !== 'folder') cats.add(p.category); });
        return ["All", "ARCHIVE", ...Array.from(cats)];
    }, []);

    const displayPosts = useMemo(() => {
        // 搜索模式：打平所有层级搜索文件
        if (searchQuery.trim() !== "") {
            const flattened: Post[] = [];
            const flatten = (items: Post[]) => {
                items.forEach(p => {
                    if (p.type !== 'folder' && p.title.toLowerCase().includes(searchQuery.toLowerCase())) flattened.push(p);
                    if (p.children) flatten(p.children);
                });
            };
            flatten(posts);
            return flattened.sort((a, b) => b.date.localeCompare(a.date));
        }

        // 归档模式：只显示文件夹
        if (selectedCategory === "ARCHIVE") {
            return posts.filter(p => p.type === 'folder').sort((a, b) => b.date.localeCompare(a.date));
        }

        // 默认/分类模式：只显示普通文章
        return posts.filter(p => {
            const isNotFolder = p.type !== 'folder';
            const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
            return isNotFolder && matchesCat;
        }).sort((a, b) => b.date.localeCompare(a.date));
    }, [selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
            <header className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-indigo-600 font-mono text-xs mb-4">
                    <Terminal size={14} />
                    <span>root@hanerson:~# list --{selectedCategory.toLowerCase()}</span>
                </motion.div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">“先做起来！”</h1>
            </header>

            <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between h-14">
                    <div className="flex gap-6 overflow-x-auto no-scrollbar">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)}
                                    className={`text-xs font-mono transition-all uppercase whitespace-nowrap ${selectedCategory === cat ? 'text-indigo-600 font-bold border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative flex items-center group">
                        <Search size={14} className="absolute left-0 text-slate-300 group-focus-within:text-indigo-500" />
                        <input type="text" placeholder="SEARCH..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                               className="pl-5 bg-transparent outline-none text-xs font-mono w-32 focus:w-48 transition-all" />
                    </div>
                </div>
            </nav>

            <main className="px-6 py-12 max-w-4xl mx-auto min-h-[40vh]">
                <div className="flex flex-col border-l border-slate-50">
                    <AnimatePresence mode='popLayout'>
                        {displayPosts.map((post) => (
                            <FileNode key={post.id} post={post} level={0} />
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            {selectedCategory === "All" && searchQuery === "" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto mb-16 px-6">
                    <Link to="/2025Conclusion" className="group block p-8 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50/50 transition-all duration-500 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                                    <Radio size={12} className="text-indigo-400 animate-pulse" /> STATUS: PINNED
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">2025 年度总结：视野、屏蔽力与自我重构</h3>
                                <p className="text-sm text-slate-500 font-light">关于过去 365 天的系统审计与未来展望。</p>
                            </div>
                            <div className="text-[24px] font-black text-slate-100 font-mono group-hover:text-indigo-50 transition-colors">2025</div>
                        </div>
                    </Link>
                </motion.div>
            )}
        </div>
    );
};

export default Home;