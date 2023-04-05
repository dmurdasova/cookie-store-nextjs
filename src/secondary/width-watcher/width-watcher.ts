import { useEffect, useState } from 'react';

export function useWidthWatcher(): number {
    // TODO: think more about how to set the initial value
    const [width, setWidth] = useState<number>(1000);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [width]);

    return width;
}
