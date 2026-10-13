import { Artwork } from './components/Artwork';
import { DebossedWordmark } from './components/DebossedWordmark';
import { Navigation } from './components/Navigation';
import { Gallery } from './components/Gallery';
import { PaperBackground } from './components/PaperBackground';
import { useLayoutEffect, useRef } from 'react';
import { useSectionTransitions } from './components/useSectionTransitions';

function Hero() {
  const heroRef = useRef(null);
  useLayoutEffect(() => {
    const hero = heroRef.current;
    const wordmark = hero.querySelector('h1');
    const navigation = hero.querySelector('nav');
    let active = true;
    function measure() {
      if (!active) return;
      const titleWidth = parseFloat(getComputedStyle(wordmark).width);
      const navigationWidth = parseFloat(getComputedStyle(navigation).width);
      hero.style.setProperty('--landing-crop-width', `${(titleWidth + navigationWidth) / 2}px`);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(wordmark);
    observer.observe(navigation);
    measure();
    document.fonts.ready.then(measure);
    return () => { active = false; observer.disconnect(); };
  }, []);
  return (
    <section ref={heroRef} className="hero" id="home" aria-label="ciel pith home">
      <Artwork className="art--hero" />
      <DebossedWordmark />
      <Navigation />
    </section>
  );
}
function About() {
  return (
    <section className="about" id="about" aria-label="About the studio">
      <Artwork className="art--strip" decorative />
      <p>ciel pith is an independent design studio creating websites and digital identities for artists, creative studios, and cultural institutions.<br />working across architecture, editorial design, contemporary art, and technology, we build distinctive digital experiences that give form to ideas, articulate identity, and make the work behind them impossible to mistake.</p>
      <Artwork className="art--strip art--lower" decorative />
    </section>
  );
}
function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">contact us</h2>
      <Artwork className="art--contact" decorative />
      <div className="contact-copy"><a href="mailto:cielpith@gmail.com">cielpith@gmail.com</a></div>
    </section>
  );
}
export default function App() {
  const mainRef = useRef(null);
  useSectionTransitions(mainRef);
  return (
    <>
      <PaperBackground />
      <main ref={mainRef}>
        <Hero />
        <About />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
