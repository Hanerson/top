import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import About from './pages/About';

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased font-sans selection:bg-indigo-100 selection:text-indigo-700">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/post/:id" element={<BlogPost />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;