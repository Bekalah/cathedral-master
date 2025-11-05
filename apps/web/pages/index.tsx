import Head from "next/head";

export default function CathedralHome() {
  return (
    <>
      <Head>
        <title>Cathedral of Circuits | Codex 144:99</title>
        <meta
          name="description"
          content="Unified Cathedral experience integrating Codex 144:99, Living Arcanae, and mystical systems"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 100%)",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}>
        <header
          style={{
            padding: "2rem",
            textAlign: "center",
            borderBottom: "2px solid #8b5a8c",
            background: "rgba(20, 10, 30, 0.8)",
          }}>
          <h1
            style={{
              fontSize: "3rem",
              margin: "0 0 1rem 0",
              background: "linear-gradient(135deg, #ffd700, #ff6b35, #4ecdc4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            🏛️ Cathedral of Circuits
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#ffd700",
              margin: "0 auto 1rem",
              maxWidth: "800px",
            }}>
            Unified wisdom integrating Codex 144:99, Living Arcanae, and mystical systems
          </p>
        </header>

        <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              marginTop: "2rem",
            }}>
            <div
              style={{
                background: "rgba(139, 90, 140, 0.1)",
                borderRadius: "16px",
                padding: "2rem",
                border: "2px solid #8b5a8c",
              }}>
              <h2 style={{ color: "#8b5a8c", marginBottom: "1rem" }}>📊 Codex 144:99</h2>
              <p>The 99 Mystical Nodes system combining sacred geometry, frequencies, and archetypal wisdom</p>
              <ul style={{ fontSize: "0.9rem", lineHeight: "1.8" }}>
                <li>99 nodes mapped to consciousness states</li>
                <li>144 Hz base frequency harmonics</li>
                <li>Sacred geometry patterns</li>
              </ul>
            </div>

            <div
              style={{
                background: "rgba(45, 90, 39, 0.1)",
                borderRadius: "16px",
                padding: "2rem",
                border: "2px solid #7fb069",
              }}>
              <h2 style={{ color: "#7fb069", marginBottom: "1rem" }}>🔮 Living Arcanae</h2>
              <p>Tarot and mystical systems integrated with living wisdom traditions</p>
              <ul style={{ fontSize: "0.9rem", lineHeight: "1.8" }}>
                <li>Major Arcana integration</li>
                <li>Elemental correspondences</li>
                <li>Consciousness evolution paths</li>
              </ul>
            </div>

            <div
              style={{
                background: "rgba(74, 14, 78, 0.1)",
                borderRadius: "16px",
                padding: "2rem",
                border: "2px solid #ffd700",
              }}>
              <h2 style={{ color: "#ffd700", marginBottom: "1rem" }}>⚡ Open Source Stack</h2>
              <p>Built with modern web technologies for cross-platform deployment</p>
              <ul style={{ fontSize: "0.9rem", lineHeight: "1.8" }}>
                <li>Next.js 14 + React 18</li>
                <li>Three.js 3D visualization</li>
                <li>TurboRepo monorepo</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              background: "rgba(20, 10, 30, 0.9)",
              borderRadius: "16px",
              padding: "2rem",
              marginTop: "3rem",
              border: "2px solid #4ecdc4",
              textAlign: "center",
            }}>
            <h2 style={{ color: "#4ecdc4", marginBottom: "1.5rem" }}>🚀 System Status</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}>
              <div style={{ padding: "1rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
                <div style={{ fontSize: "0.9rem", color: "#7fb069" }}>Build System</div>
              </div>
              <div style={{ padding: "1rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
                <div style={{ fontSize: "0.9rem", color: "#7fb069" }}>Dependencies</div>
              </div>
              <div style={{ padding: "1rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
                <div style={{ fontSize: "0.9rem", color: "#7fb069" }}>TypeScript</div>
              </div>
              <div style={{ padding: "1rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🚀</div>
                <div style={{ fontSize: "0.9rem", color: "#ffd700" }}>Ready to Deploy</div>
              </div>
            </div>
          </div>
        </main>

        <footer
          style={{
            padding: "2rem",
            textAlign: "center",
            marginTop: "3rem",
            borderTop: "1px solid #4a0e4e",
            background: "rgba(20, 10, 30, 0.8)",
            color: "#888",
          }}>
          <p>🏛️ Cathedral of Circuits | 🔮 Codex 144:99 Integration | 🌙 Open Source Wisdom</p>
          <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
            Built with Next.js, React, Three.js | Deployed on GitHub Pages, Vercel, Cloudflare
          </p>
          <p style={{ fontSize: "0.7rem", marginTop: "1rem", color: "#666" }}>
            Repository: github.com/Bekalah/cathedral-master
          </p>
        </footer>
      </div>
    </>
  );
}
