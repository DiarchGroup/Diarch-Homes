import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll to top on route change (and to hash anchors when present)
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}
