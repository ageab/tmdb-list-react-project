import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headers from "../components/Header";

export default function MovieDetail() {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(
    function () {
      async function getDetail() {
        const request = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=e5acf462e047aba5ea63c73027f9fae8&language=en-US&append_to_response=external_ids,videos`
        );
        const response = await request.json();

        setMovies(response);
        setLoading(false);
      }
      getDetail();
    },
    [params]
  );

  return (
    <>
    <Headers />
    <section>
      {loading ? (
        <span>Loading ...</span>
      ) : (
        <div className='movieDetail'>
          <h1 className='font-bold text-2xl mb-5'>{movies.title}</h1>
          <div className='flex gap-x-4'>
            <div className='w-1/4'>
              <img
                className='object-cover max-w-full h-auto w-full'
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movies.poster_path}`}
                alt={movies.title}
              />
            </div>
            <div className='w-3/4'>
              <div className='grid grid-cols-1 gap-y-3'>
                <div className='relative flex items-center'>
                  <strong>Original Title : </strong> &nbsp;
                  <div className='relative'>{movies.original_title} min.</div>
                </div>
                <div className='relative flex items-center'>
                  <strong>Rating : </strong> &nbsp;
                  <div className='relative'>{movies.vote_average} min.</div>
                </div>
                <div className='relative flex items-center'>
                  <strong>Runtime : </strong> &nbsp;
                  <div className='relative'>{movies.runtime} min.</div>
                </div>
                <div className='relative flex items-center'>
                  <strong>Release Date : </strong> &nbsp;
                  <div className='relative'>{movies.release_date}</div>
                </div>
                <div className='relative flex items-center'>
                  <strong>Genres : </strong> &nbsp;
                  <div className='genres flex items-center'>
                    {movies.genres
                      .map((item) => {
                        return <div key={item.id}>{item.name}</div>;
                      })
                      .reduce((result, item) => [result, <span className="pr-1">,</span>, item])}
                  </div>
                </div>
                <div className='relative'>
                  <h2 className='text-lg font-semibold mb-2'>Synopsis</h2>
                  <p>{movies.overview}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="trailer my-8">
          <h2 className="mb-4 text-xl">Trailer {movies.title}</h2>
          <iframe width="100%" height="420" src={`https://youtube.com/embed/${movies.videos.results[0].key}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
          </div>
        </div>
      )}
    </section>
        
    </>
  );
}
