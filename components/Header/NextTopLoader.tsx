'use client';

import Loader from 'nextjs-toploader';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import '../../style/style_css/nprogress.css'

export default function NextTopLoader() {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.configure({ showSpinner: false }); // Tắt loading hình tròn
        NProgress.done();
    }, [pathname]);

    return <Loader />
}