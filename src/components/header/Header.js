import React from 'react';
import withStyles from "react-jss";
import HealthifyMeCompleteLogo from "./../../assets/images/healthifyMe_complete_logo.png";

const styles = {
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "2rem 2rem",
        boxShadow: "var(--shadow-light)",
        justifySelf: "flex-start",
    },
    figure: {
        paddingRight: "1.5rem",
        borderRight: "1px solid var(--color-text)",
        marginRight: "1rem",
    },
    image: {
        width: "10rem",
        height: "100%",
        objectFit: "contain",
    },
    link: {
        fontSize: "1.3rem",
    }
};

const Header = ({classes}) => {
    return (
        <header className={classes.root}>
            <figure className={classes.figure}>
                <img
                    src={HealthifyMeCompleteLogo}
                    alt="HealthifyMe Complete Logo"
                    className={classes.image}/>
            </figure>
            <a href="/" className={classes.link}>Accounts</a>
        </header>
    );
};

export default withStyles(styles)(Header);
