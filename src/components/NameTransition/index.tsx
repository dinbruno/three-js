import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { FontLoader, OrbitControls, TextGeometry } from 'three/examples/jsm/Addons.js';

extend({ OrbitControls });

// Carregar fonte e textura
const useLoaders = () => {
  const [font, setFont] = useState<any | null>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const fontLoader = new FontLoader();
    fontLoader.load('https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json', setFont);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png', setTexture);
  }, []);

  return { font, texture };
};

const MagicCanvas = () => {
  const { font, texture } = useLoaders();

  return (
    <Canvas className="w-full h-screen">
      {font && texture && <Environment font={font} texture={texture} />}
    </Canvas>
  );
};

const Environment = ({ font, texture }: { font: any; texture: THREE.Texture }) => {
  const { scene, camera, gl } = useThree();
  const controlsRef = useRef<OrbitControls>(null!);

  // Configurar câmera
  useEffect(() => {
    camera.position.set(0, 0, 100);
    controlsRef.current = new OrbitControls(camera, gl.domElement);
  }, [camera, gl.domElement]);

  // Criar partículas de texto
  useEffect(() => {
    const particles = createTextParticles(font, texture, scene);
    scene.add(particles);

    return () => {
      scene.remove(particles);
    };
  }, [font, texture, scene]);

  useFrame(() => {
    controlsRef.current.update();
    gl.render(scene, camera);
  });

  return null;
};

const createTextParticles = (font: any, texture: THREE.Texture, scene: THREE.Scene) => {
  const geometry = new TextGeometry('Hello', {
    font: font,
    size: 10,
    height: 2,
  });

  const material = new THREE.PointsMaterial({
    map: texture,
    size: 0.5,
    transparent: true,
    color: 0xffffff,
  });

  const points = new THREE.Points(geometry, material);
  return points;
};

export default MagicCanvas;
