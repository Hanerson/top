import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion } from 'framer-motion';

// 关键：设置 PDF Worker。使用 CDN 版本以避免 Vite 构建时的各种复杂报错
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// 引入必要的样式（必须！）
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PDFViewerProps {
    fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <div className="flex flex-col items-center w-full bg-gray-100/50 rounded-2xl border border-gray-200 p-4 md:p-8 shadow-inner">
            {/* 控制栏 */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-24 z-10 flex flex-wrap items-center justify-center gap-4 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-gray-100 mb-8"
            >
                <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
                    <button
                        onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                        disabled={pageNumber <= 1}
                        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-medium text-gray-700 font-mono">
            {pageNumber} / {numPages || '--'}
          </span>
                    <button
                        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || 1))}
                        disabled={pageNumber >= (numPages || 1)}
                        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => setScale(s => Math.max(s - 0.2, 0.6))} className="p-2 hover:bg-gray-100 rounded-full">
                        <ZoomOut size={20} />
                    </button>
                    <span className="text-sm font-medium text-gray-500 min-w-[3rem] text-center">
            {Math.round(scale * 100)}%
          </span>
                    <button onClick={() => setScale(s => Math.min(s + 0.2, 2.0))} className="p-2 hover:bg-gray-100 rounded-full">
                        <ZoomIn size={20} />
                    </button>
                </div>
            </motion.div>

            {/* PDF 文档显示区 */}
            <div className="relative w-full flex justify-center min-h-[600px]">
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="flex items-center justify-center h-96">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    }
                    error={
                        <div className="text-red-500 p-10 text-center">PDF 加载失败，请检查路径或文件完整性。</div>
                    }
                >
                    <motion.div
                        key={`page-${pageNumber}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="shadow-2xl rounded-lg overflow-hidden"
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderAnnotationLayer={true}
                            renderTextLayer={true}
                            className="bg-white"
                        />
                    </motion.div>
                </Document>
            </div>
        </div>
    );
};

export default PDFViewer;