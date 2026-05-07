export const POETRY_DATASET = `[THE OBSERVER]
Sit and eat, stand and clean.
Cook for slaves, and stay unseen.
Make no noise, make no sound.
Keep your head directed to the ground.
Do what you're told, do what's right.
Or they will make sure you suffer tonight.

[THE NATION]
The men in uniforms stand tall and proud,
Their voices carry, sharp and loud.
But beneath the stars, in the quiet night,
A mother weeps, out of sight.

[THE LAWS]
The book of rules is thick and cold,
Written by men, both powerful and old.
We follow the lines, we walk the path,
Afraid to incur the righteous wrath.

[THE DIVINE]
When probability collapses into form,
And the chaos gathers in the storm.
The micro becomes the macro,
And the gods emerge from below.

[THE LABORER]
A shift ends, a shift begins.
We carry the weight of invisible sins.
The hands are calloused, the back is bent,
Until the final hour is spent.

[THE SYSTEM]
Macro organisations govern the small,
Building a cage, an invisible wall.
A moral boundary we dare not cross,
Lest we become the ultimate loss.

[THE MIND]
The associative cognition spins,
A web of thoughts where life begins.
In the semantic field, we drift and dream,
Caught forever in the silent stream.

[THE PARADOX]
A divine impossibility takes root,
The tree of logic bears no fruit.
Objective reality begins to bend,
As we approach the sudden end.`;

export const SEEDED_CLUSTERS = {
  observer: ["observer", "perception", "silence", "look", "see", "outlook", "reality", "objective reality", "existence", "cognition", "consciousness", "associative cognition", "semantic field"],
  governance: ["law", "governance", "institutions", "rules", "systems", "duty", "accountable", "bureaucracy", "nation", "police", "macro organisations", "moral boundary"],
  labor: ["labor", "captivity", "productivity", "work", "slaves", "enslavable", "cook", "waiter", "shift", "hungry", "sit and eat", "stand and clean"],
  divine: ["divine", "probability", "emergence", "impossibility", "gods", "macro", "micro", "paradoxes", "belief", "patterns", "divine impossibility"]
};

export const CLUSTER_COLORS: Record<string, [number, number, number]> = {
  observer: [108, 168, 171],
  governance: [184, 134, 85],
  labor: [181, 98, 92],
  divine: [140, 115, 166],
  emergent: [120, 138, 109],
  dormant: [8, 8, 8]
};
