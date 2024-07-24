import { useState, useEffect } from "react";

const key = 'e163636';

export function useMovie(query, callback) {
    const [isLoading, setIsLoading] = useState(false);
    const [errMess, setErrMess] = useState("");
    const [movies, setMovies] = useState([]);
    useEffect(function () {
        async function fetchMoies() {

            try {
                setErrMess('');
                setIsLoading(true);
                const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`);
                console.log(res);
                if (!res.ok) throw new Error("faild to fatch data");
                const data = await res.json();
                if (data.Response === 'False') { throw new Error("Movie not found"); };
                setMovies(data.Search);
            }
            catch (err) {
                console.error(err.message);
                setErrMess(err.message);
                setMovies([]);
            }
            finally {
                setIsLoading(false);

            }
        }
        if (query === "") {
            setMovies([]);
            setErrMess('');
            return;
        }
        fetchMoies();
    }, [query]);

    return { isLoading, errMess, movies };
}