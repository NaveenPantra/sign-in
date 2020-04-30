import React from 'react';
import withStyles from "react-jss";
import Header from "./components/header/Header";
import SignIn from "./components/sign-in/SignIn";

const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
    }
};

function App({classes}) {
  return (
    <main className={classes.root}>
      <Header/>
      <SignIn/>
    </main>
  );
}

export default withStyles(styles)(App);
