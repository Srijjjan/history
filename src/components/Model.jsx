"use client";

import { Center, Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { useLenis } from "lenis/react";

const ModelMesh = ({ scrollprogress }) => {
  const { scene } = useGLTF("/greek_underwater_broken_statue_1.glb");
  const groupRef = useRef(null);
  const [scale, setScale] = useState(0.11);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScale(0.07); // Mobile
      } else if (width < 1024) {
        setScale(0.09); // Tablet
      } else {
        setScale(0.11); // DESKTOP (Locked original)
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollprogress * Math.PI * 2;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive scale={scale} object={scene} />
    </group>
  );
};

const Model = () => {
  const [scrollprogress, setscrollprogress] = useState(0);
  const [cameraPos, setCameraPos] = useState([0, 0, 5]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCameraPos([0, 0, 7]); // Mobile
      } else if (width < 1024) {
        setCameraPos([0, 0, 5.5]); // Tablet
      } else {
        setCameraPos([0, 0, 5]); // DESKTOP (Locked original)
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLenis(({ progress }) => {
    setscrollprogress(progress);
  });
  return (
    <section className="h-screen w-full">
      <Canvas camera={{ position: cameraPos, fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="sunset" environmentIntensity={0.5} />
        <Suspense fallback={null}>
          <mesh position={[0, -1.3, 0]}>
            <Center>
              <ModelMesh scrollprogress={scrollprogress} />
            </Center>
          </mesh>
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Model;
