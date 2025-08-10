"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GalaxyBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    // Scene setup with enhanced rendering
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 800, 1500); // Add atmospheric fog
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create stars with reduced count
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000; // Reduced from 10000
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);
    const sizes = new Float32Array(starsCount);

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 2000;
      positions[i3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i3 + 2] = (Math.random() - 0.5) * 2000;

      // Random colors between blue and purple
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i3] = 0; // R
        colors[i3 + 1] = 0.75; // G
        colors[i3 + 2] = 1; // B (electric blue)
      } else if (colorChoice < 0.6) {
        colors[i3] = 0.54; // R
        colors[i3 + 1] = 0.17; // G
        colors[i3 + 2] = 0.89; // B (galaxy purple)
      } else {
        colors[i3] = 1; // R
        colors[i3 + 1] = 1; // G
        colors[i3 + 2] = 1; // B (white)
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    // Create simplified text-based stars
    const characters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                       'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
                       'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
                       'U', 'V', 'W', 'X', 'Y', 'Z', '+', '*', '@', '#'];

    const starsGroup = new THREE.Group();
    
    // Only create text sprites for a subset of stars to improve performance
    const textStarsCount = Math.min(500, starsCount / 10); // Only 500 text stars
    
    for (let i = 0; i < textStarsCount; i++) {
      const char = characters[Math.floor(Math.random() * characters.length)];
      
      // Create simplified canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const fontSize = 16 + Math.random() * 8; // Smaller font
      canvas.width = fontSize * 2;
      canvas.height = fontSize * 2;
      
      if (context) {
        context.font = `${fontSize}px 'JetBrains Mono', monospace`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Simplified color selection
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        context.shadowBlur = 10;
        context.shadowColor = color;
        context.fillStyle = color;
        context.fillText(char, fontSize, fontSize);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      
      const material = new THREE.SpriteMaterial({ 
        map: texture, 
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      
      const sprite = new THREE.Sprite(material);
      const index = i * 10; // Use every 10th position
      sprite.position.set(positions[index * 3], positions[index * 3 + 1], positions[index * 3 + 2]);
      sprite.scale.setScalar(sizes[index] * 8);
      
      // Simplified animation properties
      (sprite as any).originalScale = sprite.scale.x;
      (sprite as any).pulseSpeed = 0.01 + Math.random() * 0.01;
      
      starsGroup.add(sprite);
    }
    
    scene.add(starsGroup);

    // Create galaxy spiral with reduced count
    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyCount = 2500; // Reduced from 5000
    const galaxyPositions = new Float32Array(galaxyCount * 3);
    const galaxyColors = new Float32Array(galaxyCount * 3);

    for (let i = 0; i < galaxyCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 800 + 200;
      const spinAngle = radius * 0.01;
      const branchAngle = (i % 3) * ((Math.PI * 2) / 3);

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 20;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 20;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 20;

      galaxyPositions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      galaxyPositions[i3 + 1] = randomY;
      galaxyPositions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = new THREE.Color();
      const innerColor = new THREE.Color('#00bfff');
      const outerColor = new THREE.Color('#8a2be2');
      mixedColor.lerpColors(innerColor, outerColor, radius / 1000);

      galaxyColors[i3] = mixedColor.r;
      galaxyColors[i3 + 1] = mixedColor.g;
      galaxyColors[i3 + 2] = mixedColor.b;
    }

    // Create text-based galaxy
    const galaxyGroup = new THREE.Group();
    
    for (let i = 0; i < galaxyCount; i++) {
      const char = characters[Math.floor(Math.random() * characters.length)];
      const i3 = i * 3;
      
      // Create canvas for text
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const fontSize = 24;
      canvas.width = fontSize * 2;
      canvas.height = fontSize * 2;
      
      if (context) {
        context.font = `${fontSize}px 'JetBrains Mono', 'Courier New', monospace`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Use the calculated galaxy color
        const r = Math.floor(galaxyColors[i3] * 255);
        const g = Math.floor(galaxyColors[i3 + 1] * 255);
        const b = Math.floor(galaxyColors[i3 + 2] * 255);
        context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        
        // Add glow effect
        context.shadowBlur = 15;
        context.shadowColor = context.fillStyle;
        
        context.fillText(char, fontSize, fontSize);
      }
      
      // Create texture and material
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ 
        map: texture, 
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      
      const sprite = new THREE.Sprite(material);
      sprite.position.set(galaxyPositions[i3], galaxyPositions[i3 + 1], galaxyPositions[i3 + 2]);
      sprite.scale.setScalar(8);
      
      // Add custom properties for animation
      (sprite as any).originalScale = sprite.scale.x;
      (sprite as any).pulsePhase = Math.random() * Math.PI * 2;
      (sprite as any).rotationSpeed = (Math.random() - 0.5) * 0.01;
      
      galaxyGroup.add(sprite);
    }
    
    scene.add(galaxyGroup);

    camera.position.z = 500;
    camera.position.y = 100;

    // Simplified animation for better performance
    let time = 0;
    const animate = () => {
      time += 0.005; // Slower time increment
      
      // Simplified star animation (only every few frames)
      if (Math.floor(time * 100) % 5 === 0) {
        starsGroup.children.forEach((star, index) => {
          const sprite = star as THREE.Sprite;
          const customProps = sprite as any;
          
          // Simple pulse
          const pulse = 1 + Math.sin(time * 4 + index * 0.1) * 0.1;
          sprite.scale.setScalar(customProps.originalScale * pulse);
        });
      }
      
      // Galaxy animation (only every few frames)
      if (Math.floor(time * 100) % 3 === 0) {
        galaxyGroup.children.forEach((star, index) => {
          const sprite = star as THREE.Sprite;
          const customProps = sprite as any;
          
          if (customProps.originalScale !== undefined) {
            const pulse = 1 + Math.sin(time * 3 + index * 0.1) * 0.05;
            sprite.scale.setScalar(customProps.originalScale * pulse);
          }
        });
      }
      
      // Simplified group rotations
      galaxyGroup.rotation.y = time * 0.1;
      starsGroup.rotation.y = time * 0.05;
      starsGroup.rotation.x = time * 0.02;

      // Simplified camera movement
      camera.position.x = Math.sin(time * 0.1) * 50;
      camera.position.y = 100 + Math.cos(time * 0.1) * 25;
      camera.position.z = 500;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="three-canvas" />;
}
