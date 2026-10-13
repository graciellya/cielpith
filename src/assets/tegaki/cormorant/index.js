import { createBundle } from 'tegaki/core';
import fontUrl from './cormorant-garamond-2b32bf16.ttf?url';
import glyphData from './glyphData.json';

// The official generator's font file and stroke data, using Vite asset imports.
export default createBundle({
  family: 'Cormorant Garamond Tegaki 2b32bf16',
  fontUrl,
  glyphData,
  unitsPerEm: 1000,
  ascender: 924,
  descender: -287,
  weight: 400,
});
