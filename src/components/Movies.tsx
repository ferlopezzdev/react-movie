import { Props, Movie } from "../interfaces/types";
import { Link } from "react-router-dom";

export const ListOfMovies: React.FC<{ movies: Movie[] }> = ({ movies }) => {
    return (
        <ul className='movies'>
            {
                movies.map(movie => (
                    <li className="movie" key={movie.id}>
                        <Link to={`/${movie.id}`}>
                            <h3>{movie.title}</h3>
                            <p>{movie.year}</p>
                            <img src={movie.poster} alt={movie.title} />
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}


// Verificar si existen peliculas
export const MoviesList: React.FC<Props> = ({ movies }) => {
    const hasMovies = movies?.length > 0;

    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <p>No se encontraron resultados.</p>
    );
}