// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { Canvas, extend, useThree, useFrame, ReactThreeFiber } from '@react-three/fiber';
// import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls';

// // Extender o OrbitControls para usar no R3F
// extend({ OrbitControls: OrbitControlsImpl });

// interface EnvironmentProps {
//   font: any;
//   particleTexture: THREE.Texture;
// }

// const MagicCanvas: React.FC = () => {
//   const [font, setFont] = useState<THREE.Font | null>(null);
//   const [particleTexture, setParticleTexture] = useState<THREE.Texture | null>(null);

//   useEffect(() => {
//     const manager = new THREE.LoadingManager();
//     manager.onLoad = () => console.log('Resources Loaded');

//     const fontLoader = new THREE.FontLoader(manager);
//     fontLoader.load('https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json', setFont);
//     const textureLoader = new THREE.TextureLoader(manager);
//     textureLoader.load('https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png', setParticleTexture);
//   }, []);

//   return (
//     <Canvas className="w-full h-screen">
//       {font && particleTexture && (
//         <Environment font={font} particleTexture={particleTexture} />
//       )}
//     </Canvas>
//   );
// };

// const Environment: React.FC<EnvironmentProps> = ({ font, particleTexture }) => {
//   const { camera, gl, scene } = useThree();
//   const controls = useRef<OrbitControlsImpl>(null!);

//   useEffect(() => {
//     camera.position.set(0, 0, 100);
//   }, [camera]);

//   useFrame(() => {
//     controls.current.update();
//     gl.render(scene, camera);  // Correção aqui: Acesso direto à 'scene' do hook 'useThree'
//   });

//   return (
//     // @ts-ignore
//     <orbitControls ref={controls} args={[camera, gl.domElement]} />
//   );
// };

// export default MagicCanvas;
