import React, {useState, useRef} from 'react';
import withStyles from "react-jss";
import SignInFront from "./signIn-front";
import SignInBack from "./signIn-back";
import {checkForValidCredentials} from "../../services/Sign-in/SignInService";

const styles = {
    root: {
        width: "44rem",
        height: "48rem",
        borderRadius: 3,
        alignSelf: "center",
        marginTop: "auto",
        marginBottom: "auto",
        position: "relative",
        perspective: "100rem",
        background: "transparent",
        transform: "rotateY(0deg)",
        transition: "all .3s ease-in",
        animation: "enter 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
    inner: {
        position: "relative",
        width: "100%",
        height: "100%",
        textAlign: "center",
        transition: "transform 0.6s",
        transformStyle: "preserve-3d",
        boxShadow: "var(--shadow-dark)",
    }
};

async function fakeTimeWait(time) {
    return new Promise(res => {
        setTimeout(() => {
            res();
        }, time);
    });
}

const SignIn = ({classes}) => {
    const innerRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    async function onSubmit(credentials) {
        innerRef.current.classList.add("rotate_card");
        setIsLoading(true);
        await fakeTimeWait(4000);
        checkForValidCredentials(credentials).then(() => {
            setErrorMessage("");
            setIsLoading(false);
        }).catch(err => {
            innerRef.current.classList.remove("rotate_card");
            setIsLoading(false);
            setErrorMessage(err.message);
        })
    }

    return (
        <section
            className={classes.root}>
            <div
                className={`${classes.inner}`}
                id={"inner"}
                ref={innerRef}>
                <SignInFront
                    onSubmit={onSubmit}
                    errorMessage={errorMessage}/>
                <SignInBack
                    isLoading={isLoading}/>
            </div>
        </section>
    );
};

export default withStyles(styles)(SignIn);
