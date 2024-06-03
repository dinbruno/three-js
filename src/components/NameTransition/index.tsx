// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { extend, Canvas, useThree, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@/utils/OrbitControls';

// extend({ OrbitControls });

// const MagicCanvas = () => {
//   const [font, setFont] = useState(null);
//   const [particleTexture, setParticleTexture] = useState(null);

//   useEffect(() => {
//     const manager = new THREE.LoadingManager();
//     manager.onLoad = () => console.log('Resources Loaded');

//     new THREE.FontLoader(manager).load('https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json', setFont);
//     new THREE.TextureLoader(manager).load('https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png', setParticleTexture);
//   }, []);

//   return (
//     <Canvas className="w-full h-screen">
//       {font && particleTexture && (
//         <Environment font={font} particleTexture={particleTexture} />
//       )}
//     </Canvas>
//   );
// };

// const Environment = ({ font, particleTexture }: any) => {
//   const { camera, gl } = useThree();
//   const controls: any = useRef();

//   useEffect(() => {
//     camera.position.set(0, 0, 100);
//     controls.current.update();
//   }, [camera]);

//   useFrame(() => gl.render());

//   return (
//     <>
//     {/* @ts-ignore */}
//       <orbitControls ref={controls} args={[camera, gl.domElement]} />
//       {/* Add additional scene setup and component rendering here */}
//     </>
//   );
// };

// const CreateParticles = ({ scene, font, particleTexture }: any) => {
//   // Setup particles using the provided font and texture
//   // This function will need to be expanded to include the detailed particle creation logic
//   return null;
// };

// export default MagicCanvas;
