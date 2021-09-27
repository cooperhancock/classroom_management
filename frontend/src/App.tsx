import { AppBar, Button, Toolbar, Typography, Container } from "@mui/material";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import React, { FC } from "react";

const App: FC = () => {
    return (
        <>
            <Container>
                <Router>
                    <AppBar position="fixed">
                        <Toolbar>
                            <Typography variant="h6">
                                Classroom Management
                            </Typography>
                            <Button component={Link} to="/" color="inherit">
                                Home
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
                        </Route>
                        <Route path="/example_route">
                            example route (not the home page)
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </>
    );
};

export default App;
