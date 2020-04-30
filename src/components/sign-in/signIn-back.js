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

const SignInBack = ({classes, isLoading}) => {
    return (
        <div className={classes.root}>
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
