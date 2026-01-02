// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Search, Command } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent py-6'
        }`}>
            <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
                {/* Logo: 模拟路径风格 */}
                <Link to="/" className="flex items-center gap-2 group">
                    <Terminal size={16} className="text-indigo-600 group-hover:rotate-12 transition-transform" />
                    <span className="font-mono text-sm font-bold tracking-tighter text-slate-800">
                        ~/hanerson<span className="text-indigo-600">_</span>hao
                    </span>
                </Link>

                {/* 桌面端导航: 像 IDE 菜单一样简洁 */}
                <div className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-slate-400">
                    <Link
                        to="/"
                        className={`hover:text-indigo-600 transition-colors ${location.pathname === '/' ? 'text-slate-900 font-bold' : ''}`}
                    >
                        Index
                    </Link>
                    <Link
                        to="/about"
                        className={`hover:text-indigo-600 transition-colors ${location.pathname === '/about' ? 'text-slate-900 font-bold' : ''}`}
                    >
                        About
                    </Link>

                    {/* 快捷键提示: 增加极客感 */}
                    <div className="hidden md:flex items-center gap-2 border border-slate-100 px-2 py-1 rounded bg-slate-50/50">
                        <Search size={12} />
                        <span className="flex items-center text-[9px] text-slate-300">
                            <Command size={8} className="mr-0.5" /> K
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;