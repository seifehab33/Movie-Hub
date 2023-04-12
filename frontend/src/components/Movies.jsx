import React, { useState, useEffect } from "react";
import "./Movies.css";
function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=d903bcdae97d41411a8e54f49fb3b5d0"
      );
      const data = await res.json();
      setMovies(data.results);
    }

    fetchData();
  }, []);

  return (
    <>
      <section className="movies-s">
        <div className="container">
          <div className="row">
            {movies.map((movie) => (
              <div key={movie.id} className="col-md-3 mt-3 mb-3">
                <div className="movie Movies position-relative shadow-lg rounded">
                  <div className="rate  position-absolute end-0 top-0">
                    <span>{movie.vote_average}</span>
                  </div>
                  <img
                    className="card-img-top w-100"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default MovieList;
