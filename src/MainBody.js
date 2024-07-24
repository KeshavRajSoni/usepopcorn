import { useState } from "react";

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function MainBody(Props) {
    const { children } = Props;

    return (
        <main className="main">
            {children}
        </main>
    );

}


export function MoviesBox({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <OpenCloseButton isOpen={isOpen} setIsOpen={setIsOpen} />
            {isOpen && children}
        </div>
    )
}

export function OpenCloseButton({ isOpen, setIsOpen }) {
    return (
        <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
        >
            {isOpen ? "–" : "+"}
        </button>
    )
}
export function MovieList({ movies, handelSelectMovie }) {


    return (

        <ul className="list list-movies">

            {movies?.map((movie) => (
                <Movie movie={movie}
                    key={movie.imdbID}
                    handelSelectMovie={handelSelectMovie}

                />
            ))}
        </ul>
    )
}

export function Movie({ movie, handelSelectMovie }) {
    return (
        <>

            <li key={movie.imdbID} onClick={() => handelSelectMovie(movie.imdbID)}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                    <p>
                        <span>🗓</span>
                        <span>{movie.Year}</span>
                    </p>
                </div>
            </li>
        </>
    )
}

export function WatchedMovieBox({ watched }) {
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <div className="box">
            <OpenCloseButton isOpen={isOpen2} setIsOpen={setIsOpen2} />
            {isOpen2 && (
                <>
                    <WatchedMovieSummary watched={watched}></WatchedMovieSummary>
                    <WatchedMovieList watched={watched}></WatchedMovieList>

                </>
            )}
        </div>
    )
}

export function WatchedMovieSummary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    )
}

export function WatchedMovieList({ watched, }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} />

            ))}
        </ul>
    )
}
export function WatchedMovie({ movie }) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    )

}