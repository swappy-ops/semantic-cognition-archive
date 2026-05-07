import { SEEDED_CLUSTERS, POETRY_DATASET } from "./dataset";

export interface Token {
  raw: string;
  normalized: string;
  index: number;
}

export interface MotifRecord {
  term: string;
  count: number;
  documents: Set<string>;
  positions: Array<{ documentId: string; documentIndex: number; tokenIndex: number }>;
}

export interface DocumentRecord {
  id: string;
  text: string;
  title: string;
}

export function normalizeToken(token: string): string {
  return token.toLowerCase().replace(/[^\p{L}\s'-]/gu, "").replace(/s$/, "").trim();
}

export class SemanticEngine {
  private seededClusters: Record<string, string[]>;
  private stopWords: Set<string>;

  constructor() {
    this.seededClusters = SEEDED_CLUSTERS;
    this.stopWords = new Set(["the", "and", "but", "for", "with", "into", "from"]);
  }

  parseDataset(rawText: string = POETRY_DATASET) {
    const documents = rawText.split(/(?=\[.*?\])/).map((block, index) => {
      const match = block.match(/\[(.*?)\]/);
      const title = match ? match[1] : `Fragment ${index}`;
      const text = block.replace(/\[.*?\]/, "").trim();
      return { id: `doc_${index}`, title, text };
    }).filter(doc => doc.text.length > 0);

    return documents;
  }

  tokenize(text: string): Token[] {
    const words = Array.from(text.matchAll(/[\p{L}'-]+/gu)).map((match) => {
      const raw = match[0];
      return { raw, normalized: normalizeToken(raw), index: match.index as number };
    }).filter((token) => token.normalized.length > 2 && !this.stopWords.has(token.normalized));

    const seededPhrases = Object.values(this.seededClusters).flat().filter(w => w.includes(' '));
    const phraseTokens: Token[] = [];
    
    seededPhrases.forEach(phrase => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        phraseTokens.push({
          raw: match[0],
          normalized: normalizeToken(match[0]),
          index: match.index
        });
      }
    });

    return [...phraseTokens, ...words].sort((a, b) => a.index - b.index);
  }

  analyze(documents: DocumentRecord[]) {
    const docsWithTokens = documents.map((doc, documentIndex) => {
      const stanzas = doc.text.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
      const tokens = this.tokenize(doc.text).map((t, tokenIndex) => ({
        ...t, documentId: doc.id, documentIndex, tokenIndex
      }));
      return { ...doc, documentIndex, stanzas, tokens };
    });

    const motifs = this.extractMotifs(docsWithTokens);
    const graph = this.buildRelationshipGraph(docsWithTokens, motifs);
    const topology = this.buildTopology(motifs, graph);

    return { documents: docsWithTokens, motifs, graph, topology };
  }

  private extractMotifs(documents: any[]) {
    const frequency = new Map<string, MotifRecord>();
    const seededMotifs = new Map<string, string>();

    Object.entries(this.seededClusters).forEach(([cluster, words]) => {
      words.forEach(word => seededMotifs.set(normalizeToken(word), cluster));
    });

    documents.forEach((document) => {
      document.tokens.forEach((token: any) => {
        const current: MotifRecord = frequency.get(token.normalized) || {
          term: token.normalized, count: 0, documents: new Set(), positions: []
        };
        current.count += 1;
        current.documents.add(document.id);
        current.positions.push({ documentId: document.id, documentIndex: document.documentIndex, tokenIndex: token.tokenIndex });
        frequency.set(token.normalized, current);
      });
    });

    const records = new Map();

    seededMotifs.forEach((cluster, motif) => {
      const record = frequency.get(motif);
      if (record) {
        records.set(motif, { ...record, cluster, gravity: record.count * 2, score: record.count * 1.5 });
      }
    });

    return Array.from(records.values()).sort((a, b) => b.score - a.score);
  }

  private buildRelationshipGraph(documents: any[], motifs: any[]) {
    const motifByTerm = new Map(motifs.map(m => [m.term, m]));
    const relationshipMap = new Map();

    documents.forEach((document) => {
      const motifTokens = document.tokens.filter((t: any) => motifByTerm.has(t.normalized));
      motifTokens.forEach((token: any, index: number) => {
        const nearby = motifTokens.slice(index + 1, index + 10);
        nearby.forEach((other: any) => {
          if (token.normalized === other.normalized) return;
          const key = [token.normalized, other.normalized].sort().join("::");
          const rel = relationshipMap.get(key) || { source: token.normalized, target: other.normalized, weight: 0 };
          rel.weight += 1;
          relationshipMap.set(key, rel);
        });
      });
    });

    return Array.from(relationshipMap.values());
  }

  private buildTopology(motifs: any[], graph: any[]) {
    const relationsByMotif = new Map<string, any[]>(motifs.map(m => [m.term, []]));
    graph.forEach(edge => {
      relationsByMotif.get(edge.source)?.push(edge);
      relationsByMotif.get(edge.target)?.push(edge);
    });

    const clusterOrbitAngles: Record<string, number> = {
      observer: 0,
      governance: (Math.PI * 2) * 0.2,
      labor: (Math.PI * 2) * 0.4,
      divine: (Math.PI * 2) * 0.6,
      emergent: (Math.PI * 2) * 0.8
    };

    const clusterCounts: Record<string, number> = {};
    motifs.forEach(m => { clusterCounts[m.cluster] = (clusterCounts[m.cluster] || 0) + 1; });
    const clusterIndexes: Record<string, number> = {};

    return motifs.map((motif) => {
      const relationships = relationsByMotif.get(motif.term) || [];
      const gravity = relationships.reduce((acc: number, edge: any) => acc + edge.weight, 0);
      const clusterAngle = clusterOrbitAngles[motif.cluster] || 0;
      const orbitRadius = 30;

      const cIndex = clusterIndexes[motif.cluster] || 0;
      clusterIndexes[motif.cluster] = cIndex + 1;

      const nodeSubAngle = (cIndex / Math.max(1, clusterCounts[motif.cluster])) * Math.PI * 2;
      const nodeSubRadius = 5 + (20 - Math.min(15, gravity));

      const centerX = 50 + Math.cos(clusterAngle) * orbitRadius;
      const centerY = 50 + Math.sin(clusterAngle) * orbitRadius;

      const finalX = centerX + Math.cos(nodeSubAngle + (gravity * 0.5)) * nodeSubRadius;
      const finalY = centerY + Math.sin(nodeSubAngle + (gravity * 0.5)) * nodeSubRadius;

      return { ...motif, relationships, gravity, map: { x: finalX, y: finalY } };
    });
  }
}
