import { useEffect, useRef, useState } from 'react';
import { SafariToolbar } from './safari-toolbar';

function WorkScreen({ product, expanded, onToggle }) {
  return (
    <figure className={`parallax-card${expanded ? ' is-expanded' : ''}`} onClick={onToggle}>
      <div className="macbook-display">
        <SafariToolbar title={product.title} />
        <button type="button" className="work-screen-toggle" aria-pressed={expanded}
          aria-label={`Enlarge ${product.title}`}>
          <img src={product.thumbnail} alt={product.title} loading="lazy" decoding="async" />
        </button>
        <span className="macbook-notch" aria-hidden="true" />
      </div>
    </figure>
  );
}

export function HeroParallax({ products }) {
  const [expandedTitle, setExpandedTitle] = useState(null);
  const sectionRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    const staticLayout = window.matchMedia('(max-width: 700px), (prefers-reduced-motion: reduce)');
    let frame = 0;
    let released = false;
    let motionFrame = 0;
    let scrollTarget = null;
    let lastMotionTime = null;
    const update = () => {
      frame = 0;
      if (staticLayout.matches) return;
      const bounds = section.getBoundingClientRect();
      // Hold the completed grid for one and a half viewport heights before the exit transition.
      const holdDistance = section.offsetHeight * (150 / 722.5);
      const scrollProgress = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height - window.innerHeight - holdDistance)));
      const progress = scrollProgress;
      const settled = progress >= 0.999;
      section.classList.toggle('is-settled', settled);
      const animationDistance = bounds.height - window.innerHeight - holdDistance;
      const fade = settled ? Math.min(1, Math.max(0, (-bounds.top - animationDistance - holdDistance) / window.innerHeight)) : 0;
      section.style.setProperty('--works-exit-opacity', `${1 - fade * fade * (3 - 2 * fade)}`);
      section.querySelector('.parallax-stage').inert = fade >= 0.99;
      const sweep = Math.sin(progress * Math.PI * 2);
      const displacement = Math.max(-200, Math.min(200, -160 * sweep));
      section.style.setProperty('--parallax-x', `${displacement}px`);
      const openingGloss = (1 - Math.min(1, progress / 0.2)) ** 2;
      const secondHalfGloss = Math.min(1, Math.max(0, (progress - 0.5) / 0.15));
      const gloss = Math.max(openingGloss * 0.4, secondHalfGloss * 0.1);
      section.style.setProperty('--reflection-position', `${35 + progress * 165}%`);
      section.style.setProperty('--reflection-opacity', `${Math.min(1, gloss * 0.8 + Math.sin(progress * Math.PI) * 0.35)}`);
      section.style.setProperty('--opening-gloss', `${gloss}`);
    };
    const scheduleUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    const stopMotion = () => {
      cancelAnimationFrame(motionFrame);
      motionFrame = 0;
      scrollTarget = null;
      lastMotionTime = null;
    };
    const keepGalleryInView = () => {
      const start = window.scrollY + section.getBoundingClientRect().top;
      if (window.scrollY < start - window.innerHeight * 0.8) released = false;
      scheduleUpdate();
    };
    const handleNavigation = event => {
      if (event.target.closest('a[href]')) stopMotion();
      if (event.target.closest('a[href="#contact"]')) released = true;
    };
    const advanceScroll = now => {
      motionFrame = 0;
      if (scrollTarget === null || staticLayout.matches || released) { stopMotion(); return; }
      const elapsed = lastMotionTime === null ? 1 / 60 : Math.min(0.05, (now - lastMotionTime) / 1000);
      lastMotionTime = now;
      const current = window.scrollY;
      const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget = Math.min(scrollTarget, maximum);
      const remaining = scrollTarget - current;
      if (remaining <= 0.5) { stopMotion(); return; }
      const step = Math.min(remaining, window.innerHeight * 0.845 * elapsed);
      window.scrollTo({ top: current + step, behavior: 'instant' });
      scheduleUpdate();
      motionFrame = requestAnimationFrame(advanceScroll);
    };
    const handleWheel = event => {
      if (staticLayout.matches || released || event.ctrlKey) { stopMotion(); return; }
      const start = window.scrollY + section.getBoundingClientRect().top;
      const exit = start + section.offsetHeight;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (delta <= 0) { stopMotion(); return; }
      const entranceStart = start - window.innerHeight * 0.8;
      if (window.scrollY + delta < entranceStart || window.scrollY >= exit - 0.5) return;
      event.preventDefault();
      // Retain all wheel input and traverse entrance/animation boundaries continuously.
      scrollTarget = Math.min(exit, Math.max(window.scrollY, scrollTarget ?? window.scrollY) + delta);
      if (!motionFrame) motionFrame = requestAnimationFrame(advanceScroll);
    };
    update();
    window.addEventListener('scroll', keepGalleryInView, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('click', handleNavigation);
    window.addEventListener('resize', scheduleUpdate);
    staticLayout.addEventListener('change', scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      stopMotion();
      section.style.removeProperty('--works-exit-opacity');
      section.querySelector('.parallax-stage').inert = false;
      window.removeEventListener('scroll', keepGalleryInView);
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('click', handleNavigation);
      window.removeEventListener('resize', scheduleUpdate);
      staticLayout.removeEventListener('change', scheduleUpdate);
    };
  }, []);
  const firstRowEnd = Math.ceil(products.length / 3);
  const secondRowEnd = firstRowEnd + Math.ceil((products.length - firstRowEnd) / 2);
  const rows = [products.slice(0, firstRowEnd), products.slice(firstRowEnd, secondRowEnd), products.slice(secondRowEnd)];
  return (
    <section ref={sectionRef} className="works works--parallax" id="works" aria-label="Selected works">
      <div className="parallax-stage">
        <div className="parallax-scene">
          {rows.map((row, index) => (
            <div className={`parallax-row parallax-row--${index + 1}`} key={index}>
              {row.map(product => (
                <WorkScreen product={product} key={product.title} expanded={expandedTitle === product.title}
                  onToggle={() => setExpandedTitle(current => current === product.title ? null : product.title)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
