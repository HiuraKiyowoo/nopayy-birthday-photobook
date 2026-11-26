import React, { useCallback, useEffect, useRef, useState } from 'react';

const memories = [
  { src: '/assets/nopayy-memory-1.jpg', caption: 'A favorite little memory.', date: 'Always remembered' },
  { src: '/assets/nopayy-memory-2.jpg', caption: 'One of our happy moments.', date: 'A day to keep' },
  { src: '/assets/nopayy-memory-3.jpg', caption: 'Something worth remembering.', date: 'A little while ago' },
  { src: '/assets/nopayy-memory-4.jpg', caption: 'A little piece of us.', date: 'Kept close' },
  { src: '/assets/nopayy-memory-5.jpg', caption: 'A lovely little memory.', date: 'A favorite moment' },
  { src: '/assets/nopayy-final-photo.jpg', caption: 'And the story keeps going.', date: 'To be continued' },
];
const pages = [{ type: 'letter' }, ...memories.map(photo => ({ type: 'photo', ...photo })), { type: 'ending' }];

function App() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [turning, setTurning] = useState(false);
  const touch = useRef(null);
  const go = useCallback((step) => {
    if (!started) return;
    const next = Math.max(0, Math.min(pages.length - 1, index + step));
    if (next === index || turning) return;
    setDirection(step > 0 ? 'next' : 'prev'); setTurning(true);
    window.setTimeout(() => { setIndex(next); setTurning(false); }, 520);
  }, [index, started, turning]);
  useEffect(() => {
    const key = e => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [go]);
  const onTouchStart = e => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = e => { if (touch.current == null) return; const delta = e.changedTouches[0].clientX - touch.current; if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1); touch.current = null; };
  const current = pages[index];
  return <main className="scene" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    <div className="ambient"><span className="ambient-star">✦</span><span className="ambient-note">A little book of us</span><span className="ambient-date">MADE WITH LOVE · 2026</span></div>
    <section className={`book ${started ? 'is-open' : 'is-cover'} ${turning ? `turn-${direction}` : ''}`} aria-label="Photobook ulang tahun Nopayy">
      <div className="book-pages">
        {!started ? <div className="cover page">
          <div className="cover-top">A KEEPSAKE FOR YOU <span>✦</span></div>
          <div className="cover-center"><span className="cover-flower">✿</span><p className="cover-pretitle">to my favorite person</p><h1>Happy Birthday<br/><i>Nopayy!</i></h1><p className="cover-sub">A little book of memories<br/>and all my love.</p></div>
          <div className="cover-bottom"><span>CHAPTER ONE</span><span>2026</span></div>
          <div className="cover-ribbon">N</div>
        </div> : <div className={`spread page-content ${current.type}`} key={index}>
          <div className="left-leaf">
            {current.type === 'letter' ? <>
              <p className="eyebrow">A NOTE FOR YOUR DAY <span>✦</span></p>
              <h2 className="letter-title">To my<br/><i>dearest</i></h2>
              <div className="letter-copy"><p>Haiii nopayy!!</p><p>Happy birthday yaa. Selamat bertambah usia semoga kedepannya hal baik selalu datang ke kamu semoga apa yang kamu perjuangin bisa tercapai. Selalu di berikan kesehatan, kebahagian serta di kelilingi orang-orang baik yang tulus dan sayang sama kamu.</p><p>Whis you all the best,<br/>Always stay happy and keep smilling!!</p></div>
              <p className="signature">With all my love <span>♡</span></p>
            </> : current.type === 'photo' ? <>
              <p className="eyebrow">LITTLE MOMENTS, BIG LOVE <span>✦</span></p>
              <div className="photo-mat"><img src={current.src} alt={current.caption}/><span className="photo-pin">✦</span></div>
              <p className="photo-caption">{current.caption}</p><p className="photo-date">— {current.date} —</p>
            </> : <>
              <p className="eyebrow">UNTIL THE NEXT CHAPTER <span>✦</span></p><div className="ending-ornament">✿</div><h2 className="ending-title">The best is<br/><i>yet to come.</i></h2><p className="ending-copy">Semoga semua hal baik yang kamu impikan menemukan jalannya. Tetap jadi Nopayy yang selalu penuh senyum. Happy birthday, ya!</p><p className="signature">Love, always <span>♡</span></p>
            </>}
          </div>
          <div className="right-leaf">
            {current.type === 'letter' ? <><p className="right-index">01 <span>—</span> A LETTER</p><img className="right-art" src="/assets/nopayy-birthday-sticker-final.png" alt="Birthday illustration"/><p className="right-quote">“May this next trip around the sun bring you all the little things that make your heart feel at home.”</p><span className="leaf-mark">N ✦</span></> : current.type === 'photo' ? <><p className="right-index">{String(index + 1).padStart(2,'0')} <span>—</span> A MEMORY</p><img className="right-photo" src={current.src} alt="Kenangan"/><p className="right-photo-note">a moment worth keeping</p><span className="leaf-mark">N ✦</span></> : <><p className="right-index">08 <span>—</span> WITH LOVE</p><img className="ending-photo" src="/assets/nopayy-final-photo.jpg" alt="Foto kenangan terakhir"/><p className="right-quote">More laughter, more wishes, and a lifetime of little memories.</p><span className="leaf-mark">N ✦</span></>}
          </div><span className="spine-shadow"/><span className="page-number left-num">{String(index * 2 + 2).padStart(2,'0')}</span><span className="page-number right-num">{String(index * 2 + 3).padStart(2,'0')}</span>
        </div>}
      </div>
    </section>
    <nav className="controls" aria-label="Navigasi halaman">
      {!started ? <button className="start-button" onClick={() => setStarted(true)}>Buka ceritanya <span>→</span></button> : <>
        <button className="nav-arrow" onClick={() => go(-1)} disabled={index === 0} aria-label="Halaman sebelumnya">←</button>
        <div className="progress"><div className="progress-label"><span>MEMORY {String(index + 1).padStart(2,'0')}</span><span>{String(pages.length).padStart(2,'0')}</span></div><div className="progress-track"><span style={{width: `${((index + 1) / pages.length) * 100}%`}}/></div><div className="progress-caption">{index === pages.length - 1 ? 'The end, for now' : 'Take your time turning pages'}</div></div>
        <button className="nav-arrow" onClick={() => go(1)} disabled={index === pages.length - 1} aria-label="Halaman berikutnya">→</button>
      </>}
    </nav>
    <footer className="hint">{started ? 'SWIPE OR USE THE ARROW KEYS' : 'A STORY MADE JUST FOR YOU'} <span>·</span> NOPAYY</footer>
  </main>;
}
export default App;
