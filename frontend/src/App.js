import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';

import TiposPage from './components/pages/Tipos/TiposPages';
import MoviesPage from './components/pages/Movies/MoviesPages';
import DirectorMovies from './components/pages/Director/DirectorMovies'
import GeneroPages from './components/pages/Genero/GeneroPages';
import ProductoraPages from './components/pages/Productora/ProductoraPages';
function App() {
  return (
    <Router>
      <div className="App">

        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to="/movies" />} />

          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/tipos' element={<TiposPage />} />
          <Route path='/director' element={<DirectorMovies />} />
          <Route path='/genero' element={<GeneroPages />} />
          <Route path='/productora' element={< ProductoraPages />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;