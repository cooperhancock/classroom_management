import { AppBar, Button, Toolbar, Typography, Container } from "@mui/material";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getBuildingsFromApi } from "./api";
import React, { FC } from "react";
import { Rooms } from "./pages/Rooms";
import { FilterByBuilding } from "./components/FilterByBullding";

const App: FC = () => {
    return (
        <>
            <Router>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6">
                            Classroom Management
                        </Typography>
                        <Button component={Link} to="/" color="inherit">
                            Home
                        </Button>
                        <Button component={Link} to="/rooms" color="inherit">
                            Rooms
                        </Button>
                        <Button
                            component={Link}
                            to="/example_route"
                            color="inherit"
                        >
                            Example Route
                        </Button>
                    </Toolbar>
                </AppBar>
                <Toolbar />
                <Switch>
                    <Route exact path="/">
                        home page
                        <button
                            onClick={async () => {
                                const result = await getBuildingsFromApi();
                                console.log("result");
                                console.log(result);
                            }}
                        >
                            click me
                        </button>
                        <FilterByBuilding></FilterByBuilding>
                    </Route>
                    <Route path="/rooms">
                        <Rooms />
                    </Route>
                    <Route path="/example_route">
                        example route (not the home page)
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

export default App;
