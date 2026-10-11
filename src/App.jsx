import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="container">
      <section className="card" aria-labelledby="welcome-title">
        <span className="badge">React + Vite</span>
        <h1 id="welcome-title">Szia, React!</h1>
        <p>Az alap appod elkészült. Innen indulhat a következő ötleted.</p>
        <div className="counter">
          <button onClick={() => setCount((value) => value + 1)}>
            Kattintások: {count}
          </button>
          <button className="secondary" onClick={() => setCount(0)}>
            Nullázás
          </button>
        </div>
        <p className="hint">A kezdéshez szerkeszd a <code>src/App.jsx</code> fájlt.</p>
      </section>
    </main>
  )
}
