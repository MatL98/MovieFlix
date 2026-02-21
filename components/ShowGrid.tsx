'use client';

import { useState } from 'react';
import type { Show } from '@/types/tvmaze';
import ShowModal from '@/components/ShowModal';

type ShowGridProps = {
  shows: Show[];
  error: string | null;
};

function cleanSummary(summary: string | null) {
  if (!summary) {
    return 'Sin descripcion disponible.';
  }

  return summary.replace(/<[^>]+>/g, '');
}

export default function ShowGrid({ shows, error }: ShowGridProps) {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  if (error) {
    return (
      <p className="status error" aria-live="polite">
        {error}
      </p>
    );
  }

  if (shows.length === 0) {
    return (
      <p className="status" aria-live="polite">
        No se encontraron resultados.
      </p>
    );
  }

  return (
    <section className="results-grid" aria-live="polite">
      {shows.map((show, index) => (
        <article className="show-card" key={show.id} style={{ animationDelay: `${index * 70}ms` }}>
          <img
            className="poster"
            src={show.image?.medium ?? 'https://placehold.co/210x295?text=No+Image'}
            alt={show.name}
            width={210}
            height={295}
            loading="lazy"
          />

          <div className="card-content">
            <h3>{show.name}</h3>
            <p className="summary">{cleanSummary(show.summary)}</p>

            <div className="meta-row">
              <span className="chip">Score: {show.rating.average ?? 'N/A'}</span>
              <span className="chip">Estreno: {show.premiered?.slice(0, 4) ?? 'Sin fecha'}</span>
            </div>

            <div className="card-actions">
              <a className="show-link" href={show.url} target="_blank" rel="noreferrer">
                Ver en TVMaze
              </a>
              <button type="button" className="details-button" onClick={() => setSelectedShow(show)}>
                Mas info
              </button>
            </div>
          </div>
        </article>
      ))}
      {selectedShow ? <ShowModal show={selectedShow} onClose={() => setSelectedShow(null)} /> : null}
    </section>
  );
}
