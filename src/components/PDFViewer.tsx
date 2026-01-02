// src/components/PDFViewer.tsx
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// 修正后的 CSS 引用路径
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// 建议使用固定的 CDN 地址，确保 Worker 加载稳定
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState<number | null>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col items-center bg-slate-50/50 rounded-2xl p-2 md:p-8">
            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="font-mono text-[10px] text-slate-400 py-20 flex flex-col items-center gap-2">
                        <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>SYNCING_DOCUMENT_STREAM...</span>
                    </div>
                }
                error={
                    <div className="font-mono text-xs text-red-400 py-10">
                        FAILED_TO_LOAD_PDF_DATA
                    </div>
                }
                className="flex flex-col gap-6 w-full items-center"
            >
                {/* 连续渲染逻辑 */}
                {Array.from(new Array(numPages), (_, index) => (
                    <div
                        key={`page_${index + 1}`}
                        className="w-full flex flex-col items-center group"
                    >
                        <div className="shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 rounded-sm overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
                            <Page
                                pageNumber={index + 1}
                                // 自动适配屏幕宽度，减去 padding 空间
                                width={Math.min(window.innerWidth - 64, 960)}
                                renderAnnotationLayer={true}
                                renderTextLayer={true}
                            />
                        </div>
                        {/* 页面索引指示器 */}
                        <div className="mt-4 font-mono text-[9px] text-slate-300 tracking-[0.2em] group-hover:text-indigo-400 transition-colors">
                            SECTION_DEPT_{String(index + 1).padStart(2, '0')}
                        </div>
                    </div>
                ))}
            </Document>
        </div>
    );
};

export default PDFViewer;