// Contrato de las peliculas
export interface Movie  {
    id: string;
    title: string;
    year: string;
    poster: string;
    rating?: string;
    plot?: string;
    director?: string;
    actors?: string;
    genre?: string
    runtime?: string;
}

export interface Props {
    movies: Movie[];
}

// Contrato de los campos
export interface InputProps {
    id: string;
    title: string;
    placeholder: string;   
}