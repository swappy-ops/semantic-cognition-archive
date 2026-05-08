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
            Semantic Cognition <br />
            <span className="text-[#77746d] italic">The Observatory</span>
          </h1>
          <p className="text-sm md:text-base text-[#ebebe3]/60 max-w-xl mx-auto leading-relaxed">
            "I don't remember things. I live them. That overexposure to emotions causes an aversion to a performance without purpose."
          </p>
        </div>
        <div className="absolute bottom-12 flex flex-col items-center gap-4 animate-pulse opacity-50">
          <span className="text-[0.55rem] uppercase tracking-widest font-mono text-[#77746d]">Scroll to traverse</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </section>

      {/* Research Premise & Foreword */}
      <section className="py-32 px-6 bg-black/50 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto space-y-24">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#77746d] mb-8">
                <BrainCircuit className="w-5 h-5" />
                <h2 className="text-[0.65rem] uppercase tracking-[0.2em] font-mono">The Premise</h2>
              </div>
              <h3 className="text-2xl font-serif leading-snug">Thoughts Arriving in Pairs</h3>
              <div className="text-sm text-[#ebebe3]/70 leading-loose space-y-4">
                <p>
                  Poems are themselves a very final medium. My exploration of such intends to balance the technical accuracy of the levels that the emotional experience—the poetry—intends to invoke. Cognitively heavy words are used here to maximize the bridge between the emotional and technical parts of this showcase.
                </p>
                <p>
                  Every part of thinking is connected. You can't think about one thing without believing in something around it. Every thought we have doesn't exist alone, that itself says a lot about the need for societal adjourning, that even our thoughts arrive in pairs.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#77746d] mb-8">
                <Orbit className="w-5 h-5" />
                <h2 className="text-[0.65rem] uppercase tracking-[0.2em] font-mono">The Interaction</h2>
              </div>
              <h3 className="text-2xl font-serif leading-snug">The Canvas of Bias</h3>
              <div className="text-sm text-[#ebebe3]/70 leading-loose space-y-4">
                <p>
                  Click on words that sound similar and it increases the effects, the cognitive load, the different ways the screen dances. The text glows, everything shifts when a bias enters your mind. The need isn't to just recognize said bias, it is to understand and let it colour your canvas.
                </p>
                <p>
                  Let it expand your questioning but don't let it constrain your beliefs, because analysis of beliefs is the foundational rock of questioning. Do enjoy the observatory.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-12 flex justify-end">
            <p className="text-[0.65rem] uppercase tracking-widest text-[#77746d] font-mono">
              2200 07.05.26 — 0210 08.05.26
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
