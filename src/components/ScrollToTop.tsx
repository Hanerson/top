// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // 立即跳转到顶部
        window.scrollTo(0, 0);

        // 如果想要更平滑一点的理性过渡，可以使用：
        // window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
};

export default ScrollToTop;