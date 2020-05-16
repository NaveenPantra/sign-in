import React, {useState} from 'react';
import withStyles from "react-jss";
import HealthifyMeCompleteLogo from "./../../assets/images/healthifyMe_complete_logo.png";
import Input from "../UI/Input/Input";
import {isNotValidEmailAddress, isNotValidPassword} from "../../utils/helpers/validationHelpers";

const styles = {
    root: {
        position: "absolute",
        height: "100%",
        width: "100%",
        padding: "3rem",
        backfaceVisibility: "hidden",
    },
    figure: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.4rem",
    },
    image: {
        width: "19rem",
        marginBottom: "1rem",
    },
    figcaption: {
        fontSize: "2.5rem",
    },
    heading: {
        textAlign: "center",
        fontSize: "1.5rem",
        fontWeight: "400",
        marginBottom: "4rem",
    },
    button: {
        display: "block",
        width: "100%",
        background: "var(--color-helathifyme)",
        padding: "1.4rem",
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "white",
        borderRadius: 4,
    },
    errorMessage: {
        fontSize: "1.2rem",
        color: "var(--color-red)",
        textAlign: "center",
        marginTop: "1rem",
        animation: "blink 1s linear infinite",
    }
};

const FORM_FIELDS = {
    USERNAME: "username",
    PASSWORD: "password",
};

const FORM_ERROR_STRINGS = {
    [FORM_FIELDS.USERNAME]: "Please Enter valid Email",
    [FORM_FIELDS.PASSWORD]: "Password should be more than 6 characters and should contain 1 Capital letter",
};

const INITIAL_FORM_STATE = {
    [FORM_FIELDS.USERNAME]: "",
    [FORM_FIELDS.PASSWORD]: "",
};

const INITIAL_ERROR_STATE = {
    [FORM_FIELDS.USERNAME]: false,
    [FORM_FIELDS.PASSWORD]: false,
};

const SignInFront = ({classes, onSubmit, errorMessage}) => {
    const [formState, setFormState] = useState(INITIAL_FORM_STATE);
    const [formErrorState, setFormErrorState] = useState(INITIAL_ERROR_STATE);
    function handleOnSubmit(event) {
        event.preventDefault();
        const formErrorState = {
            [FORM_FIELDS.USERNAME]: isNotValidEmailAddress(formState[FORM_FIELDS.USERNAME]),
            [FORM_FIELDS.PASSWORD]: isNotValidPassword(formState[FORM_FIELDS.PASSWORD]),
        };
        setFormErrorState(formErrorState);
        const isNotValidForm = Object.values(formErrorState).some(v => v);
        if (isNotValidForm) return null;
        onSubmit({
            [FORM_FIELDS.USERNAME]: formState[FORM_FIELDS.USERNAME],
            [FORM_FIELDS.PASSWORD]: formState[FORM_FIELDS.PASSWORD],
        });
    }
    function handleOnChange(event) {
        const {name, value} = event.target;
        setFormState(Object.assign({}, formState, {[name]: value}));
    }
    return (
        <div className={classes.root}>
            <figure className={classes.figure}>
                <img
                    src={HealthifyMeCompleteLogo}
                    alt="Logo"
                    className={classes.image}/>
                <figcaption className={classes.figcaption}>
                    Sign in
                </figcaption>
            </figure>
            <h3 className={classes.heading}>Use your HealthifyMe Account</h3>
            <form
                className={classes.form}
                onSubmit={handleOnSubmit}>
                <Input
                    name={FORM_FIELDS.USERNAME}
                    type={"email"}
                    onChangeHandler={handleOnChange}
                    value={formState[FORM_FIELDS.USERNAME]}
                    helperContent={ formErrorState[FORM_FIELDS.USERNAME] ? FORM_ERROR_STRINGS[FORM_FIELDS.USERNAME] : ""}
                    error={formErrorState[FORM_FIELDS.USERNAME]}
                    placeholderLabelText={"Email Address"}/>
                <Input
                    name={FORM_FIELDS.PASSWORD}
                    type={"password"}
                    onChangeHandler={handleOnChange}
                    value={formState[FORM_FIELDS.PASSWORD]}
                    helperContent={FORM_ERROR_STRINGS[FORM_FIELDS.PASSWORD]}
                    error={formErrorState[FORM_FIELDS.PASSWORD]}
                    placeholderLabelText={"Password"}/>
                <button
                    type={"submit"}
                    className={classes.button}>
                    Sign IN!
                </button>
                <p
                    className={classes.errorMessage}
                    data-testid={"errorMessage"}>
                    {errorMessage}
                </p>
            </form>
        </div>
    );
};

export default withStyles(styles)(SignInFront);
export {FORM_FIELDS, FORM_ERROR_STRINGS, INITIAL_FORM_STATE, INITIAL_ERROR_STATE};
