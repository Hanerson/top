import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Menu, X, Search } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm' : 'bg-transparent py-5'
        }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                        <Terminal size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-800">Hanerson HAO</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
                    <Link to="/" className="hover:text-indigo-600 transition-colors">首页</Link>
                    <Link to="/about" className="hover:text-indigo-600 transition-colors">关于我</Link>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Search size={20} />
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Logic... (可按需添加) */}
        </nav>
    );
};

export default Navbar;