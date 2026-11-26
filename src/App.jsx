import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createBook } from '@openpageflip/core';
import '@openpageflip/core/styles.css';

const memories = [
  ['Kenangan 01', 'Foto 01', '/assets/jihan-memory-1.jpg'],
  ['Kenangan 02', 'Foto 02', '/assets/jihan-memory-2.jpg'],
  ['Kenangan 03', 'Foto 03', '/assets/jihan-memory-3.jpg'],
  ['Kenangan 04', 'Foto 04', '/assets/jihan-memory-4.jpg'],
  ['Kenangan 05', 'Foto 05', '/assets/jihan-memory-5.jpg'],
  ['Kenangan 06', 'Foto 06', '/assets/jihan-memory-6.jpg'],
  ['Kenangan 07', 'Foto 07', '/assets/jihan-memory-7.jpg'],
];
const memoryPages = [memories.slice(0, 3), memories.slice(3, 5), memories.slice(5, 7)];

function Leaf({ children, className = '', hard = false }) {
  return <article className={`leaf ${className}`} data-density={hard ? 'hard' : 'soft'}>{children}</article>;
}

function App() {
  const host = useRef(null);
  const book = useRef(null);
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(0);
  const spreads = 4;
  useEffect(() => {
    if (!host.current) return;
    const instance = createBook(host.current, {
      width: 400, height: 560, size: 'stretch', layout: 'spread', cover: true,
      startPage: 0, flipDuration: 1100, swipe: true, swipeDistance: 28,
      drag: true, hover: true, click: 'edges', shadows: true, shadowOpacity: 0.58,
    });
    book.current = instance;
    const onFlip = ({ page: current }) => { setPage(current); if (current > 0) setOpened(true); };
    instance.on('flip', onFlip);
    instance.on('init', ({ page: current }) => setPage(current));
    const onKey = e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); instance.flipNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); instance.flipPrev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); instance.off('flip', onFlip); instance.destroy(); book.current = null; };
  }, []);
  const start = useCallback(() => { setOpened(true); book.current?.flipNext(); }, []);
  const previous = useCallback(() => { book.current?.flipPrev(); }, []);
  const next = useCallback(() => { book.current?.flipNext(); }, []);
  const spread = Math.min(spreads, Math.max(1, Math.ceil(page / 2)));

  return <main className="scene">
    <div className="ambient"><span className="ambient-star">✦</span><span className="ambient-note">A little book of us</span><span className="ambient-date">MADE WITH LOVE · 2026</span></div>
    <div className="book-host" ref={host} aria-label="Photobook ulang tahun Jihan Adira">
      <Leaf className="cover" hard>
        <div className="cover-top">A KEEPSAKE FOR YOU <span>✦</span></div>
        <div className="cover-center"><span className="cover-flower">✿</span><p className="cover-pretitle">to my favorite person</p><h1>Happy Birthday<br/><i>Jihan Adira!</i></h1><p className="cover-sub">A little book of memories<br/>and all my love.</p></div>
        <div className="cover-bottom"><span>CHAPTER ONE</span><span>2026</span></div><div className="cover-ribbon">JA</div>
      </Leaf>
      <Leaf className="page-letter">
        <p className="eyebrow">A NOTE FOR YOUR DAY <span>✦</span></p><h2 className="letter-title">For<br/><i>Jihan</i></h2>
        <div className="letter-copy"><p>Selamat bertambah usia ya udah kepala dua aja haha.</p><p>Doa buat lu semoga lu selalu di kelilingi hal - hal baik dimana pun lu berada dan kapan pun, semoga kerja keras lu terbayarkan, semoga apa yang lu perjuangin tercapai, selalu diberikan kesehatan, kebahagian, dan di kelilingi orang - orang baik yang sayang serta tulus sama lu.</p><p>Dan pasti ga selalu mudah buat lu ngelewatin semuanya tapi gua yakin lu bisa ngelewatin ini semua karena ada keluarga lu, teman - teman lu, dan udah pasti gua yg selalu ngedukung lu.</p><p>Dan juga jaga kesehatan, jaga pola makan, istirahat yang cukup. Ya intinya jaga kesehatan.</p><p>Wish you all the best,<br/>Always stay happy and keep smiling!!</p></div><p className="signature signature-right">Love <span>♡</span></p><span className="page-number">01</span>
      </Leaf>
      <Leaf className="page-wish">
        <p className="right-index">A LITTLE WISH <span>—</span> 02</p><div className="wish-ornament" aria-hidden="true">✿</div><p className="right-quote">“May this next trip around the sun bring you all the little things that make your heart feel at home.”</p><span className="leaf-mark">N ✦</span><span className="page-number">02</span>
      </Leaf>
      {memoryPages.map((photos, i) => <Leaf className="page-memory" key={i}>
        <p className="right-index">{String(i + 3).padStart(2,'0')} <span>—</span> LITTLE MEMORIES</p><div className="memory-collage" data-count={photos.length}>{photos.map(([caption, date, src], photoIndex) => <figure className={`memory-tile tile-${photoIndex + 1}`} key={src}><img src={src} alt={caption}/><figcaption>{caption}</figcaption></figure>)}</div><p className="collage-date">— {photos.map(([, date]) => date).join(" · ")} —</p><span className="leaf-mark">N ✦</span><span className="page-number">{String(i + 3).padStart(2,'0')}</span>
      </Leaf>)}
      <Leaf className="page-ending">
        <p className="eyebrow">UNTIL THE NEXT CHAPTER <span>✦</span></p><div className="ending-ornament">✿</div><h2 className="ending-title">The best is<br/><i>yet to come.</i></h2><p className="ending-copy">Semoga langkahmu selalu ditemani hal-hal baik. Happy birthday, Jihan Adira!</p><p className="signature">Love, always <span>♡</span></p><span className="page-number">06</span>
      </Leaf>
      <Leaf className="page-final">
        <p className="right-index">WITH LOVE <span>—</span> ALWAYS</p><div className="memory-collage final-collage">{memories.slice(5).concat(memories.slice(0, 1)).map(([caption, , src]) => <figure className="memory-tile" key={src}><img src={src} alt={caption}/></figure>)}</div><p className="right-quote">More laughter, more wishes, and a lifetime of little memories.</p><span className="leaf-mark">N ✦</span><span className="page-number">08</span>
      </Leaf>
      <Leaf className="back-cover" hard><div className="back-mark">J <span>✦</span></div><p>THE END, FOR NOW</p></Leaf>
    </div>
    <nav className="controls" aria-label="Navigasi halaman">
      {!opened ? <button className="start-button" onClick={start}>Buka ceritanya <span>→</span></button> : <>
        <button className="nav-arrow" onClick={previous} disabled={page <= 0} aria-label="Spread sebelumnya">←</button>
        <div className="progress"><div className="progress-label"><span>SPREAD {String(spread).padStart(2,'0')}</span><span>{String(spreads).padStart(2,'0')}</span></div><div className="progress-track"><span style={{width:`${spread / spreads * 100}%`}}/></div><div className="progress-caption">{spread === spreads ? 'The end, for now' : 'Two pages, one little story'}</div></div>
        <button className="nav-arrow" onClick={next} disabled={page >= 7} aria-label="Spread berikutnya">→</button>
      </>}
    </nav>
    <footer className="hint">{opened ? 'DRAG A CORNER OR SWIPE TO TURN' : 'A STORY MADE JUST FOR YOU'} <span>·</span> JIHAN ADIRA</footer>
  </main>;
}
export default App;
