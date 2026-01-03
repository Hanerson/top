import React from 'react';
import { motion } from 'framer-motion';
import {
    Calendar, Compass, Target,
    ArrowLeft, Hash, Clock, FileText,
    ChevronRight, Terminal, RefreshCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

const YearlyReport2025: React.FC = () => {
    return (
        <div className="min-h-screen bg-white pt-24 pb-32 px-6 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
            >
                {/* 返回与元数据 */}
                <nav className="mb-16">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-mono text-xs uppercase tracking-tighter mb-8">
                        <ArrowLeft size={12} /> <span>Back_to_Index</span>
                    </Link>

                    <div className="flex flex-col gap-4 border-l-2 border-indigo-600 pl-6">
                        <div className="flex items-center gap-2 font-mono text-[10px] text-indigo-500 uppercase tracking-[0.3em]">
                            <Terminal size={12} /> Annual_Retrospective_v1.0
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                            2025 年度总结：由外向内的视野重构
                        </h1>
                        <div className="flex flex-wrap gap-6 font-mono text-[10px] text-slate-400 uppercase">
                            <span className="flex items-center gap-1"><Calendar size={12}/> 2025.12.29</span>
                            <span className="flex items-center gap-1"><Clock size={12}/> 3,240 Words</span>
                            <span className="flex items-center gap-1"><Hash size={12}/> Self_Correction</span>
                        </div>
                    </div>
                </nav>

                {/* 正文内容区 */}
                <article className="prose prose-slate max-w-none">

                    {/* 引言 */}
                    <div className="text-slate-600 leading-relaxed mb-16 text-lg font-serif italic border-b border-slate-50 pb-12">
                        今天是2025年12月29号，也算是又再一次走到了一年的末尾，我向来是喜欢给自己的生活做一些小的记录的，那么2025的年度总结也算是一个比较重要的里程碑... 2025年，将会是我电子总结的开始。
                    </div>

                    {/* 关键词章节 */}
                    <section className="mb-20">
                        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-300 uppercase tracking-widest mb-6">
                            <Compass size={14} className="text-indigo-400" /> Chapter_01 / KEYWORD
                        </div>
                        <h2 className="text-2xl font-bold mb-8">2025年年度关键词——“视野”</h2>
                        <div className="space-y-6 text-slate-700 leading-8">
                            <p>2025 年，我学会了科学上网。最初的动机其实很简单：访问国外的大语言模型，以及更低延迟地使用 GitHub。然而，当我真正接触到外网之后，才发现内外网之间的差别远比我想象中巨大。刚开始接触国外的信息时，我就像一个刚刚出生的婴儿，周围的一切都充满新奇...</p>
                            <p>我学会了多问一些“为什么”。我开始主动去了解这个世界最前沿的技术与知识... 直到这一刻，我才真正理解了高中作文里反复出现、却长期显得空洞的那句话——“与世界同呼吸，共命运”。它不再是一句被反复引用的口号，而成为了一种与世界真实互动的状态。</p>

                            <blockquote className="border-l-4 border-slate-100 pl-6 italic text-slate-500 my-10">
                                “所谓屏蔽力，并不是一味封闭自身、拒绝外部的一切信息，那无异于躲进小楼的可悲懦夫，相反，它是一种过滤信息的能力，是在信息大爆炸时代行稳致远的关键素养。”
                            </blockquote>

                            <p>随着视野的扩展，我逐渐意识到，世界上的任何事物都有其存在的意义，也必然伴随着明确的目的... 真正重要的，不是表层的“宣传果实”，而是其生成的土壤、所依赖的养分，以及被推向公众视野的时机与环境。</p>
                            <p className="font-bold text-slate-900 underline decoration-indigo-200 underline-offset-8 mt-8">所谓视野，最为重要的是“不畏浮云遮望眼，自缘身在最高层”。</p>
                        </div>
                    </section>

                    {/* 事项章节 */}
                    <section className="mb-20">
                        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-300 uppercase tracking-widest mb-6">
                            <FileText size={14} className="text-indigo-400" /> Chapter_02 / LOGS
                        </div>
                        <h2 className="text-2xl font-bold mb-10">2025年 我都做了那些事？</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* 学习 */}
                            <div>
                                <h3 className="font-mono text-xs font-bold text-indigo-600 mb-6 flex items-center gap-2">
                                    <ChevronRight size={14}/> Academic_&_Tech
                                </h3>
                                <ul className="space-y-4 text-sm text-slate-600 list-none p-0">
                                    <li className="flex gap-3"><span className="text-indigo-200">•</span> 尝试使用GitHub Pages搭建了自己的信息展示页面：Hanerson.github.io</li>
                                    <li className="flex gap-3"><span className="text-indigo-200">•</span> 系统性学习 Vite + React + Tailwind/CSS 的前端架构</li>
                                    <li className="flex gap-3"><span className="text-indigo-200">•</span> 9月份开始坚持每天做至少一道LeetCode算法题</li>
                                    <li className="flex gap-3"><span className="text-indigo-200">•</span> 熟练掌握 Java 操作，自主使用 C 语言/SDL2 开发小游戏</li>
                                    <li className="flex gap-3"><span className="text-indigo-200">•</span> 做到把复习放在平时，减轻考试周压力</li>
                                </ul>
                            </div>
                            {/* 生活 */}
                            <div>
                                <h3 className="font-mono text-xs font-bold text-indigo-600 mb-6 flex items-center gap-2">
                                    <ChevronRight size={14}/> Lifestyle_&_Soul
                                </h3>
                                <ul className="space-y-4 text-sm text-slate-600 list-none p-0">
                                    <li className="flex gap-3"><span className="text-indigo-200">•</span> 成功减重 15~20 斤，达成减重目标，每周坚持跑步</li>
                                    <li className="flex gap-3"><span className="text-indigo-200">•</span> 存下小金库，帮父母各自换了新手机</li>
                                    <li className="flex gap-3"><span className="text-indigo-200">•</span> 去了西安见喜欢的人，她也来了南京，参加了不少志愿活动</li>
                                    <li className="flex gap-3"><span className="text-indigo-200">•</span> 养了小猫，看了JOJO六部曲，吃过玄武湖晚风里的美食</li>
                                    <li className="flex gap-3"><span className="text-indigo-200">•</span> 12月养成了良好作息，气色开始好转</li>
                                </ul>
                            </div>
                        </div>

                        {/* 反思感悟 */}
                        <div className="mt-12 p-8 bg-slate-50 rounded-2xl text-slate-600 text-sm leading-7 italic">
                            “一年很长，长到可以完成这么多事情；一年又很短... 我的 2025 年并非一帆风顺。我几乎隔一段时间就会经历严重的失眠... 但对我来说，这些反复出现的挫折，本身就是人生的训练过程。”
                        </div>
                    </section>

                    {/* 改进章节 */}
                    <section className="mb-20">
                        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-300 uppercase tracking-widest mb-6">
                            <RefreshCcw size={14} className="text-indigo-400" /> Chapter_03 / DEBUG
                        </div>
                        <h2 className="text-2xl font-bold mb-8">2025年 有哪些有待改进的点？</h2>
                        <div className="space-y-6 text-slate-700 leading-8">
                            <p>一份合格的年度报告，不应该变成一份片面的赞歌，自我革命的勇气必不可少。回顾 2025 年，我必须承认，这一年在时间投入上存在一定程度的失衡...</p>
                            <p>反观课内学习，真正用于系统、深入地消化专业核心知识的时间并不充足。扪心自问，有多少本该静下心来投入到课内学习的时段，最终被挪用去“打磨”和“粉饰”那些并非当前阶段最重要的小项目？</p>
                            <p>与此同时，休闲娱乐时间一度失衡。11 月及此前，手机每日亮屏时间基本维持在 8～10 小时... 娱乐至死不可原谅。未来需要更有意识地压缩无意义的屏幕时间，多走出室内，与自然建立更真实的连接。</p>
                        </div>
                    </section>

                    {/* 展望章节 */}
                    <section className="mb-32">
                        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-300 uppercase tracking-widest mb-6">
                            <Target size={14} className="text-indigo-400" /> Chapter_04 / PROSPECTS
                        </div>
                        <h2 className="text-2xl font-bold mb-8">最后——对2026年的展望</h2>
                        <div className="bg-white/5 text-black p-10 rounded-3xl space-y-6 leading-8 shadow-2xl shadow-indigo-100">
                            <p className="font-bold text-xl">亲爱的我自己，希望你能够记住你在2025年12月29日写下的这一篇自我总结。</p>
                            <p>2026 年，我希望它成为一个逐步收敛、持续深耕的年份。相比于做得更多，我更在意是否做得更好。</p>
                            <p>我希望 2026 年的关键词是“尊重时间”。尊重学习所需要的完整注意力，也尊重休息、运动与独处的价值... 我希望自己是一个“可持续运转”的人，而不是靠意志力硬撑的状态。</p>
                            <div className="pt-6 border-t border-white/20 font-mono text-sm tracking-widest text-indigo-100">
                                “行之不辍，未来可期”
                            </div>
                        </div>
                    </section>

                </article>
            </motion.div>
        </div>
    );
};

export default YearlyReport2025;