import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      
      const tryScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          const globalLenis = (window as any).lenis;
          if (globalLenis) {
            globalLenis.scrollTo(element, { offset: -96, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };

      // Try scrolling at multiple intervals to handle page mount latency and lazy-loading layout shifts
      const t1 = setTimeout(tryScroll, 100);
      const t2 = setTimeout(tryScroll, 300);
      const t3 = setTimeout(tryScroll, 600);
      const t4 = setTimeout(tryScroll, 1000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    } else {
      const globalLenis = (window as any).lenis;
      if (globalLenis) {
        globalLenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);

  return null;
}
