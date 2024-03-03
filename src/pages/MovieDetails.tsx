import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchMovieById } from '../services/movies';
import { Movie } from '../interfaces/types';
import './MovieDetails.css';
import { Link } from 'react-router-dom';

const MovieDetailsPage: React.FC = () => {
   // Obtener id por parametro
   const { id } = useParams<{ id: any }>();
   const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

   // Obtener detalles de la película por su id
   useEffect(() => {
      const fetchData = async () => {
         const data = await searchMovieById(id);
         setMovieDetails(data);
      };

      fetchData();
   }, [id]);

   // Renderizar icono de carga si aún no encuentra los detalles
   if (!movieDetails) {
      return (
         <div className="loading">
            <div className="spinner"></div>
         </div>
      );
   }

   return (
      <>
         <Link to="/">Volver</Link>
         <div className='page-movie'>

            <div className="movie-poster">
               <img src={movieDetails.poster} alt={movieDetails.title} />
            </div>

            <div className="movie-details">
               <div className="movie-header">
                  <h2>{movieDetails.title} &#9733; {movieDetails.rating}</h2>
                  <div className="movie-subheader">
                     <p>{movieDetails.year}</p>
                     <p>|</p>
                     <p>{movieDetails.runtime}</p>
                  </div>
                  <p>{movieDetails.plot}</p>

                  <ul className='movie-list'>
                     <li><span>Director:</span> {movieDetails.director}</li>
                     <li><span>Actores:</span> {movieDetails.actors}</li>
                     <li><span>Género:</span> {movieDetails.genre}</li>
                  </ul>

               </div>
            </div>

         </div>
      </>
   );
};

export default MovieDetailsPage;
