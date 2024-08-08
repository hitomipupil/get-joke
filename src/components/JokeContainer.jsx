import Loading from "./Loading";
import Joke from "./Joke";

import "./JokeContainer.css";
import { useEffect, useState } from "react";
import getJoke from "../apis/getJoke";

const JokeContainer = () => {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        const fetchJoke = async () => {
            try {
                const jokeData = await getJoke();
                setJoke(jokeData);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchJoke();
    }, [id]);

    const clickHandler = () => {
        setId((prevId) => prevId + 1);
    };

    return (
        <div className="joke-container">
            <div>
                <button onClick={clickHandler}>Get a Joke</button>
            </div>
            {loading && <Loading />}
            {joke && <Joke joke={joke} />}
            {error && <div className="error">Error getting a joke data</div>}
        </div>
    );
};

export default JokeContainer;
