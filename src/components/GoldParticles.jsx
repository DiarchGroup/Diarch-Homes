import { useRef, useSyncExternalStore } from 'react';

const makeDots = (count) =>
  Array.from({ length: count }).map(() => ({
    left: Math.random() * 100,
    bottom: Math.random() * 30,
    size: 1.5 + Math.random() * 3,
    delay: Math.random() * 10,
    dur: 9 + Math.random() * 9,
    opacity: 0.25 + Math.random() * 0.5,
  }));

const subscribe = () => () => {};

// Subtle floating ambient gold dots (CSS-only, performant)
export const GoldParticles = ({ count = 22 }) => {
  const dotsRef = useRef(null);
  // Random positions can't match between prerendered HTML and hydration, so the
  // decorative dots only appear after the client takes over.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  if (!dotsRef.current) dotsRef.current = makeDots(count);
  const dots = mounted ? dotsRef.current : [];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            bottom: `${d.bottom}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            background: 'radial-gradient(circle, hsl(50 80% 70%) 0%, hsl(44 54% 54% / 0) 70%)',
            boxShadow: '0 0 8px hsl(44 54% 54% / 0.6)',
            opacity: d.opacity,
            animation: `float-particle ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};
