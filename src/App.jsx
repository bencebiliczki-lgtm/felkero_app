import { useEffect, useRef, useState } from 'react'
import pouringSong from './assets/reactions/Ontesznóta_javitott.mp3'

const confettiColors = ['#7b2335', '#ad8c50', '#c96a7e', '#d6ba7f', '#fffdf9']
const reactionImages = Object.values(import.meta.glob('./assets/reactions/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}))

export default function App() {
  const [answer, setAnswer] = useState(null)
  const [confetti, setConfetti] = useState(null)
  const [reaction, setReaction] = useState(null)
  const [audioError, setAudioError] = useState(null)
  const reactionDialog = useRef(null)
  const acceptanceDialog = useRef(null)
  const audioPlayer = useRef(null)

  useEffect(() => {
    if (reaction && !reactionDialog.current.open) reactionDialog.current.showModal()
  }, [reaction])

  useEffect(() => {
    if (!confetti) return
    const timer = setTimeout(() => setConfetti(null), 6000)
    return () => clearTimeout(timer)
  }, [confetti])

  function accept() {
    setAnswer('yes')
    if (!acceptanceDialog.current.open) acceptanceDialog.current.showModal()
    setConfetti({
      id: Math.random(),
      pieces: Array.from({ length: 72 }, (_, index) => ({
        left: `${Math.random() * 100}%`,
        color: confettiColors[index % confettiColors.length],
        delay: `${Math.random() * 0.8}s`,
        duration: `${3 + Math.random() * 2}s`,
        drift: `${(Math.random() - 0.5) * 240}px`,
        spin: `${(Math.random() - 0.5) * 1440}deg`,
      })),
    })
  }

  function decline() {
    setAnswer('no')
    setConfetti(null)
    setAudioError(null)
    const attempt = (reaction?.attempt ?? 0) + 1
    if (attempt >= 4) {
      setReaction({ attempt })
      // Start in the click handler so playback retains the user's activation.
      if (audioPlayer.current.paused) {
        audioPlayer.current.play().catch(() => {
          setAudioError('A böngésző nem tudta elindítani a nótát. Próbáld újra a Nem gombbal!')
        })
      }
      return
    }
    const choices = reactionImages.filter((image) => image !== reaction?.image)
    const pool = choices.length ? choices : reactionImages
    setReaction({ attempt, image: pool[Math.floor(Math.random() * pool.length)] })
  }

  return (
    <main className="page">
      <dialog ref={acceptanceDialog} className="reaction-dialog acceptance-dialog" aria-labelledby="acceptance-title" onClick={(event) => {
        if (event.target === event.currentTarget) acceptanceDialog.current.close()
      }}>
      {confetti && (
        <div key={confetti.id} className="confetti" aria-hidden="true">
          {confetti.pieces.map((piece, index) => (
            <span key={index} className="confetti-piece" style={{
              left: piece.left,
              backgroundColor: piece.color,
              '--delay': piece.delay,
              '--duration': piece.duration,
              '--drift': piece.drift,
              '--spin': piece.spin,
            }} />
          ))}
        </div>
      )}
        <div className="reaction-content">
          <h2 id="acceptance-title">VIVÁT György Martin Vivát család!</h2>
          <button className="secondary dialog-close" onClick={() => acceptanceDialog.current.close()}>Bezárás</button>
        </div>
      </dialog>
      <section className="invitation" aria-labelledby="firma-name">
        <p className="context">Miskolci Egyetem · Kohász bALEK → Kohász Firma</p>
        <img className="metallurgy-crest" src="/kohasz-cimer.svg" alt="Kohász címer" width="96" height="101" />
        <p className="greeting">Jó szerencsét!</p>
        <p className="salutation">Mélyen tisztelt Isteni Fényben Tündöklő Dicső Firmák Fényes Koszorújának Oszlopos Tagja,</p>
        <h1 id="firma-name">György Martin</h1>
        <p className="vulgo">vulgo Crispy Gipsy Smokey Burger</p>
        <span className="divider" aria-hidden="true" />
        <p className="question">Leszel a Firma keresztapám?</p>
        <div className="actions" aria-label="Válasz a felkérésre">
          <button className="primary" onClick={accept} aria-pressed={answer === 'yes'}>Igen</button>
          <button className="secondary" onClick={decline} aria-pressed={answer === 'no'}>Nem</button>
          <button className="disabled" disabled>Végleges nem</button>
        </div>
        <p className="answer" role="status">{answer === 'yes' ? 'Van keresztapám! Jó szerencsét, Firma!' : answer === 'no' ? (reaction?.attempt >= 4 ? ':D Rendben Firmám' : 'De kérlek!') : ''}</p>
      </section>
      <dialog ref={reactionDialog} className="reaction-dialog" aria-labelledby="reaction-title" onClick={(event) => {
        if (event.target === event.currentTarget) reactionDialog.current.close()
      }}>
        <div className="reaction-content">
          {reaction?.image && <img className="reaction-image" src={reaction.image} alt="Kérlelő arckifejezés" />}
          <h2 id="reaction-title">{reaction?.attempt >= 4 ? ':D Rendben Firmám' : 'De kérlek!'}</h2>
          {reaction?.attempt >= 4 && (
            <div className="song">
              {audioError && <p role="alert">{audioError}</p>}
            </div>
          )}
          <button className="secondary dialog-close" onClick={() => reactionDialog.current.close()}>Bezárás</button>
        </div>
      </dialog>
      <audio ref={audioPlayer} src={pouringSong} preload="none" onError={() => {
        setAudioError('A hangfájlt nem sikerült betölteni.')
      }} />
    </main>
  )
}
