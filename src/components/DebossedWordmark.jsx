export function DebossedWordmark() {
  return (
    <>
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
        <defs>
          <filter id="wordmark-inset" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feOffset in="SourceAlpha" dx="-1.4" dy="-1.8" result="lit-edge-offset" />
            <feComposite in="lit-edge-offset" in2="SourceAlpha" operator="out" result="outline-mask" />
            <feFlood floodColor="#fff" floodOpacity="0.4" result="outline-color" />
            <feComposite in="outline-color" in2="outline-mask" operator="in" result="white-outline" />
            <feGaussianBlur in="white-outline" stdDeviation="0.7" result="soft-white-outline" />
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="soft-edge" />
            <feOffset in="soft-edge" dx="1.8" dy="2.2" result="shadow-offset" />
            <feComposite in="SourceAlpha" in2="shadow-offset" operator="out" result="inner-shadow-mask" />
            <feFlood floodColor="#40362b" floodOpacity="0.9" result="shadow-color" />
            <feComposite in="shadow-color" in2="inner-shadow-mask" operator="in" result="inner-shadow" />
            <feOffset in="soft-edge" dx="-0.6" dy="-0.8" result="highlight-offset" />
            <feComposite in="SourceAlpha" in2="highlight-offset" operator="out" result="inner-highlight-mask" />
            <feFlood floodColor="#eee5d7" floodOpacity="0.25" result="highlight-color" />
            <feComposite in="highlight-color" in2="inner-highlight-mask" operator="in" result="inner-highlight" />
            <feFlood floodColor="#40362b" floodOpacity="0.3" result="interior-color" />
            <feComposite in="interior-color" in2="SourceAlpha" operator="in" result="interior-tint" />
            <feMerge>
              <feMergeNode in="soft-white-outline" />
              <feMergeNode in="interior-tint" />
              <feMergeNode in="inner-highlight" />
              <feMergeNode in="inner-shadow" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <h1 aria-label="ciel pith"><span>ciel</span><span>pith</span></h1>
    </>
  );
}
