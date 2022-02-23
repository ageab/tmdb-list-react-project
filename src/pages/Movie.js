import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Headers from "../components/Header";
import Search from "../components/Search";

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const onNextPage = () => {
    setPage(page + 1);
  };

  const onPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      async function getMovies() {
        try {
          const request = await fetch(
            `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=e5acf462e047aba5ea63c73027f9fae8`
          );
          if (request.status === 200) {
            const response = await request.json();
            setMovies(response.results);
          }
        } catch (error) {
          console.error(error);
        } finally {
          return setLoading(true);
        }
      }
      getMovies();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [page]);

  useEffect(() => {
    if (searchInput !== "") {
      const delayDebounceFn = setTimeout(() => {
        async function searchMovies() {
          try {
            const request = await fetch(
              `https://api.themoviedb.org/3/search/movie?api_key=e5acf462e047aba5ea63c73027f9fae8&language=en-US&page=${page}&include_adult=false&query=${
                searchInput || ""
              }`
            );
            if (request.status === 200) {
              const response = await request.json();
              setMovies(response.results);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(true);
          }
        }
        searchMovies();
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchInput, page]);

  const onSearch = (event) => {
    setSearchInput(event.target.value);
    console.log(event.target.value);
  }

  return (
    <>
      <Headers />
      <section>
        <div className="my-5">
          <Search onChange={onSearch} />
        </div>
        {!loading ? (
          <span>Loading ...</span>
        ) : (
          <div className='relative'>
            <div className='grid lg:grid-cols-5 grid-cols-3 gap-4'>
              {movies.length > 0
                ? movies.map((movie) => {
                    return (
                      <div key={movie.id} className='relative'>
                        <Link to={`/title/${movie.id}`}>
                          <div className='image mb-2'>
                            <img
                              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
                              alt={movie.title}
                            />
                          </div>
                          <h2>{movie.title}</h2>
                        </Link>
                      </div>
                    );
                  })
                : "Not found"}
            </div>
            <div className='flex items-center justify-between my-8'>
              <Link
                to={`/page/${page - 1}`}
                className='bg-blue-500 py-1 px-4 inline-block rounded'
                onClick={onPrevPage}>
                Previous
              </Link>
              <Link
                to={`/page/${page + 1}`}
                className='bg-blue-500 py-1 px-4 inline-block rounded'
                onClick={onNextPage}>
                Next
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
