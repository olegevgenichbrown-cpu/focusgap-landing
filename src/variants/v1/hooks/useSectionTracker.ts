import { useEffect, useRef } from 'react';
import posthog from 'posthog-js';

export default function useSectionTracker<T extends HTMLElement>(sectionName: string) {
  const ref = useRef<T>(null);
  const entryTime = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sendExited = () => {
      if (entryTime.current) {
        const durationMs = Date.now() - entryTime.current;
        const durationSeconds = parseFloat((durationMs / 1000).toFixed(1));
        
        if (durationSeconds > 0.5) {
          posthog.capture('section_exited', { 
            section_name: sectionName, 
            duration_seconds: durationSeconds 
          }, { transport: 'sendBeacon' });
        }
        entryTime.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendExited();
      } else if (document.visibilityState === 'visible' && el && el.getBoundingClientRect().top < window.innerHeight && el.getBoundingClientRect().bottom > 0) {
        // Re-enter timing if we're visible and section is in view
        entryTime.current = Date.now();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!entryTime.current) {
              entryTime.current = Date.now();
              posthog.capture('section_entered', { section_name: sectionName });
            }
          } else {
            sendExited();
          }
        });
      },
      { threshold: 0.1 } // Lower threshold for better tracking in high sections
    );

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', sendExited);
    observer.observe(el);

    return () => {
      sendExited();
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', sendExited);
      observer.disconnect();
    };
  }, [sectionName]);

  return ref;
}
