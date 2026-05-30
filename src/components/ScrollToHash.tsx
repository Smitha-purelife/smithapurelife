import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const globalLenis = (window as any).lenis;
          if (globalLenis) {
            globalLenis.scrollTo(element, { offset: -96, duration: 1.5 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
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
