import { useEffect, useState } from "react";
import { Navbar, Logo, Search, NumResults } from "./Navbar";
import { MainBody, MoviesBox, WatchedMovieSummary, MovieList, WatchedMovieList } from "./MainBody";
import StarRating from './StarRating';
import { useMovie } from "./useMovie";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const key = 'e163636';

export default function App() {
  const [query, setQuery] = useState("thor");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(function () {

    const storedData = localStorage.getItem('watched');
    if (!storedData) return [];
    return JSON.parse(storedData);
  });
  //tt5295894


  const { isLoading, errMess, movies } = useMovie(query);

  // useEffect(function () {
  //   async function fetchMoies() {

  //     try {
  //       setErrMess('');
  //       setIsLoading(true);
  //       const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`);
  //       console.log(res);
  //       if (!res.ok) throw new Error("faild to fatch data");
  //       const data = await res.json();
  //       if (data.Response === 'False') { throw new Error("Movie not found"); };
  //       setMovies(data.Search);
  //     }
  //     catch (err) {
  //       console.error(err.message);
  //       setErrMess(err.message);
  //       setMovies([]);
  //     }
  //     finally {
  //       setIsLoading(false);

  //     }
  //   }
  //   if (query === "") {
  //     setMovies([]);
  //     setErrMess('');
  //     return;
  //   }
  //   fetchMoies();
  // }, [query]);

  //to add data to local storage, will be saved after reload.
  useEffect(function () {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [addMovieToWatched]);

  function handelSelectMovie(imdbID) {
    if (imdbID === selectedId) {
      setSelectedId(null);
      return;
    }
    setSelectedId(imdbID);
  }
  function handelDeselectMovie() {
    setSelectedId(null);
  }
  function addMovieToWatched(newMovie, userRating) {

    const runtime = +newMovie.Runtime.split(" ")[0];
    newMovie.runtime = runtime;
    newMovie.userRating = userRating;

    setWatched((watched) => [...watched, newMovie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, newMovie]));
    handelDeselectMovie();
  }


  return (
    <>
      <Navbar >
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <MainBody  >
        <MoviesBox  >
          {


            errMess ?
              <div className="error">{errMess}</div>
              :

              isLoading ?
                <div className="loader">loading ...</div>
                :
                <MovieList
                  movies={movies}
                  handelSelectMovie={handelSelectMovie}

                />

          }
        </MoviesBox>
        <MoviesBox>
          {selectedId
            ?
            <MovieDetails
              selectedId={selectedId}
              handelDeselectMovie={handelDeselectMovie}
              addMovieToWatched={addMovieToWatched}
            />
            // <Test />
            :
            <>
              <WatchedMovieSummary watched={watched}></WatchedMovieSummary>
              <WatchedMovieList watched={watched}></WatchedMovieList>
            </>
          }
        </MoviesBox>
      </MainBody>


    </>
  );
}

function MovieDetails({ selectedId, handelDeselectMovie, addMovieToWatched }) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const {
    Poster: poster,
    Title: title,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovie;

  useEffect(function () {
    async function showSelectedMovie() {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`);
      const data = await res.json();
      setSelectedMovie(data);
    }
    showSelectedMovie();
  }, [selectedId]);


  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={handelDeselectMovie}>&larr;</button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDb rating
          </p>
        </div>

      </header>
      <section>
        <div className="rating">

          <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
          <button className="btn-add" onClick={() => addMovieToWatched(selectedMovie, userRating)}>Add</button>
        </div>
        <p>
          <em>{plot}</em>

        </p>
        <p>starring {actors}</p>
        <p>director: {director}</p>
      </section>
    </div>
  )
}
function Test() {
  return (
    <div className="details">testing</div>
  )
}
