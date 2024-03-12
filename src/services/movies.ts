const API_KEY = '68f25f0e'

// Filtrar peliculas por busqueda del usuario
export const searchMovies = async ({ search, searchYear }: any) => {
    if (search === '') return null;

    try {
        // Consumir datos
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&y=${searchYear}`)
        const json = await response.json();

        const movies = json.Search;

        // Mapear datos
        return movies?.map((movie: any) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
          }));

    } catch(e) {
        throw new Error('Error al buscar.');
    }

}

// Obtener detalles de la película seleccionada

export const searchMovieById = async (id: string) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
        const json = await response.json();

        if (json.Response === 'False') {
            return null;
        }

        return {
            id: json.imdbID,
            title: json.Title,
            year: json.Year,
            poster: json.Poster,
            rating: json.imdbRating,
            plot: json.Plot,
            director: json.Director,
            actors: json.Actors,
            genre: json.Genre,
            runtime: json.Runtime
        };

    } catch (e) {
        console.error('Error al obtener detalles:', e);
        return null;
    }
};
