"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import TWEEN from "@/utils/tween.module.js";
import { CSS3DRenderer, CSS3DSprite } from "@/utils/CSS3DRenderer";
import { TrackballControls } from "@/utils/TrackballControls";

const ThreeScene = () => {
  const mountRef: any = useRef(null);
  const objects: any = useRef([]);
  const positions: any = useRef({
    plane: [],
    cube: [],
    random: [],
    sphere: [],
  });
  const currentRef: any = useRef(0);

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.set(600, 400, 1500);

    const scene = new THREE.Scene();
    const renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new TrackballControls(camera, renderer.domElement);

    const image: any = document.createElement("img");
    image.src = "https://threejs.org/examples/textures/sprite.png"; // Ajuste o caminho conforme necessário
    image.onload = () => {
      for (let i = 0; i < 512; i++) {
        const object = new CSS3DSprite(image.cloneNode()) as any;
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;
        scene.add(object);
        objects.current.push(object);
      }
      setupPositions();
      transition();
    };

    window.addEventListener("resize", onWindowResize);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setupPositions();

    function setupPositions() {
      const particlesTotal = 512;

      // Plane: sem alterações necessárias na descrição anterior
      // Cube: Revisar a distribuição
      const cubeSize = Math.cbrt(particlesTotal); // Tentativa de distribuir uniformemente
      const separationCube = 150;
      const offsetCube = ((cubeSize - 1) * separationCube) / 2;

      positions.current.cube = [];
      for (let i = 0; i < particlesTotal; i++) {
        const x = (i % cubeSize) * separationCube - offsetCube;
        const y =
          Math.floor((i / cubeSize) % cubeSize) * separationCube - offsetCube;
        const z =
          Math.floor(i / (cubeSize * cubeSize)) * separationCube - offsetCube;
        positions.current.cube.push({ x, y, z });
      }

      // Sphere: Revisar a distribuição angular e radial
      const radius = 750;
      positions.current.sphere = [];
      for (let i = 0; i < particlesTotal; i++) {
        const phi = Math.acos(-1 + (2 * i) / particlesTotal);
        const theta = Math.sqrt(particlesTotal * Math.PI) * phi;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        positions.current.sphere.push({ x, y, z });
      }
    }

    function transition() {
      const styles = ["plane", "cube", "random", "sphere"];
      const style = styles[currentRef.current % styles.length];
      const duration = 2000;

      objects.current.forEach((object: any, index: number) => {
        new TWEEN.Tween(object.position)
          .to(
            {
              ...positions.current[style][index],
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
      });

      new TWEEN.Tween({})
        .to({}, duration * 3)
        .onComplete(() => {
          currentRef.current++;
          transition();
        })
        .start();
    }

    function animate() {
      requestAnimationFrame(animate);
      TWEEN.update();
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ height: "100vh" }} />;
};

export default ThreeScene;
