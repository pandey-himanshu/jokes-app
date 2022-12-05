import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState("");
    const [randomJoke, setRandomJoke] = useState("");
    const [selectedJoke, setSelectedJoke] = useState("");
    const [searchedJokes, setSearchedJokes] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    "https://api.chucknorris.io/jokes/categories"
                );
                if (response.status === 200 && response.data) {
                    setCategories(response.data);
                }
            } catch (error) {
                setError("Something went wrong!!!");
            }
        };
        fetchCategories();
    }, []);

    const handleSelect = (e) => {
        setRandomJoke("");
        setSelectedJoke("");
        setSearchedJokes([]);
        setSelected(e.target.value);
    };

    const getRandomJoke = async () => {
        setRandomJoke("");
        setSelectedJoke("");
        setSearchedJokes([]);
        try {
            const response = await axios.get(
                "https://api.chucknorris.io/jokes/random"
            );
            if (response.status === 200 && response.data) {
                setRandomJoke(response.data);
            }
        } catch (error) {
            setError("Something Went Wrong!!!");
        }
    };

    const getSelectedJoke = async () => {
        if (!selected) {
            alert("selected a category first");
            return;
        }
        setRandomJoke("");
        setSelectedJoke("");
        setSearchedJokes([]);
        try {
            const response = await axios.get(
                `https://api.chucknorris.io/jokes/random?category=${selected}`
            );
            if (response.status === 200 && response.data) {
                setSelectedJoke(response.data);
            }
        } catch (error) {
            setError("Something Went Wrong!!!");
        }
    };

    const getSearchedJokes = async () => {
        if (!search) {
            alert("Input cannot be empty");
            return;
        }
        setRandomJoke("");
        setSelectedJoke("");
        setSearchedJokes([]);
        try {
            const response = await axios.get(
                `https://api.chucknorris.io/jokes/search?query=${search}`
            );
            if (response.status === 200 && response.data) {
                setSearchedJokes(response.data);
            }
        } catch (error) {
            setError("Something Went Wrong!!!");
        }
    };

    if (error) {
        return (
            <>
                <nav>
                    <h1>Joke Generator App</h1>
                </nav>
                <p>{error}</p>
            </>
        );
    }

    return (
        <div className="App">
            <nav>
                <h1>Joke Generator App</h1>
            </nav>
            <div className="btn-container">
                <div className="button">
                    <button onClick={getRandomJoke}>Get a random joke</button>
                </div>
                <div className="button">
                    <select onChange={handleSelect}>
                        {categories.length > 0 &&
                            categories.map((category, idx) => (
                                <option key={idx} value={category}>
                                    {category}
                                </option>
                            ))}
                    </select>
                    <button onClick={getSelectedJoke}>
                        Get a selected catergory joke
                    </button>
                </div>
                <div className="button">
                    <input
                        type="text"
                        placeholder="search a joke"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={getSearchedJokes}>
                        Get searched joke
                    </button>
                </div>
            </div>
            {randomJoke && <p className="joke">"{randomJoke.value}"</p>}
            {selectedJoke && (
                <>
                    <h1 className="joke">Category: {selected}</h1>
                    <p className="joke">"{selectedJoke.value}"</p>
                </>
            )}
            {searchedJokes?.total > 0 &&
                searchedJokes.total > 0 &&
                searchedJokes.result.map((jokes) => (
                    <div key={jokes.id}>
                        <p className="joke">"{jokes.value}"</p>
                        <br />
                    </div>
                ))}
        </div>
    );
}

export default App;
