import amyg from '../../assets/amyg.png';
import h from '../../assets/h.png';
import clear from '../../assets/clear.png';
import mm from '../../assets/mm.png';
import spectacular from '../../assets/spectacular.png';
import sensual from '../../assets/sensual_replace.png';
import gleann from '../../assets/gleann.png';
import apologies from '../../assets/apologies.png';
import foolproof from '../../assets/foolproof.png';
import luxury from '../../assets/replaceluxury.png';
import watch from '../../assets/watch.png';
import fig from '../../assets/fig_preferred.png';
import { HeroParallax } from './ui/hero-parallax';
import './ui/hero-parallax.css';

const projects = [
  { title: 'amygdala', image: amyg },
  { title: 'h', image: h },
  { title: 'crystal clear', image: clear },
  { title: 'hi there', image: mm },
  { title: 'spectacular', image: spectacular },
  { title: 'sensual / fierce', image: sensual },
  { title: 'glean', image: gleann },
  { title: 'perfunctory apologies', image: apologies },
  { title: 'foolproof', image: foolproof },
  { title: 'luxury', image: luxury },
  { title: 'watch', image: watch },
  { title: 'fig', image: fig },
];

export function Gallery() {
  return <HeroParallax products={projects.map(({ title, image }) => ({ title, thumbnail: image }))} />;
}
