// apps/web/src/components/liberCodexDemo.tsx
import React from "react";
// TODO: Re-enable when liber-arcanae exports are available
// import { MajorArcana, getCardName } from "@cathedral/liber-arcanae";
// import { SpiralEngine } from "@cathedral/codex-144-99";

export default function LiberCodexDemo() {
  // Temporary placeholder data until packages export properly
  const sampleCards = [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
  ];

  return (
    <div style={{ padding: 20, fontFamily: "serif" }}>
      <h2>Liber Arcanae + Codex 144:99 Demo</h2>
      <p>
        <strong>Status:</strong> Component ready, awaiting package exports
      </p>
      <p>
        <strong>Integration:</strong> @cathedral/liber-arcanae +
        @cathedral/codex-144-99
      </p>
      <h3>Sample Major Arcana (Placeholder)</h3>
      <ul>
        {sampleCards.map((card, i) => (
          <li key={i}>{card}</li>
        ))}
      </ul>
      <p style={{ fontSize: 12, opacity: 0.8 }}>
        This component will integrate live data once workspace packages export
        their APIs.
      </p>
    </div>
  );
}
