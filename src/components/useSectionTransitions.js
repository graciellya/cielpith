import { useEffect } from 'react';

export function useSectionTransitions(mainRef) {
  useEffect(() => {
    const sections = [...mainRef.current.querySelectorAll('main > section')];
    const works = mainRef.current.querySelector('#works');
    const about = mainRef.current.querySelector('#about');
    const contact = mainRef.current.querySelector('#contact');
    const screens = [...mainRef.current.querySelectorAll('.parallax-card')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const smooth = value => {
      const clamped = Math.max(0, Math.min(1, value));
      return clamped * clamped * (3 - 2 * clamped);
    };
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      if (works) {
        const { top } = works.getBoundingClientRect();
        // Start the handoff at the first visible screen edge, not the section boundary.
        const firstScreenTop = screens.length
          ? Math.min(...screens.map(screen => screen.getBoundingClientRect().top))
          : top;
        const screensEntrance = reducedMotion.matches ? 1 : smooth((viewport - firstScreenTop) / (viewport * 0.6));
        works.style.setProperty('--works-entry-opacity', 0.2 + screensEntrance * 0.8);
        const abstractBounds = about?.querySelector('.art--lower')?.getBoundingClientRect();
        if (abstractBounds) {
          about.style.setProperty('--about-art-opacity', reducedMotion.matches ? 1 : smooth(abstractBounds.bottom / Math.max(1, abstractBounds.height)));
        }
        const contactTop = contact?.getBoundingClientRect().top ?? Infinity;
        // Keep background darkening separate from the earlier artwork/screens crossfade.
        const aboutBottom = about?.getBoundingClientRect().bottom ?? top;
        const entrance = reducedMotion.matches
          ? (top <= 0 && aboutBottom <= 0 ? 1 : 0)
          : smooth(Math.min(-top, -aboutBottom) / (viewport * 0.7));
        const exit = reducedMotion.matches
          ? (contactTop >= viewport ? 1 : 0)
          : smooth((contactTop - viewport) / (viewport * 0.845));
        const darkness = entrance * exit;
        works.style.setProperty('--works-darkness', darkness);
      }
      const states = sections.map(section => {
        if (reducedMotion.matches) return { section, opacity: 1, shift: 0 };
        const { top, bottom } = section.getBoundingClientRect();
        const entrance = smooth((viewport - top) / (viewport * 0.4));
        const exit = smooth(bottom / (viewport * 0.3));
        return {
          section,
          opacity: Math.min(entrance, exit),
          shift: (1 - entrance) * 28 - (1 - exit) * 18,
        };
      });
      states.forEach(({ section, opacity, shift }) => {
        section.style.setProperty('--section-opacity', opacity);
        section.style.setProperty('--section-shift', `${shift}px`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
      works?.style.removeProperty('--works-darkness');
      works?.style.removeProperty('--works-entry-opacity');
      about?.style.removeProperty('--about-art-opacity');
      sections.forEach(section => {
        section.style.removeProperty('--section-opacity');
        section.style.removeProperty('--section-shift');
      });
    };
  }, [mainRef]);
}
