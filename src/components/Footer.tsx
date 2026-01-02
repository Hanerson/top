// src/components/Footer.tsx
import React from 'react';
import { Github, Cpu, Activity } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-slate-50 pt-16 pb-12 mt-auto px-6">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                    {/* 左侧：个人标识与技术栈 */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-800 uppercase tracking-tighter">
                            <Activity size={14} className="text-green-500" />
                            <span>System Status: Online</span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono leading-relaxed max-w-xs">
                            Built with React 18, Vite, and Tailwind CSS.
                            Deployed on Vercel.
                        </p>
                    </div>

                    {/* 右侧：社交链接 */}
                    <div className="flex md:justify-end items-start gap-8">
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-[10px] text-slate-300 uppercase tracking-widest">Connect</span>
                            <a
                                href="https://github.com/hanerson"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-600 transition-colors font-mono"
                            >
                                <Github size={14} /> github.com/hanerson
                            </a>
                        </div>
                    </div>
                </div>

                {/* 底部版权：等宽字体，像极了代码注释 */}
                <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="font-mono text-[10px] text-slate-300">
                        /** &copy; {new Date().getFullYear()} Hanerson. Powered by Reason. */
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-slate-300">
                        <span className="flex items-center gap-1"><Cpu size={10} /> v2.4.0-stable</span>
                        <span>LATENCY: 24ms</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;