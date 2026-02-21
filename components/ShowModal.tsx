'use client';

import { useEffect } from 'react';
import type { Show } from '@/types/tvmaze';

type ShowModalProps = {
  show: Show;
  onClose: () => void;
};

function cleanSummary(summary: string | null) {
  if (!summary) {
    return 'Sin descripcion disponible.';
  }

  return summary.replace(/<[^>]+>/g, '');
}

export default function ShowModal({ show, onClose }: ShowModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="show-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar modal">
          Cerrar
        </button>

        <div className="modal-layout">
          <img
            className="modal-poster"
            src={show.image?.original ?? show.image?.medium ?? 'https://placehold.co/360x500?text=No+Image'}
            alt={show.name}
            width={360}
            height={500}
          />

          <div className="modal-content">
            <h3 id="show-modal-title">{show.name}</h3>
            <p className="modal-summary">{cleanSummary(show.summary)}</p>

            <div className="modal-chips">
              <span className="chip">Rating: {show.rating.average ?? 'N/A'}</span>
              <span className="chip">Estreno: {show.premiered ?? 'Sin fecha'}</span>
              <span className="chip">
                Generos: {show.genres.length > 0 ? show.genres.join(', ') : 'No disponibles'}
              </span>
            </div>

            <a className="show-link" href={show.url} target="_blank" rel="noreferrer">
              Ver ficha oficial en TVMaze
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
