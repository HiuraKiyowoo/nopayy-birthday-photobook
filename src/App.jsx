import React, { useCallback, useEffect, useRef, useState } from 'react';

const photos = [
  { src: '/assets/nopayy-memory-1.jpg', caption: 'A favorite little memory.', date: 'Always remembered' },
  { src: '/assets/nopayy-memory-2.jpg', caption: 'One of our happy moments.', date: 'A day to keep' },
  { src: '/assets/nopayy-memory-3.jpg', caption: 'Something worth remembering.', date: 'A little while ago' },
  { src: '/assets/nopayy-memory-4.jpg', caption: 'A little piece of us.', date: 'Kept close' },
  { src: '/assets/nopayy-memory-5.jpg', caption: 'A lovely little memory.', date: 'A favorite moment' },
  { src: '/assets/nopayy-final-photo.jpg', caption: 'And the story keeps going.', date: 'To be continued' },
];
const spreads = [
  { left: { type: 'letter' }, right: { type: 'wish' } },
  { left: { type: 'photo', ...photos[0] }, right: { type: 'photo', ...photos[1] } },
  { left: { type: 'photo', ...photos[2] }, right: { type: 'photo', ...photos[3] } },
  { left: { type: 'photo', ...photos[4] }, right: { type: 'photo', ...photos[5] } },
  { left: { type: 'ending' }, right: { type: 'final' } },
];

function Leaf({ page, number, side }) {
  return <article className={`leaf ${side} leaf-${page.type}`}>
    {page.type === 'letter' && <>
      <p className="eyebrow">A NOTE FOR YOUR DAY <span>✦</span></p>
      <h2 className="letter-title">To my<br/><i>dearest</i></h2>
      <div className="letter-copy"><p>Haiii nopayy!!</p><p>Happy birthday yaa. Selamat bertambah usia semoga kedepannya hal baik selalu datang ke kamu semoga apa yang kamu perjuangin bisa tercapai. Selalu di berikan kesehatan, kebahagian serta di kelilingi orang-orang baik yang tulus dan sayang sama kamu.</p><p>Whis you all the best,<br/>Always stay happy and keep smilling!!</p></div>
      <p className="signature">With all my love <span>♡</span></p>
    </>}
    {page.type === 'wish' && <>
      <p className="right-index">A LITTLE WISH <span>—</span> 02</p>
      <img className="right-art" src="/assets/nopayy-birthday-sticker-final.png" alt="Ilustrasi ulang tahun"/>
      <p className="right-quote">“May this next trip around the sun bring you all the little things that make your heart feel at home.”</p>
      <span className="leaf-mark">N ✦</span>
    </>}
    {page.type === 'photo' && <>
      <p className="right-index">{String(number).padStart(2,'0')} <span>—</span> A MEMORY</p>
      <div className="photo-mat"><img src={page.src} alt={page.caption}/><span className="photo-pin">✦</span></div>
      <p className="photo-caption">{page.caption}</p><p className="photo-date">— {page.date} —</p>
      <span className="leaf-mark">N ✦</span>
    </>}
    {page.type === 'ending' && <>
      <p className="eyebrow">UNTIL THE NEXT CHAPTER <span>✦</span></p>
      <div className="ending-ornament">✿</div>
      <h2 className="ending-title">The best is<br/><i>yet to come.</i></h2>
      <p className="ending-copy">Semoga semua hal baik yang kamu impikan menemukan jalannya. Tetap jadi Nopayy yang selalu penuh senyum. Happy birthday, ya!</p>
      <p className="signature">Love, always <span>♡</span></p>
    </>}
    {page.type === 'final' && <>
      <p className="right-index">WITH LOVE <span>—</span> ALWAYS</p>
      <img className="ending-photo" src={photos[5].src} alt="Foto kenangan penutup"/>
      <p className="right-quote">More laughter, more wishes, and a lifetime of little memories.</p>
      <span className="leaf-mark">N ✦</span>
    </>}
    <span className="page-number">{String(number).padStart(2,'0')}</span>
  </article>;
}

