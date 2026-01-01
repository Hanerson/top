import React from 'react';
import { Terminal, Github } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-900 p-1.5 rounded-lg text-white">
                            <Terminal size={18} />
                        </div>
                        <span className="font-bold text-lg text-gray-900">Hanerson HAO</span>
                    </div>
                    <div className="flex gap-6 text-gray-400">
                        <a href="https://github.com/hanerson" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors"><Github size={20}/></a>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-400 border-t border-gray-50 pt-8">
                    &copy; {new Date().getFullYear()} Hanerson. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;