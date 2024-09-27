import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TiposPage from './components/pages/Tipos/TiposPages';
import MoviesPage from './components/pages/Movies/MoviesPages';

function App() {
  return (
    <Router>
      <div className="App">

        <Navbar />
        <Routes>
          <Route path='/' element = {<h1>Primera vista</h1>} />

          <Route path='/tipos'  element= {<TiposPage/>}/>
          <Route path='/movies' element = {<MoviesPage/>} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;