function App() {
  const [started, setStarted] = useState(() => new URLSearchParams(window.location.search).get('open') === '1');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [turning, setTurning] = useState(false);
  const touch = useRef(null);
  const go = useCallback((step) => {
    if (!started || turning) return;
    const next = Math.max(0, Math.min(spreads.length - 1, index + step));
    if (next === index) return;
    setDirection(step > 0 ? 'next' : 'prev');
    setTurning(true);
    window.setTimeout(() => { setIndex(next); setTurning(false); }, 780);
  }, [index, started, turning]);
  useEffect(() => {
    const key = e => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [go]);
  const onTouchStart = e => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = e => {
    if (touch.current == null) return;
    const delta = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1);
    touch.current = null;
  };
  const current = spreads[index];
  return <main className="scene" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    <div className="ambient"><span className="ambient-star">✦</span><span className="ambient-note">A little book of us</span><span className="ambient-date">MADE WITH LOVE · 2026</span></div>
    <section className={`book ${started ? 'is-open' : 'is-cover'} ${turning ? `turn-${direction}` : ''}`} aria-label="Photobook ulang tahun Nopayy">
      <div className="book-pages">
        {!started ? <div className="cover page">
          <div className="cover-top">A KEEPSAKE FOR YOU <span>✦</span></div>
          <div className="cover-center"><span className="cover-flower">✿</span><p className="cover-pretitle">to my favorite person</p><h1>Happy Birthday<br/><i>Nopayy!</i></h1><p className="cover-sub">A little book of memories<br/>and all my love.</p></div>
          <div className="cover-bottom"><span>CHAPTER ONE</span><span>2026</span></div><div className="cover-ribbon">N</div>
        </div> : <div className="spread page-content" key={index}>
          <Leaf page={current.left} number={index * 2 + 1} side="left-leaf"/>
          <Leaf page={current.right} number={index * 2 + 2} side="right-leaf"/>
          {turning && <div className={`flip-sheet ${direction === 'next' ? 'flip-forward' : 'flip-backward'}`}>
            <div className="flip-face flip-front"><Leaf page={direction === 'next' ? current.right : current.left} number={direction === 'next' ? index * 2 + 2 : index * 2 + 1} side={direction === 'next' ? 'right-leaf' : 'left-leaf'}/></div>
            <div className="flip-face flip-back"><Leaf page={direction === 'next' ? spreads[index + 1].left : spreads[index - 1].right} number={direction === 'next' ? (index + 1) * 2 + 1 : (index - 1) * 2 + 2} side={direction === 'next' ? 'left-leaf' : 'right-leaf'}/></div>
          </div>}
          <span className="spine-shadow"/>
        </div>}
      </div>
    </section>
    <nav className="controls" aria-label="Navigasi spread">
      {!started ? <button className="start-button" onClick={() => setStarted(true)}>Buka ceritanya <span>→</span></button> : <>
        <button className="nav-arrow" onClick={() => go(-1)} disabled={index === 0} aria-label="Spread sebelumnya">←</button>
        <div className="progress"><div className="progress-label"><span>SPREAD {String(index + 1).padStart(2,'0')}</span><span>{String(spreads.length).padStart(2,'0')}</span></div><div className="progress-track"><span style={{width: `${((index + 1) / spreads.length) * 100}%`}}/></div><div className="progress-caption">{index === spreads.length - 1 ? 'The end, for now' : 'Two pages, one little story'}</div></div>
        <button className="nav-arrow" onClick={() => go(1)} disabled={index === spreads.length - 1} aria-label="Spread berikutnya">→</button>
      </>}
    </nav>
    <footer className="hint">{started ? 'SWIPE TO TURN THE SPREAD' : 'A STORY MADE JUST FOR YOU'} <span>·</span> NOPAYY</footer>
  </main>;
}
export default App;
