const items = ['home', 'about', 'works', 'contact'];

export function Navigation() {
  return (
    <nav aria-label="Primary navigation">
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
        <defs>
          <filter id="nav-inset" x="-10%" y="-20%" width="120%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.35" result="soft-edge" />
            <feOffset in="soft-edge" dx="0.45" dy="0.65" result="shadow-offset" />
            <feComposite in="SourceAlpha" in2="shadow-offset" operator="out" result="inner-shadow-mask" />
            <feFlood floodColor="#30271f" floodOpacity="0.55" result="shadow-color" />
            <feComposite in="shadow-color" in2="inner-shadow-mask" operator="in" result="inner-shadow" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="inner-shadow" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      {items.map(label => <a key={label} href={`#${label}`}>{label}</a>)}
    </nav>
  );
}
