// import React, { useState, useEffect } from "react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

import { requestRobots, setSearchField } from "../actions";

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots()),
    };
};

const App = (props) => {
    const { searchField, onSearchChange, robots, isPending, onRequestRobots } =
        props;

    const filteredRobots = robots.filter((robot) => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });


    useEffect(() => {
        onRequestRobots();
    }, [onRequestRobots]);

    return isPending ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
