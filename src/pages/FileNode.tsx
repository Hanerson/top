import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { Hash, Folder, ChevronRight } from 'lucide-react';

interface FileNodeProps {
    post: Post;
    level: number; // 0, 1, 2
}

const FileNode: React.FC<FileNodeProps> = ({ post, level }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = post.type === 'folder';

    // 基础缩进：每一层增加 24px
    const paddingLeft = `${level * 24}px`;

    if (!isFolder) {
        // --- 文件渲染逻辑 (保持你原有的 Home 列表样式) ---
        return (
            <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="group relative py-4 hover:bg-slate-50/50 transition-colors"
                style={{ paddingLeft: `calc(${paddingLeft} + 24px)` }} // 补偿圆点位置
            >
                {/* 时间轴小圆点 - 仅在第一层显示，或者根据需要调整 */}
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
                {post.excerpt && (
                    <p className="mt-1 text-sm text-slate-400 line-clamp-1 font-light leading-relaxed">
                        {post.excerpt}
                    </p>
                )}
            </motion.div>
        );
    }

    // --- 文件夹渲染逻辑 ---
    return (
        <div className="w-full">
            <motion.div
                onClick={() => setIsOpen(!isOpen)}
                className="group relative py-4 flex items-center cursor-pointer border-b border-slate-50 hover:bg-slate-50/80 transition-all"
                style={{ paddingLeft: `calc(${paddingLeft} + 12px)` }}
            >
                {/* 文件夹小圆点改为 Folder 图标 */}
                <div className="absolute left-[-4.5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-100 group-hover:bg-indigo-500 transition-colors border-2 border-white" />

                <div className={`mr-2 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                    <ChevronRight size={14} className="text-slate-300" />
                </div>

                <Folder size={16} className={`mr-3 ${isOpen ? 'text-indigo-500 fill-indigo-50' : 'text-slate-400'}`} />

                <h3 className={`text-base font-bold transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-600'}`}>
                    {post.title}
                </h3>

                <span className="ml-3 font-mono text-[9px] text-slate-300 uppercase tracking-widest">
                    {post.children?.length || 0} ITEMS
                </span>
            </motion.div>

            <AnimatePresence>
                {isOpen && post.children && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden relative border-l border-slate-50 ml-[-1px]"
                    >
                        {post.children.map(child => (
                            <FileNode key={child.id} post={child} level={level + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FileNode;