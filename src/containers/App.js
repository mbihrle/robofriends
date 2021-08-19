import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

const App = (props) => {
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState("");

    const filteredRobots = robots.filter((robot) => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    };

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/")
            .then((response) => response.json())
            .then((users) => setRobots(users));
    }, []);

    return !robots.length ? (
        <h2>Robots Are Loading ...</h2>
    ) : (
        <>
            <div className="tc">
                <h1 className="f1">Create Your Robot</h1>
                <SearchBox searchChange={onSearchChange} />
            </div>
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filteredRobots} />
                </ErrorBoundry>
            </Scroll>
        </>
    );
};

export default App;
