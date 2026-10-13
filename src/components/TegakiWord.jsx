import { Component, useEffect, useRef, useState } from 'react';
import { TegakiRenderer } from 'tegaki';
import font from '../assets/tegaki/cormorant';

const playback = { mode: 'uncontrolled', speed: 1, loop: false };
const rendererStyle = {
  position: 'absolute', top: 0, left: 0, width: '100%',
  fontSize: 'inherit', fontWeight: 400, lineHeight: 'inherit',
  letterSpacing: 'inherit', color: '#000',
};

class RendererBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function TegakiWord({ text, playing = true, onComplete }) {
  const renderer = useRef(null);
  const [failed, setFailed] = useState(false);
  const completed = useRef(false);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;
  function complete() {
    if (completed.current) return;
    completed.current = true;
    completeRef.current?.();
  }
  function fallback() { setFailed(true); complete(); }

  useEffect(() => {
    if (!playing || failed) return;
    let frame;
    const started = performance.now();
    function verifyDrawing() {
      try {
        const canvas = renderer.current?.element?.querySelector('canvas');
        const context = canvas?.getContext('2d');
        if (context && canvas.width && canvas.height) {
          const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
          for (let index = 3; index < pixels.length; index += 4) {
            if (pixels[index] > 0) return; // Keep the genuine renderer once it paints.
          }
        }
        if (performance.now() - started > 2500) {
          setFailed(true);
          if (!completed.current) { completed.current = true; completeRef.current?.(); }
          return;
        }
        frame = requestAnimationFrame(verifyDrawing);
      } catch {
        setFailed(true);
        if (!completed.current) { completed.current = true; completeRef.current?.(); }
      }
    }
    frame = requestAnimationFrame(verifyDrawing);
    return () => cancelAnimationFrame(frame);
  }, [playing, failed]);

  return (
    <span className="wordmark-word">
      <span className="wordmark-layout" style={{ visibility: failed ? 'visible' : 'hidden' }}>{text}</span>
      {!failed && (
        <RendererBoundary onFailure={fallback}>
          <TegakiRenderer
            as="span" ref={renderer} font={font}
            time={playing ? playback : 0}
            reducedMotion="user" onComplete={complete}
            style={rendererStyle} aria-hidden="true"
          >
            {text}
          </TegakiRenderer>
        </RendererBoundary>
      )}
    </span>
  );
}
