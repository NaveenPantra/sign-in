import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import {
    act,
    Simulate
} from "react-dom/test-utils";
import {
    waitForElement,
    waitForDomChange,
    wait
} from "@testing-library/react";
import SignInFront, { FORM_FIELDS, FORM_ERROR_STRINGS, INITIAL_FORM_STATE, INITIAL_ERROR_STATE } from "../signIn-front";

const SPY_FUNCTIONS = {
    onSubmit: jest.fn(),
};

let container = null;

const DOMSelectors = {
    form: 'form',
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
    errorMessage: 'p[data-testid="errorMessage"]',
};

describe("Test for SignIn Front", function() {
    beforeEach(function() {
        container = document.createElement("div");
        document.body.appendChild(container);
    });
    afterEach(function() {
        unmountComponentAtNode(container);
        container.remove();
    });

    test("Successful Submission", function() {
        ReactDOM.render(
            <SignInFront
                onSubmit={SPY_FUNCTIONS.onSubmit}
                errorMessage={""}/>,
            container
        );
        let DOMElements = getDOMElements();
        act(function() {
            Simulate.change(DOMElements.emailInput, {
                target: {
                    name: FORM_FIELDS.USERNAME,
                    value: "naveenpantra.np@gmail.com",
                },
            });
        });
        expect(DOMElements.emailInput.value).toEqual("naveenpantra.np@gmail.com");
        act(function() {
            Simulate.change(DOMElements.passwordInput, {
                target: {
                    name: FORM_FIELDS.PASSWORD,
                    value: "Cr7naveen",
                },
            });
        });
        expect(DOMElements.passwordInput.value).toEqual("Cr7naveen");
        act(function() {
            Simulate.submit(DOMElements.form);
        });
        expect(SPY_FUNCTIONS.onSubmit).toHaveBeenCalledTimes(1);
        expect(DOMElements.errorMessage.textContent).toEqual("");
    });

    test("Submitting Invalid data and Error Message", function() {
        jest.clearAllMocks();
        ReactDOM.render(
            <SignInFront
                onSubmit={SPY_FUNCTIONS.onSubmit}
                errorMessage={"Custom Error"}/>,
            container
        );
        let DOMElements = getDOMElements();
        act(function() {
            Simulate.change(DOMElements.emailInput, {
                target: {
                    name: FORM_FIELDS.USERNAME,
                    value: "a@b.c",
                },
            });
        });
        expect(DOMElements.emailInput.value).toEqual("a@b.c");
        act(function() {
            Simulate.change(DOMElements.passwordInput, {
                target: {
                    name: FORM_FIELDS.PASSWORD,
                    value: "cr7naveen",
                },
            });
        });
        expect(DOMElements.passwordInput.value).toEqual("cr7naveen");
        act(function() {
            Simulate.submit(DOMElements.form);
        });
        expect(SPY_FUNCTIONS.onSubmit).toHaveBeenCalledTimes(0);
        expect(DOMElements.errorMessage.textContent).toEqual("Custom Error");
    });
});

function getDOMElements() {
    let DOMElements = {};
    for (let selector in DOMSelectors) {
        DOMElements[selector] = container.querySelector(DOMSelectors[selector]);
    }
    return DOMElements;
}
