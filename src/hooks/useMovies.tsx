import { useRef, useState } from 'react';
import { searchMovies } from '../services/movies';
import { Movie } from '../interfaces/types';

export function useMovies({ search, searchYear }: { search: string, searchYear: string }) {
 
  const [movies, setMovies] = useState<Movie[]>([]);
  const previousSearchTitle = useRef(search);
  const previousSearchYear = useRef(searchYear);

  // Obtener peliculas
  const getMovies = async () => {

    // Verificar que no se realice la misma busqueda
    if ( search === previousSearchTitle.current
      && searchYear === previousSearchYear.current ) return

    try {
      // Almacenar la busqueda más reciente
      previousSearchTitle.current = search
      previousSearchYear.current = searchYear
      const newMovies = await searchMovies({ search, searchYear })
      setMovies(newMovies)
    } catch (e) {
      throw new Error('Error al buscar peliculas.')
    } 
  }

  return { movies, getMovies };
}