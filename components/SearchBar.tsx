type SearchBarProps = {
  defaultQuery: string;
};

export default function SearchBar({ defaultQuery }: SearchBarProps) {
  return (
    <form className="search-form" action="/" method="get">
      <label className="sr-only" htmlFor="show-search">
        Buscar Serie
      </label>
      <input
        id="show-search"
        className="search-input"
        name="q"
        autoComplete="off"
        defaultValue={defaultQuery}
        type="text"
        placeholder="Ej: Dark, The Office, Stranger Things..."
        aria-label="Buscar serie"
      />
      <button className="search-button" type="submit">
        Buscar
      </button>
    </form>
  );
}
