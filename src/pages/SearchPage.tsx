import React, { useEffect, useState, useRef } from 'react';
import { useMovies, } from '../hooks/useMovies';
import { ListOfMovies } from '../components/Movies';

// Buscador de peliculas
function useSearch() {
  const [search, setSearch] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [error, setError] = useState<string>('');
  const isFirstInput = useRef(true);

  useEffect(() => {
    // Verificar si el usuario aún no ha manipulado el input
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }


  }, [search])

  return { search, setSearch, searchYear, setSearchYear, error }
}

function SearchForm() {
  const { search, setSearch, searchYear, setSearchYear, error } = useSearch();
  const { movies, getMovies } = useMovies({ search, searchYear });

  // Obtener peliculas al buscar
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getMovies();
  }

  // Cambiar el estado de la busqueda por titulo
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  // Cambiar el estado de la busqueda por año
  const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchYear(event.target.value)
  }

  return (
    <header>
      <h1>Buscador de peliculas</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <label htmlFor="title">Titulo:</label>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChangeTitle}
            value={search}
            name='title'
            id='title'
            type='text'
            placeholder='Avengers, Star Wars, Spiderman...'
          />

          <label htmlFor="year">Año:</label>
          <input
            onChange={handleChangeYear}
            name='year'
            value={searchYear}
            id='year'
            type='number'
            placeholder='2016, 2017, 2018...'
          />

          <button type="submit">
            Buscar
          </button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <main>
        <ListOfMovies movies={movies} />
      </main>

    </header>

  );
}

export default SearchForm;
