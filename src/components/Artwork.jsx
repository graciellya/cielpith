import artwork from '../../assets/studio-art.png';

export function Artwork({ className, decorative = false }) {
  return (
    <div
      className={`art ${className}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Abstract composition in burgundy, olive, violet, and amber'}
      aria-hidden={decorative || undefined}
    >
      <div className="art-blocks" />
      <i /><i /><i /><i />
      <img src={artwork} alt="" />
    </div>
  );
}
