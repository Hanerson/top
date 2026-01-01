import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data';
import type {Post} from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, ChevronDown, Sparkles, Search, X, Tag } from 'lucide-react';

// --- 动画配置 ---
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const Hero: React.FC = () => (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center px-4 overflow-hidden bg-white">
        {/* 背景纹理 */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-400 opacity-20 blur-[100px]"></div>
            <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-purple-400 opacity-20 blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 text-gray-600 text-sm font-semibold mb-6 shadow-sm cursor-default"
            >
                <Sparkles size={14} className="text-amber-500" />
                <span>Hanerson's Digital Garden</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8 select-none"
            >
                构建
                <span className="relative inline-block mx-2 md:mx-4">
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-30"></span>
          <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-300% animate-gradient">
            数字美学
          </span>
        </span>
                <br className="hidden md:block" />
                <span className="md:text-7xl lg:text-8xl text-gray-300">与极致体验</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
            >
                这里是代码与灵感的交汇点。<br className="hidden sm:block"/>
                记录关于 <span className="text-gray-800 font-bold">前端架构</span>、<span className="text-gray-800 font-bold">算法设计</span> 与 <span className="text-gray-800 font-bold">生活思考</span> 的一切。
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
            >
                <Link to="/about" className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group">
                    了解我更多 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
                <button onClick={() => document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all hover:scale-105 flex items-center justify-center gap-2">
                    浏览文章
                </button>
            </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"
        >
            <ChevronDown size={32} />
        </motion.div>
    </section>
);

const Home: React.FC = () => {
    // 状态管理
    const [selectedCategory, setSelectedCategory] = useState<string>("全部");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // 1. 提取所有唯一分类
    const categories = useMemo(() => {
        const allCats = posts.map(post => post.category);
        return ["全部", ...new Set(allCats)];
    }, []);

    // 2. 过滤逻辑 (标签 + 搜索词) 并按日期排序（最新的在前）
    const filteredPosts = useMemo(() => {
        // 先过滤
        const filtered = posts.filter(post => {
            const matchesCategory = selectedCategory === "全部" || post.category === selectedCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // 然后排序 - 按日期字符串降序排列（最新的在前）
        // 假设日期格式为 YYYY-MM-DD，如果是其他格式需要调整排序逻辑
        return filtered.sort((a, b) => {
            // 如果有专门的时间戳字段，优先使用：
            // return new Date(b.timestamp) - new Date(a.timestamp);

            // 按日期字符串排序
            return b.date.localeCompare(a.date);
        });
    }, [selectedCategory, searchQuery]);

    return (
        <>
            <Hero />

            <section id="posts-section" className="w-full bg-gray-50 border-t border-gray-200 px-6 py-20 min-h-screen">
                <div className="max-w-7xl mx-auto">

                    {/* --- 筛选与搜索区域 --- */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">探索文章</h2>
                            <p className="text-gray-500">
                                共找到 {filteredPosts.length} 篇关于
                                <span className="text-indigo-600 font-bold mx-1">{selectedCategory}</span>
                                的内容
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* 搜索框 */}
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400 group-focus-within:text-indigo-600 transition-colors"/>
                                </div>
                                <input
                                    type="text"
                                    placeholder="搜索标题或内容..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full sm:w-64 transition-all shadow-sm"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 分类标签栏 (水平滚动) */}
                    <div className="mb-12 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                        <div className="flex gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`
                    px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border
                    ${selectedCategory === category
                                        ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20 scale-105'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'}
                  `}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- 文章列表 Grid --- */}
                    <motion.div
                        layout // 开启布局动画，卡片会自动平滑移动
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map((post: Post) => (
                                    <motion.article
                                        layout // 卡片位置变化时平滑过渡
                                        key={post.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="group flex flex-col h-full"
                                    >
                                        <Link to={`/post/${post.id}`} className="block mb-6 overflow-hidden rounded-[1.5rem] shadow-sm border border-gray-100 group-hover:shadow-xl group-hover:shadow-indigo-500/10 transition-all duration-500">
                                            <div className="relative h-60 w-full overflow-hidden">
                                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"/>
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

                                                <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1">
                            <Tag size={10} className="text-indigo-600"/> {post.category}
                          </span>
                                                    {post.type === 'pdf' && (
                                                        <span className="bg-rose-500/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1">
                              <FileText size={10} /> PDF
                            </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>

                                        <div className="flex-1 flex flex-col">
                                            <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">
                                                <span>{post.date}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                <span>{post.readTime}</span>
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                                                <Link to={`/post/${post.id}`}>
                                                    {highlightText(post.title, searchQuery)}
                                                </Link>
                                            </h3>

                                            <p className="text-gray-500 text-base leading-relaxed line-clamp-2 mb-6 flex-1">
                                                {post.excerpt}
                                            </p>

                                            <Link to={`/post/${post.id}`} className="inline-flex items-center text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                <span className="border-b-2 border-gray-200 group-hover:border-indigo-600 pb-0.5 transition-colors">阅读全文</span>
                                            </Link>
                                        </div>
                                    </motion.article>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="col-span-full text-center py-20"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                        <Search size={32} className="text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">没有找到相关文章</h3>
                                    <p className="text-gray-500">尝试切换分类或清除搜索关键词</p>
                                    <button
                                        onClick={() => {setSelectedCategory("全部"); setSearchQuery("")}}
                                        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
                                    >
                                        重置筛选
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </section>
        </>
    );
};

// --- 辅助函数：高亮搜索词 ---
const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-yellow-200 text-gray-900 px-0.5 rounded">{part}</span>
        ) : part
    );
};

export default Home;