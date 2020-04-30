import React from 'react';
import withStyles from "react-jss";

const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "2.4rem",
    },
    inputHolder: {
        display: "block",
        position: "relative",
    },
    input: {
        border: "2px solid var(--color-border)",
        borderRadius: 3,
        padding: "1.7rem",
        width: "100%",
        fontSize: "1.7rem",
        "&:focus + label, &:not(:placeholder-shown) + label": {
            opacity: 1,
            cursor: "pointer",
            transform: "translate(-3px, -16px) scale(.8)",
        },
    },
    label: {
        position: "absolute",
        top: 0,
        left: 0,
        fontSize: "1.7rem",
        transform: "translate(14px, 13px) scale(1)",
        opacity: 0.8,
        padding: 5,
        cursor: "text",
        background: "white",
        transition: " all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    helperContent: {
        margin: ".5rem 0 0 .7rem",
        textAlign: "left",
    },
    errorInput: {},
    errorContent: {
        color: "var(--color-red)",
        fontWeight: 600,
    },

};

const Input = ({classes, type, value, name, onChangeHandler, helperContent, error, placeholderLabelText}) => {
    return (
        <div className={classes.root}>
            <div className={classes.inputHolder}>
                <input
                    type={type}
                    className={classes.input}
                    name={name}
                    id={name}
                    value={value}
                    placeholder={placeholderLabelText}
                    onChange={onChangeHandler}/>
                <label
                    htmlFor={name}
                    className={classes.label}>
                    {placeholderLabelText}
                </label>
            </div>
            {
                helperContent ?
                    <p
                        className={`${classes.helperContent} ${error ? classes.errorContent : ""}`}
                        data-testid={"helperContent"}>
                        {helperContent}
                    </p>
                    :
                    null
            }
        </div>
    );
};

export default withStyles(styles)(Input);
