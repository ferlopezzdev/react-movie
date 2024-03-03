/*
npm install react-router-dom @types/react-router-dom
*/
import { Routes, Route, Navigate} from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import MovieDetails from './pages/MovieDetails';
import './App.css';

function App() {
  return (
    <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/:id" element={<MovieDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
