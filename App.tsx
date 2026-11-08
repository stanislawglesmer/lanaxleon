import { useEffect, useState } from 'react';
import './album.css';

type Photo = {
  file: number;
  ratio: number;
  alt: string;
};

// Ten replaceable files make up the eighteen-photo collection.
const photos: Photo[] = [
  { file: 2, ratio: 0.82, alt: 'Para w ciepłym świetle zachodzącego słońca' },
  { file: 3, ratio: 1.16, alt: 'Razem, trzymając się za ręce' },
  { file: 4, ratio: 0.94, alt: 'Bliski moment we dwoje' },
  { file: 5, ratio: 1.28, alt: 'Dłonie pod kwitnącymi gałęziami' },
  { file: 6, ratio: 0.76, alt: 'Radosna chwila w słońcu' },
  { file: 7, ratio: 1.09, alt: 'Kwiaty i wspólny spacer' },
  { file: 8, ratio: 1.34, alt: 'Razem pośród słoneczników' },
  { file: 9, ratio: 0.89, alt: 'Spacer nad brzegiem morza' },
  { file: 10, ratio: 1.2, alt: 'Uścisk o zachodzie słońca' },
  { file: 1, ratio: 0.72, alt: 'Cichy moment na plaży' },
  { file: 5, ratio: 1.12, alt: 'Wspomnienie z wiosennego dnia' },
  { file: 3, ratio: 0.86, alt: 'Mała chwila bliskości' },
  { file: 8, ratio: 0.79, alt: 'Słoneczny dzień razem' },
  { file: 2, ratio: 1.3, alt: 'Miłość w miejskim świetle' },
  { file: 7, ratio: 0.91, alt: 'Róże dla ukochanej osoby' },
  { file: 4, ratio: 1.18, alt: 'Wspólna podróż' },
  { file: 9, ratio: 0.74, alt: 'Krok za krokiem, razem' },
  { file: 6, ratio: 1.07, alt: 'Uśmiechy i kwiaty' },
];

function ArrowIcon({ direction = 'right' }: { direction?: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={direction === 'left' ? 'arrow-icon arrow-icon--left' : 'arrow-icon'}>
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function App() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -35px 0px', threshold: 0.08 },
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activePhoto === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null);
      if (event.key === 'ArrowRight') setActivePhoto((index) => index === null ? null : (index + 1) % photos.length);
      if (event.key === 'ArrowLeft') setActivePhoto((index) => index === null ? null : (index - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activePhoto]);

  return (
    <main>
      <section className="hero" id="poczatek" aria-label="Nasze chwile">
        <img className="hero__image" src="/photos/1.jpg" alt="Para wtulona w siebie na plaży" />
        <div className="hero__shade" />

        <header className="site-header">
          <a className="site-logo" href="#poczatek" aria-label="Nasze chwile, początek strony">
            <svg className="site-logo__heart" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M14 23.3 4.8 14.5C-1.2 8.7 7.2 1 14 8.3 20.8 1 26.8 8.7c4.2 5.4-2.9 10.1-12.8 14.6Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" /></svg>
            <span>nasze chwile<span className="site-logo__dot">.</span></span>
          </a>
          <a className="header-link" href="#album">Zobacz album <ArrowIcon /></a>
        </header>

        <div className="hero__content">
          <p className="hero__eyebrow">Album pełen miłości</p>
          <h1>Nasze <em>chwile.</em></h1>
          <p className="hero__description">Niektóre momenty są zbyt piękne, żeby pozwolić im minąć.</p>
          <a className="hero__cta" href="#album">Przejrzyj wspomnienia <span><ArrowIcon /></span></a>
        </div>
        <div className="hero__bottom" aria-hidden="true"><span>Przewiń, by odkryć więcej</span><span className="hero__bottom-line" /></div>
      </section>

      <section className="album" id="album" aria-labelledby="album-heading">
        <div className="album__intro reveal">
          <span className="section-kicker">01 / NASZ ALBUM</span>
          <h2 id="album-heading">Zatrzymane <em>w kadrze.</em></h2>
          <p>Osiemnaście chwil, do których zawsze chcemy wracać.</p>
        </div>

        <div className="gallery" aria-label="Galeria osiemnastu zdjęć">
          {photos.map((photo, index) => (
            <button
              className="gallery__item reveal"
              key={`${photo.file}-${index}`}
              type="button"
              style={{ aspectRatio: photo.ratio, transitionDelay: `${(index % 3) * 75}ms` }}
              onClick={() => setActivePhoto(index)}
              aria-label={`Otwórz zdjęcie ${index + 1} z 18: ${photo.alt}`}
            >
              <img src={`/photos/${photo.file}.jpg`} alt={photo.alt} loading="lazy" />
              <span className="gallery__number">{String(index + 1).padStart(2, '0')} / 18</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer__line" />
        <p>Na zawsze razem<span className="footer__heart">♡</span></p>
        <span className="footer__credit">made by glesmi</span>
      </footer>

      {activePhoto !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Zdjęcie ${activePhoto + 1} z 18`} onClick={() => setActivePhoto(null)}>
          <button className="lightbox__close" type="button" aria-label="Zamknij zdjęcie" onClick={() => setActivePhoto(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" /></svg>
          </button>
          <button className="lightbox__nav lightbox__nav--prev" type="button" aria-label="Poprzednie zdjęcie" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto - 1 + photos.length) % photos.length); }}><ArrowIcon direction="left" /></button>
          <img className="lightbox__image" key={activePhoto} src={`/photos/${photos[activePhoto].file}.jpg`} alt={photos[activePhoto].alt} onClick={(event) => event.stopPropagation()} />
          <button className="lightbox__nav lightbox__nav--next" type="button" aria-label="Następne zdjęcie" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto + 1) % photos.length); }}><ArrowIcon /></button>
          <span className="lightbox__count">{String(activePhoto + 1).padStart(2, '0')} <span>/</span> 18</span>
        </div>
      )}
    </main>
  );
}