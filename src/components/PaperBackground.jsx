import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import colorUrl from '../../assets/Paper002_2K-JPG/Paper002_2K-JPG_Color.jpg';
import normalUrl from '../../assets/Paper002_2K-JPG/Paper002_2K-JPG_NormalGL.jpg';
import roughnessUrl from '../../assets/Paper002_2K-JPG/Paper002_2K-JPG_Roughness.jpg';

export function PaperBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let renderer;
    let disposed = false;
    let frame;
    const textures = [];
    const material = new THREE.MeshStandardMaterial({
      color: 0xd5cec5,
      normalScale: new THREE.Vector2(0.8, 0.8),
      roughness: 0.9,
      metalness: 0.05,
    });
    const geometry = new THREE.PlaneGeometry(12, 12);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const light = new THREE.DirectionalLight(0xfff5ea, 1.5);
    light.position.set(2, 4, 3);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8), light);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    function render() {
      if (disposed || !renderer) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!disposed) renderer.render(scene, camera);
      });
    }
    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      plane.scale.x = Math.max(1, camera.aspect * 5 * Math.tan(Math.PI / 8) / 6);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }

    try {
      canvas.hidden = false;
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      const loader = new THREE.TextureLoader();
      for (const [url, property] of [[colorUrl, 'map'], [normalUrl, 'normalMap'], [roughnessUrl, 'roughnessMap']]) {
        const texture = loader.load(url, loaded => {
          if (disposed) return;
          loaded.wrapS = loaded.wrapT = THREE.RepeatWrapping;
          loaded.repeat.set(4, 4);
          if (property === 'map') {
            loaded.encoding = THREE.sRGBEncoding;
            material.color.set(0xffffff);
          }
          material[property] = loaded;
          material.needsUpdate = true;
          render();
        });
        textures.push(texture);
      }
      resize();
      window.addEventListener('resize', resize);
    } catch {
      // The existing CSS paper texture remains visible without WebGL.
      canvas.hidden = true;
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      textures.forEach(texture => texture.dispose());
      geometry.dispose();
      material.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="pbr-canvas" aria-hidden="true" />
    </>
  );
}
