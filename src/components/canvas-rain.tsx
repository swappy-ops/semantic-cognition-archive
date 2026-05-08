"use client";

import { useEffect, useRef } from "react";
import { CLUSTER_COLORS } from "@/lib/dataset";

const FRAGMENTS = ["0", "1", "0", "1", "null", "sys", "mem", "arc", "log", "drift", "trace", "void", "01", "10", "node", "seed"];

class SemanticFragmentParticle {
  x: number; y: number; baseVx: number; baseVy: number; vx: number; vy: number;
  layer: "near" | "mid" | "far"; char: string; phaseOffset: number;
  size: number; maxOpacity: number; speedMult: number; currentOpacity: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.baseVx = (Math.random() - 0.5) * 0.12;
    this.baseVy = (Math.random() - 0.5) * 0.2 + 0.15;
    this.vx = this.baseVx;
    this.vy = this.baseVy;
    
    const depthRoll = Math.random();
    if (depthRoll > 0.85) this.layer = "near";
    else if (depthRoll > 0.4) this.layer = "mid";
    else this.layer = "far";

    this.char = FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)];
    this.phaseOffset = Math.random() * Math.PI * 2;
    
    if (this.layer === "near") {
      this.size = Math.random() * 4 + 11;
      this.maxOpacity = 0.45;
      this.speedMult = 1.0;
    } else if (this.layer === "mid") {
      this.size = Math.random() * 3 + 7;
      this.maxOpacity = 0.25;
      this.speedMult = 0.5;
    } else {
      this.size = Math.random() * 2 + 4;
      this.maxOpacity = 0.12;
      this.speedMult = 0.25;
    }
    
    this.currentOpacity = 0;
  }

  update(width: number, height: number, mode: string, speedScale = 1, phase = 0, cognitiveLoad = 0) {
    let targetVx = this.baseVx;
    let targetVy = this.baseVy;

    // Cognitive load increases baseline speed and chaotic velocity
    const pressureMultiplier = 1 + (cognitiveLoad * 2.5);
    targetVx *= pressureMultiplier;
    targetVy *= pressureMultiplier;

    if (mode === "labor") targetVy = (Math.abs(this.baseVy) + 0.3) * pressureMultiplier;
    else if (mode === "divine") targetVy = (-Math.abs(this.baseVy) - 0.1) * pressureMultiplier;
    else if (mode === "observer") {
      targetVx = this.baseVx * 0.1;
      targetVy = this.baseVy * 0.1;
    } else if (mode === "governance" || mode === "emergent") {
      targetVx = (this.baseVx > 0 ? 0.2 : -0.2) * pressureMultiplier;
      targetVy = this.baseVy * 0.4 * pressureMultiplier;
    }

    this.vx += (targetVx - this.vx) * 0.02;
    this.vy += (targetVy - this.vy) * 0.02;
    
    // Cognitive load drastically increases turbulence (the "dancing screen")
    const turbulence = Math.sin(phase * (0.5 + cognitiveLoad) + this.phaseOffset) * (0.05 + cognitiveLoad * 0.15);
    
    this.x += (this.vx + turbulence) * speedScale * this.speedMult;
    this.y += this.vy * speedScale * this.speedMult;

    let fade = 1;
    if (this.y < height * 0.15) fade = this.y / (height * 0.15);
    else if (this.y > height * 0.85) fade = (height - this.y) / (height * 0.15);
    if (fade < 0) fade = 0;
    
    this.currentOpacity = ((Math.sin(phase * 0.8 + this.phaseOffset) + 1) / 2) * this.maxOpacity * fade;

    if (this.x < -30 || this.x > width + 30 || this.y < -30 || this.y > height + 30) {
      this.x = Math.random() * width;
      this.y = this.vy > 0 ? -20 : height + 20;
      this.char = FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)];
    }
  }

  draw(ctx: CanvasRenderingContext2D, colorStr: string, globalOpacity = 1) {
    if (this.currentOpacity <= 0.01) return;
    
    ctx.font = `${this.size}px "Space Grotesk", sans-serif`;
    
    if (this.layer === "far") {
      ctx.fillStyle = `rgba(${colorStr}, ${this.currentOpacity * globalOpacity * 0.5})`;
      ctx.fillText(this.char, this.x - 1, this.y);
      ctx.fillText(this.char, this.x + 1, this.y);
    } else if (this.layer === "mid") {
      ctx.fillStyle = `rgba(${colorStr}, ${this.currentOpacity * globalOpacity * 0.7})`;
      ctx.fillText(this.char, this.x - 0.5, this.y);
      ctx.fillText(this.char, this.x + 0.5, this.y);
    }
    
    ctx.fillStyle = `rgba(${colorStr}, ${this.currentOpacity * globalOpacity})`;
    ctx.fillText(this.char, this.x, this.y);
  }
}

export function CanvasRain({ activeCluster = "dormant", cognitiveLoad = 0 }: { activeCluster?: string, cognitiveLoad?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let frameId: number;
    let particles: SemanticFragmentParticle[] = [];
    let phase = 0;
    const currentColor = [...CLUSTER_COLORS.dormant];

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.floor((window.innerWidth * window.innerHeight) / 35000);
      particles = Array.from({ length: count }, () => new SemanticFragmentParticle(window.innerWidth, window.innerHeight));
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const targetColor = CLUSTER_COLORS[activeCluster] || CLUSTER_COLORS.dormant;
      currentColor[0] += (targetColor[0] - currentColor[0]) * 0.02;
      currentColor[1] += (targetColor[1] - currentColor[1]) * 0.02;
      currentColor[2] += (targetColor[2] - currentColor[2]) * 0.02;
      const colorStr = currentColor.map(Math.round).join(", ");

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#020202";
      ctx.fillRect(0, 0, width, height);

      // Cognitive load accelerates the global phase shift
      phase += 0.0022 + (cognitiveLoad * 0.005);

      ctx.globalCompositeOperation = "screen";
      const x = width / 2 + Math.sin(phase) * (width / 4);
      const y = height / 2 + Math.cos(phase * 0.5) * (height / 4);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, width);
      // Increased glow pressure with cognitive load
      gradient.addColorStop(0, `rgba(${colorStr}, ${0.06 + cognitiveLoad * 0.08})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      particles.forEach((particle) => {
        particle.update(width, height, activeCluster, 1, phase, cognitiveLoad);
        particle.draw(ctx, colorStr, 1);
      });

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, [activeCluster]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
