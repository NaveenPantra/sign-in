import React from 'react';
import withStyles from "react-jss";
import HealthifyMeLogo from "./../../assets/images/HealthifyMe_logo.png";

const styles = {
    root: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        background: "#fff",
        transform: "rotateY(180deg)",
        padding: "3rem",
    },
    backButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "4rem",
        height: "4rem",
        position: "absolute",
        top: "1rem",
        left: "1rem",
        borderRadius: "50%",
        boxShadow: "var(--shadow-light)",
        opacity: .5,
        transition: "all .3s linear",
        "&:hover": {
            boxShadow: "var(--shadow-dark)",
            opacity: 1,
        },
        "&:after": {
            content: '""',
            position: "absolute",
            display: "block",
            top: "50%",
            left: "50%",
            width: "53%",
            transform: "translate(-53%, -79%)",
            borderTop: "3px solid var(--color-text)",
            borderRadius: 10,
        },
    },
    backArrow: {
        display: "block",
        position: "relative",
        width: "70%",
        "&:after, &:before": {
            content: '""',
            position: "absolute",
            display: "block",
            borderTop: "2px solid var(--color-text)",
            borderRadius: 10,
            width: "49%",
            top: 0,
            left: 0,
            transformOrigin: "left",
        },
        "&:after": {
            transform: "translate(1px, -2px) rotateZ(-40deg)",
        },
        "&:before": {
            transform: "translate(1px, -3px) rotateZ(40deg)",
        },
    },
    figure: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        // transform: "translate(-50%, -190%) scale(1)",
        transform: "translate(-50%, -50%) scale(1.5)",
        transition: "all 1s linear",
    },
    figureCenter: {
        transform: "translate(-50%, -50%) scale(1.5)",
    },
    image: {
        display: "block",
        padding: "1.5rem",
        width: "10rem",
        height: "auto",
        objectFit: "cover",
        transition: "all .3s cubic-bezier(0.68, -0.6, 0.32, 1.6)",
    },
    isLoggedInImageState: {
        transform: "scale(2.5) translateY(-18px)",
    },
    heading: {
        position: "absolute",
        bottom: "15%",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "2.4rem",
        transition: "all .3s linear",
    },
};

const SignInBack = ({classes, isLoading, backClickHandler}) => {
    return (
        <div className={classes.root}>
            {
                !isLoading ?
                    (
                        <button
                            className={classes.backButton}
                            data-testid={"backButton"}
                            onClick={backClickHandler}>
                            <div className={classes.backArrow}/>
                        </button>
                    )
                    :
                    null
            }
            <figure
                className={`${classes.figure} ${isLoading ? classes.figureCenter : ""}`}>
                <img
                    className={`${classes.image} ${!isLoading ? classes.isLoggedInImageState : ""}`}
                    src={HealthifyMeLogo}
                    alt="HealthifyMe Logo"/>
                <figcaption
                    id={"loader_icon"}
                    style={{
                        transform: isLoading ? "scale(1)" : "scale(0)",
                        opacity: isLoading ? 1 : 0
                    }}/>
            </figure>
            <h4
                className={classes.heading}
                style={{
                    opacity: isLoading ? 0 : 1
                }}>
                Logged IN
            </h4>
        </div>
    );
};

export default withStyles(styles)(SignInBack);
