'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  char: string
  rotation: number
  rotationSpeed: number
  pulsePhase: number
  trail: { x: number; y: number; opacity: number }[]
  layer: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(50, window.innerWidth / 20) // Reduced from 150
      const characters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                         'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
                         'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
                         'U', 'V', 'W', 'X', 'Y', 'Z', '{', '}', '[', ']', 
                         '<', '>', '/', '\\', '|', '-', '+', '=', '*', '&', 
                         '@', '#', '$', '%', '^', '~', '`']

      for (let i = 0; i < particleCount; i++) {
        const layer = Math.floor(Math.random() * 2) + 1; // Reduced to 2 layers
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (0.3 + layer * 0.2), // Reduced speed
          vy: (Math.random() - 0.5) * (0.3 + layer * 0.2),
          size: Math.random() * (4 + layer * 2) + (8 + layer), // Smaller size
          opacity: Math.random() * 0.3 + 0.1 + (layer * 0.1), // Reduced opacity
          char: characters[Math.floor(Math.random() * characters.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
          trail: [],
          layer: layer
        })
      }

      particlesRef.current = particles
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001;

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed
        particle.pulsePhase += 0.03

        // Bounce off edges
        if (particle.x < -30 || particle.x > canvas.width + 30) {
          particle.vx *= -1
          particle.x = Math.max(-30, Math.min(canvas.width + 30, particle.x))
        }
        if (particle.y < -30 || particle.y > canvas.height + 30) {
          particle.vy *= -1
          particle.y = Math.max(-30, Math.min(canvas.height + 30, particle.y))
        }

        // Simplified trail (only keep 3 points)
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity })
        if (particle.trail.length > 3) {
          particle.trail.shift()
        }

        // Draw simplified trail
        particle.trail.forEach((trailPoint, trailIndex) => {
          const trailOpacity = (trailIndex / particle.trail.length) * trailPoint.opacity * 0.2
          const trailSize = particle.size * (0.5 + (trailIndex / particle.trail.length) * 0.5)
          
          ctx.save()
          ctx.translate(trailPoint.x, trailPoint.y)
          
          ctx.font = `${trailSize}px 'JetBrains Mono', monospace`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          
          let baseColor = particle.layer === 1 ? '100, 200, 255' : '0, 255, 150'
          
          ctx.shadowBlur = 3
          ctx.shadowColor = `rgba(${baseColor}, ${trailOpacity})`
          ctx.fillStyle = `rgba(${baseColor}, ${trailOpacity})`
          ctx.fillText(particle.char, 0, 0)
          
          ctx.restore()
        })

        // Draw main particle with simple pulse
        const pulseScale = 1 + Math.sin(particle.pulsePhase) * 0.1
        const currentSize = particle.size * pulseScale
        const currentOpacity = particle.opacity * (0.9 + Math.sin(particle.pulsePhase + time) * 0.1)

        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        
        ctx.font = `${currentSize}px 'JetBrains Mono', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        let baseColor = particle.layer === 1 ? '100, 200, 255' : '0, 255, 150'
        
        // Single glow layer
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(${baseColor}, ${currentOpacity})`
        ctx.fillStyle = `rgba(${baseColor}, ${currentOpacity})`
        ctx.fillText(particle.char, 0, 0)
        
        ctx.restore()

        // Simplified connections (only check close particles)
        if (index % 2 === 0) { // Only process every other particle for connections
          particlesRef.current.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex && otherIndex > index) {
              const dx = particle.x - otherParticle.x
              const dy = particle.y - otherParticle.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              const maxDistance = 80

              if (distance < maxDistance) {
                const connectionOpacity = (1 - distance / maxDistance) * 0.1
                
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(otherParticle.x, otherParticle.y)
                ctx.strokeStyle = `rgba(100, 200, 255, ${connectionOpacity})`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
            }
          })
        }
      })
    }

    const animate = () => {
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}
