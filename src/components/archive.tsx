"use client";

import { useEffect, useState, useMemo } from "react";
import { SemanticEngine } from "@/lib/semantic-engine";
import { CLUSTER_COLORS } from "@/lib/dataset";
import { CanvasRain } from "./canvas-rain";
import { motion, AnimatePresence } from "framer-motion";

export function ArchiveInteractiveField() {
  const [engine] = useState(() => new SemanticEngine());
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeMotif, setActiveMotif] = useState<string | null>(null);
  const [activeCluster, setActiveCluster] = useState<string>("dormant");
  const [path, setPath] = useState<string[]>([]);
  const [hoveredMotif, setHoveredMotif] = useState<string | null>(null);

  useEffect(() => {
    setAnalysis(engine.analyze(engine.parseDataset()));
  }, [engine]);

  if (!analysis) return null;

  const handleIgnite = (motif: string) => {
    const record = analysis.motifs.find((m: any) => m.term === motif);
    if (!record) return;

    setActiveMotif(motif);
    setActiveCluster(record.cluster);
    setPath((prev) => [...prev, motif]);
  };

  const handleReset = () => {
    setActiveMotif(null);
    setActiveCluster("dormant");
    setPath([]);
  };

  return (
    <div className="relative min-h-screen text-[#ebebe3]">
      <CanvasRain activeCluster={activeCluster} />

      {/* Semantic Rail */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6 text-[0.6rem] uppercase tracking-widest text-[#77746d]/60 font-mono">
        <div>
          <span className="block mb-1 opacity-50">state</span>
          <span className="text-[#ebebe3]/80">{activeMotif ? "traversal" : "passive"}</span>
        </div>
        <div>
          <span className="block mb-1 opacity-50">motif</span>
          <span className="text-[#ebebe3]/80">{activeMotif || "none"}</span>
        </div>
        <div>
          <span className="block mb-1 opacity-50">depth</span>
          <span className="text-[#ebebe3]/80">{path.length} nodes</span>
        </div>
      </aside>

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-32">
        <header className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-serif tracking-tight mb-6">
            Rapid Associative Cognition<br />
            <span className="text-xl md:text-2xl text-[#77746d] block mt-2">Through Poetic Structure</span>
          </h1>
          <p className="text-sm md:text-base text-[#ebebe3]/70 leading-relaxed font-sans">
            An exploratory semantic interaction environment investigating rapid associative cognition, recursive systems-thinking, probabilistic semantic traversal, and nonlinear knowledge architectures.
          </p>
        </header>

        {/* The Text Field */}
        <div className="space-y-24">
          {analysis.documents.map((doc: any, i: number) => (
            <div key={doc.id} className="relative group">
              <h3 className="text-[0.62rem] uppercase tracking-widest text-[#77746d]/40 mb-8 font-mono">
                {doc.title} / SYS_RECORD_{i}
              </h3>
              <div className="font-serif text-lg md:text-xl leading-loose tracking-wide text-[#ebebe3]/90">
                {doc.stanzas.map((stanza: string, sIdx: number) => (
                  <p key={sIdx} className="mb-6">
                    <TextLine 
                      text={stanza} 
                      motifs={analysis.motifs} 
                      activeMotif={activeMotif} 
                      hoveredMotif={hoveredMotif}
                      onIgnite={handleIgnite} 
                      onHover={setHoveredMotif}
                    />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cognition Map */}
        <div className="py-24 border-t border-white/5">
          <header className="text-center mb-16">
            <h2 className="text-[0.68rem] uppercase tracking-[0.25em] text-[#ebebe3]/80 font-mono">Cognition Topology</h2>
            <p className="text-[0.55rem] uppercase tracking-[0.18em] text-[#77746d]/60 mt-2 font-mono">Semantic Resonance Sigil</p>
          </header>
          
          <CognitionMap 
            topology={analysis.topology} 
            activeMotif={activeMotif} 
            onIgnite={handleIgnite} 
          />
        </div>
      </div>

      {/* Floating Controls */}
      <AnimatePresence>
        {activeMotif && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-2xl"
          >
            <div className="flex gap-2">
              {path.slice(-3).map((p, i) => (
                <span key={i} className="text-xs uppercase tracking-widest text-white/70 font-mono">
                  {p} {i < Math.min(path.length, 3) - 1 ? "→" : ""}
                </span>
              ))}
            </div>
            <div className="w-px h-4 bg-white/20 mx-2" />
            <button 
              onClick={handleReset}
              className="text-xs uppercase tracking-widest text-[#b5625c] hover:text-white transition-colors font-mono"
            >
              Reset Field
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextLine({ text, motifs, activeMotif, hoveredMotif, onIgnite, onHover }: any) {
  const motifRegex = useMemo(() => {
    const terms = motifs.map((m: any) => m.term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
    return new RegExp(`\\b(${terms})(?:s|d|ing)?\\b`, 'gi');
  }, [motifs]);

  const parts = [];
  let lastIndex = 0;
  let match;
  motifRegex.lastIndex = 0;

  while ((match = motifRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    
    const rawText = match[0];
    const normalized = match[1].toLowerCase().replace(/[^\\p{L}\\s'-]/gu, "").replace(/s$/, "").trim();
    const motif = motifs.find((m: any) => m.term === normalized) || motifs.find((m: any) => m.term === rawText.toLowerCase());

    if (motif) {
      parts.push({ type: 'motif', content: rawText, term: motif.term, cluster: motif.cluster });
    } else {
      parts.push({ type: 'text', content: rawText });
    }
    lastIndex = motifRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return (
    <>
      {parts.map((part, i) => {
        if (part.type === 'text') return <span key={i}>{part.content}</span>;
        
        const isActive = activeMotif === part.term;
        const isHovered = hoveredMotif === part.term;
        const shouldDim = activeMotif && !isActive;

        return (
          <button
            key={i}
            onClick={() => onIgnite(part.term)}
            onMouseEnter={() => onHover(part.term)}
            onMouseLeave={() => onHover(null)}
            className={`
              inline-block transition-all duration-500 cursor-pointer px-1 rounded-sm
              ${isActive ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-105' : ''}
              ${isHovered && !isActive ? 'bg-white/5 text-white' : ''}
              ${shouldDim ? 'opacity-30' : 'opacity-100'}
            `}
            style={isActive ? { color: `rgb(${CLUSTER_COLORS[part.cluster!]?.join(',') || '255,255,255'})` } : {}}
          >
            {part.content}
          </button>
        );
      })}
    </>
  );
}

function CognitionMap({ topology, activeMotif, onIgnite }: any) {
  const activeNodes = topology.slice(0, 36);

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto border-none">
      {/* Background Sigil Geometry */}
      <div 
        className="absolute inset-[-10%] rounded-full border border-white/5 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, transparent 33%, rgba(255,255,255,0.03) 33%, rgba(255,255,255,0.03) 34%, transparent 34%, transparent 45%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.03) 46%, transparent 46%),
            linear-gradient(to right, transparent 40%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.02) 41%, transparent 41%),
            repeating-radial-gradient(circle at center, transparent 0, transparent 15%, rgba(255,255,255,0.015) 15%, rgba(255,255,255,0.015) 15.5%)
          `
        }}
      />

      {/* SVG Circuitry */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        {activeNodes.map((motif: any, i: number) => 
          motif.relationships.map((rel: any, j: number) => {
            const target = activeNodes.find((n: any) => n.term === rel.target || n.term === rel.source);
            if (!target || target === motif) return null;

            const cx = (motif.map.x + target.map.x) / 2 + (Math.random() - 0.5) * 15;
            const cy = (motif.map.y + target.map.y) / 2 + (Math.random() - 0.5) * 15;
            const isActiveEdge = activeMotif === motif.term || activeMotif === target.term;

            return (
              <path
                key={`${i}-${j}`}
                d={`M ${motif.map.x} ${motif.map.y} Q ${cx} ${cy} ${target.map.x} ${target.map.y}`}
                fill="none"
                stroke={isActiveEdge ? "rgba(235,235,227,0.3)" : "rgba(255,255,255,0.03)"}
                strokeWidth={isActiveEdge ? "1.5" : "0.5"}
                className="transition-all duration-700"
                style={{ filter: isActiveEdge ? "drop-shadow(0 0 6px rgba(255,255,255,0.15))" : "none" }}
              />
            );
          })
        )}
      </svg>

      {/* Nodes */}
      {activeNodes.map((motif: any, i: number) => {
        const isActive = activeMotif === motif.term;
        const isDimmed = activeMotif && !isActive;

        return (
          <button
            key={i}
            onClick={() => onIgnite(motif.term)}
            className={`
              absolute -translate-x-1/2 -translate-y-1/2 uppercase tracking-widest font-mono cursor-pointer
              transition-all duration-500 hover:scale-110 hover:text-white
              ${isActive ? "text-white scale-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] z-10" : "text-white/50 z-0"}
              ${isDimmed ? "opacity-20" : "opacity-100"}
            `}
            style={{ 
              left: `${Math.max(-5, Math.min(105, motif.map.x))}%`, 
              top: `${Math.max(-5, Math.min(105, motif.map.y))}%`,
              fontSize: `${0.45 + Math.min(0.4, motif.gravity / 24)}rem`
            }}
          >
            {motif.term}
          </button>
        );
      })}
    </div>
  );
}
