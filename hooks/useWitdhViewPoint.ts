import { useState, useEffect } from "react";

const useViewportWidth = (): number => {
    const [viewportWidth, setViewportWidth] = useState<number>(0);

    const getViewportWidth = (): number => {
        if (typeof window !== "undefined") {
            return window.innerWidth;
        }
        return 0; // Return 0 if window is not defined (e.g., during SSR)
    };

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(getViewportWidth());
        };
        setViewportWidth(getViewportWidth());
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return viewportWidth;
};

export default useViewportWidth;
