import { ArchiveInteractiveField } from "@/components/archive";
import { ArrowDown, Orbit, BookOpen, BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020202] text-[#ebebe3] font-sans selection:bg-white/20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-3xl z-10 space-y-8">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#77746d] font-mono">
            HCI Research Artifact // 001
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1]">
            Rapid Associative Cognition <br />
            <span className="text-[#77746d] italic">Through Poetic Structure</span>
          </h1>
          <p className="text-sm md:text-base text-[#ebebe3]/60 max-w-xl mx-auto leading-relaxed">
            An exploratory semantic interaction environment investigating probabilistic semantic traversal, recursive systems-thinking, and nonlinear knowledge architectures.
          </p>
        </div>
        <div className="absolute bottom-12 flex flex-col items-center gap-4 animate-pulse opacity-50">
          <span className="text-[0.55rem] uppercase tracking-widest font-mono text-[#77746d]">Scroll to traverse</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </section>

      {/* Research Premise & Methodology */}
      <section className="py-32 px-6 bg-black/50 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[#77746d] mb-8">
              <BrainCircuit className="w-5 h-5" />
              <h2 className="text-[0.65rem] uppercase tracking-[0.2em] font-mono">Research Premise</h2>
            </div>
            <h3 className="text-2xl font-serif leading-snug">Nonlinear Cognition & Semantic Traversal</h3>
            <p className="text-sm text-[#ebebe3]/70 leading-loose">
              This artifact treats poetry not as static literature, but as a probabilistic semantic container. By identifying bi-grams, tri-grams, and semantic compounds, the system builds an interactive, atmospheric topology where users navigate through conceptual associations rather than linear narrative.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[#77746d] mb-8">
              <Orbit className="w-5 h-5" />
              <h2 className="text-[0.65rem] uppercase tracking-[0.2em] font-mono">Methodology</h2>
            </div>
            <h3 className="text-2xl font-serif leading-snug">Recursive Pattern Mapping</h3>
            <p className="text-sm text-[#ebebe3]/70 leading-loose">
              The interaction relies on an autonomous semantic engine that ingests plain text, filters stop words, and recursively clusters terms based on gravity and proximity. These clusters form a dynamic, Rupee-inspired spatial sigil (the Cognition Map) connecting macro concepts like Governance, Labor, and Divinity.
            </p>
          </div>
        </div>
      </section>

      {/* The Semantic Field (Interactive Component) */}
      <section className="relative bg-[#020202]">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#77746d] font-mono mb-2">
            Interaction Zone
          </p>
          <div className="w-px h-12 bg-gradient-to-b from-[#77746d]/50 to-transparent mx-auto" />
        </div>
        <ArchiveInteractiveField />
      </section>

      {/* HCI Implications & Limitations */}
      <section className="py-32 px-6 bg-black/50 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto space-y-32">
          
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-[#77746d] justify-center mb-12">
              <BookOpen className="w-5 h-5" />
              <h2 className="text-[0.65rem] uppercase tracking-[0.2em] font-mono">HCI Implications</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-white">Exploratory Interfaces</h4>
                <p className="text-xs text-[#ebebe3]/60 leading-relaxed">Demonstrating how ambiguity and non-deterministic pathways encourage deeper active reading and knowledge synthesis.</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-white">Cognition-Aware UX</h4>
                <p className="text-xs text-[#ebebe3]/60 leading-relaxed">Utilizing environmental atmospheric feedback (semantic rain, subtle visual blurring) to communicate the cognitive state of the system.</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-white">Semantic Architecture</h4>
                <p className="text-xs text-[#ebebe3]/60 leading-relaxed">Moving beyond hierarchical menus toward spatial, associative topologies for archiving complex thematic information.</p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-[0.65rem] uppercase tracking-[0.2em] font-mono text-[#77746d]">Limitations & Reflection</h2>
            <p className="text-sm text-[#ebebe3]/70 leading-loose">
              This system operates entirely on frontend heuristic parsing and predefined semantic anchors. It lacks a true NLP backend, risking pattern overfitting and subjective clustering biases. It is intended as an interaction probe and speculative research instrument, not a rigorous scientific measurement tool.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-white/5 relative z-10">
        <p className="text-[0.55rem] uppercase tracking-widest font-mono text-[#77746d]">
          Semantic Cognition Archive // Research Artifact
        </p>
      </footer>
    </main>
  );
}
