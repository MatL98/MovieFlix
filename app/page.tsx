import SearchBar from '@/components/SearchBar';
import ShowGrid from '@/components/ShowGrid';
import type { Show, ShowSearchItem } from '@/types/tvmaze';

const DEFAULT_QUERY = 'action';

async function getShows(query: string): Promise<{ shows: Show[]; error: string | null }> {
  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return { shows: [], error: 'No se pudo obtener informacion de TVMaze.' };
    }

    const data = (await response.json()) as ShowSearchItem[];
    return { shows: data.map((item) => item.show), error: null };
  } catch {
    return { shows: [], error: 'Ocurrio un error al consultar la API. Intentalo de nuevo.' };
  }
}

type HomeProps = {
  searchParams?: {
    q?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const requestedQuery = (searchParams?.q ?? '').trim();
  const query = requestedQuery || DEFAULT_QUERY;
  const { shows, error } = await getShows(query);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>

      <main id="main-content" className="main-shell">
        <header className="hero-panel">
          <p className="eyebrow">MovieFlix</p>
          <h1>
            Descubre Tu Siguiente <span>Maraton</span> en Minutos
          </h1>
          <p className="subtitle">
            Busca series con renderizado en servidor para cargar resultados listos desde la URL.
          </p>
          <SearchBar defaultQuery={query} />
          <div className="hero-stats" aria-hidden="true">
            <span>Server-first en Next</span>
            <span>Resultados por URL</span>
            <span>Diseno responsive</span>
          </div>
        </header>

        <section className="results-shell" aria-labelledby="results-heading">
          <div className="results-head">
            <h2 id="results-heading">Resultados para "{query}"</h2>
            <p>Selecciona una serie para abrir su ficha oficial en TVMaze.</p>
          </div>
          <ShowGrid shows={shows} error={error} />
        </section>
      </main>
    </>
  );
}
