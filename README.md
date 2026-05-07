# Rapid Associative Cognition Through Poetic Structure

An exploratory semantic interaction environment investigating rapid associative cognition, recursive systems-thinking, probabilistic semantic traversal, and nonlinear knowledge architectures through poetic structures.

## Overview

This repository houses a production-grade HCI research artifact. It moves beyond standard hypertext or linear scrolling by treating poetry as a semantic container and cognition map. The interaction system relies on an autonomous frontend parsing engine that detects recurring conceptual motifs, extracts semantic structures, and builds an interactive, probabilistic semantic topology (the Cognition Map).

The experience is designed to feel like an atmospheric research instrument, encouraging exploratory traversal of ambiguity rather than deterministic navigation.

## Research Premise

Traditional web interfaces optimize for rapid, linear data retrieval. This project explores the opposite: **how can ambiguity, recursive abstraction, and atmospheric visual feedback encourage deeper systems-level reading?**

By converting raw poetic text into a spatial interaction map, the user traverses the relationships between concepts (e.g., Governance, Labor, Divinity, Perception) rather than reading a fixed narrative. 

### Key Methodologies
* **Semantic Extraction:** Bi-gram and tri-gram motif parsing extracts multi-word conceptual structures (e.g., "objective reality", "semantic field").
* **Probabilistic Clustering:** Extracted motifs are weighted by textual gravity and proximity, forming associative clusters without relying on an external LLM backend.
* **Environmental State Systems:** The interface acts as a reactive atmosphere. The visual background (semantic rain) alters its density, color, and turbulence based on the active cognitive mode.

## Features

* **Semantic Traversal:** Clickable anchors extract meaning dynamically from the text corpus.
* **Motif Propagation:** Selecting a node illuminates its conceptual siblings across the entire archive.
* **Cognition Trails:** A recursive breadcrumb system tracks the depth of the user's associative drift.
* **Symbolic Topology:** The Cognition Map is structured as an abstracted semantic sigil, utilizing recursive quadratic curves to visualize textual connections.
* **Atmospheric Rendering:** 60fps canvas-based semantic rain overlay providing ambient feedback.

## Interaction Philosophy

* **Restraint:** Visual elements (glows, trails) are strictly mapped to semantic logic, avoiding arbitrary decoration.
* **Ambiguity:** No fixed path exists. The user must explore the system to construct meaning.
* **Memory:** The interface "scars" and retains visual memory of traversed paths, acting as an external cognition layer.

## Technical Stack

* **Framework:** [Next.js (App Router)](https://nextjs.org/)
* **Language:** TypeScript
* **Styling:** TailwindCSS
* **Animation:** Framer Motion
* **Rendering:** Native HTML5 Canvas API (for high-performance atmospheric particle systems)
* **Icons:** Lucide React

## Architecture

* `/app` - Next.js routing and primary landing pages containing the research framing.
* `/components` - React components, separating the Canvas loop (`canvas-rain.tsx`) from the DOM tree (`archive.tsx`).
* `/lib` - The Vanilla TypeScript `semantic-engine.ts`, containing the tokenization, node mapping, and topological calculations.
* `/content` - Reserved for expanded datasets and markdown-based case study literature.

## Running Locally

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000)

## Future Directions

* **Real-time Vector Embeddings:** Replacing the heuristic frontend parser with a lightweight WASM-based local embedding model for true zero-shot semantic mapping.
* **User Traversal Export:** Allowing users to download a JSON map of their unique cognition path through the archive.

## Credits

Designed and engineered as a speculative HCI research probe and creative technology artifact.
