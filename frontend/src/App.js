import logo from './logo.svg';
import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">

        <Navbar />
        <Routes>
          <Route path='/' element = {<h1>Primera vista</h1>} />
          <Route path='/Hola' element = {<h1>Segunda vista</h1>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
