import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DSceneProps {
  onHoverItem?: (itemName: string | null) => void;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ onHoverItem }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check device capability / reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf9ebd7, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting System (Warm Ivory + Emerald + Vermilion Rim)
    const ambientLight = new THREE.AmbientLight(0xfffcf6, 0.9);
    scene.add(ambientLight);

    const emeraldKeyLight = new THREE.DirectionalLight(0x046a38, 2.2);
    emeraldKeyLight.position.set(5, 6, 4);
    scene.add(emeraldKeyLight);

    const vermilionRimLight = new THREE.PointLight(0xe34222, 1.8, 15);
    vermilionRimLight.position.set(-4, -2, 3);
    scene.add(vermilionRimLight);

    const fillLight = new THREE.DirectionalLight(0xf9ebd7, 1.2);
    fillLight.position.set(-4, 4, 3);
    scene.add(fillLight);

    // 3. 3D Elements Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // A. Center Floating Medical Hexagon Core
    const hexGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.35, 6);
    const emeraldMat = new THREE.MeshPhysicalMaterial({
      color: 0x046a38,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
    });
    const centerHex = new THREE.Mesh(hexGeo, emeraldMat);
    centerHex.rotation.x = Math.PI / 4;
    mainGroup.add(centerHex);

    // Inset Warm Ivory Cross on the Hexagon
    const crossGroup = new THREE.Group();
    const crossBarMat = new THREE.MeshStandardMaterial({
      color: 0xf9ebd7,
      roughness: 0.3,
    });
    const barV = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.1, 0.4), crossBarMat);
    const barH = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.32, 0.4), crossBarMat);
    crossGroup.add(barV);
    crossGroup.add(barH);
    crossGroup.position.set(0, 0, 0.05);
    crossGroup.rotation.x = Math.PI / 4;
    mainGroup.add(crossGroup);

    // B. Precision Orbiting Glass Ring (representing sterile monitoring ring)
    const ringGeo = new THREE.TorusGeometry(2.3, 0.04, 16, 100);
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: 0x073d27,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.5,
      transparent: true,
      opacity: 0.85,
    });
    const orbitRing1 = new THREE.Mesh(ringGeo, ringMat);
    orbitRing1.rotation.x = Math.PI / 3;
    mainGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.025, 16, 100), ringMat);
    orbitRing2.rotation.y = Math.PI / 3;
    orbitRing2.rotation.z = Math.PI / 6;
    mainGroup.add(orbitRing2);

    // C. Floating Medical Capsules / Pods (Stylized representations of precision supplies)
    interface FloatingMesh {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      offset: number;
      rotSpeed: number;
    }

    const floatingObjects: FloatingMesh[] = [];

    // Capsule 1 (Emerald & White Capsule - Medical Formula)
    const capGeo = new THREE.CapsuleGeometry(0.28, 0.7, 16, 32);
    const capMat = new THREE.MeshPhysicalMaterial({
      color: 0x058446,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 1.0,
    });
    const capMesh1 = new THREE.Mesh(capGeo, capMat);
    capMesh1.position.set(-2.4, 1.5, 0.5);
    capMesh1.rotation.z = 0.5;
    mainGroup.add(capMesh1);
    floatingObjects.push({ mesh: capMesh1, baseX: -2.4, baseY: 1.5, baseZ: 0.5, speed: 1.2, offset: 0, rotSpeed: 0.01 });

    // Capsule 2 (Vermilion Accent Capsule - Rapid Alert / Emergency)
    const vermilionMat = new THREE.MeshPhysicalMaterial({
      color: 0xe34222,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 0.9,
    });
    const capMesh2 = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.55, 16, 32), vermilionMat);
    capMesh2.position.set(2.5, -1.3, 0.8);
    capMesh2.rotation.z = -0.6;
    mainGroup.add(capMesh2);
    floatingObjects.push({ mesh: capMesh2, baseX: 2.5, baseY: -1.3, baseZ: 0.8, speed: 1.6, offset: 2, rotSpeed: 0.015 });

    // Spherical Glass Sensors (representing Pulse Oximeter & Diagnostic Optic sensors)
    const sphereGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffcf6,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0,
      transmission: 0.7,
      thickness: 0.4,
    });
    const sphere1 = new THREE.Mesh(sphereGeo, sphereMat);
    sphere1.position.set(-2.0, -1.8, 1.2);
    mainGroup.add(sphere1);
    floatingObjects.push({ mesh: sphere1, baseX: -2.0, baseY: -1.8, baseZ: 1.2, speed: 1.4, offset: 1.2, rotSpeed: 0.008 });

    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 32), emeraldMat);
    sphere2.position.set(2.2, 1.8, -0.2);
    mainGroup.add(sphere2);
    floatingObjects.push({ mesh: sphere2, baseX: 2.2, baseY: 1.8, baseZ: -0.2, speed: 0.9, offset: 3.1, rotSpeed: 0.006 });

    // D. Soft Ambient Floating Particle Field (representing sterile cleanroom atmosphere)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x046a38,
      size: 0.06,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Mouse Interactive Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow with damping (lerp)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Rotate main group subtly
        mainGroup.rotation.y = mouseX * 0.4 + Math.sin(elapsedTime * 0.3) * 0.15;
        mainGroup.rotation.x = -mouseY * 0.3 + Math.cos(elapsedTime * 0.25) * 0.1;

        // Orbit rings rotation
        orbitRing1.rotation.z += 0.003;
        orbitRing2.rotation.x += 0.002;
        orbitRing2.rotation.y += 0.004;

        // Floating objects bobbing
        floatingObjects.forEach((item) => {
          item.mesh.position.y = item.baseY + Math.sin(elapsedTime * item.speed + item.offset) * 0.18;
          item.mesh.position.x = item.baseX + Math.cos(elapsedTime * item.speed * 0.8 + item.offset) * 0.1;
          item.mesh.rotation.x += item.rotSpeed;
          item.mesh.rotation.y += item.rotSpeed * 1.5;
        });

        // Slow drift on particles
        particles.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Responsive Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onHoverItem]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};
