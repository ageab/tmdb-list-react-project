import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Movie from "./pages/Movie";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <div className='App'>
      <div className='container mx-auto pb-10'>
        <Routes>
          <Route path='/' element={<Movie />} />
          <Route path='/page/:page' element={<Movie />} />
          <Route path='/title/:id' element={<MovieDetail />} />
          <Route path='about' element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
