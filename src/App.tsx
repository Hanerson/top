import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Conclusion2025 from './pages/2025Conclusion'
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
    return (
        <Router>
            <ScrollToTop/>
            <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased font-sans selection:bg-indigo-100 selection:text-indigo-700">
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/post/:id" element={<BlogPost />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/2025Conclusion" element={<Conclusion2025 />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;