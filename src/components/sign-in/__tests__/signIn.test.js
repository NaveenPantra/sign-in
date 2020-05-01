import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import {
    act,
    Simulate
} from "react-dom/test-utils";
import {wait} from "@testing-library/react";
import SignIn from "../SignIn";
import * as SignInServiceMock from "./../../../services/Sign-in/SignInService";
import {FORM_FIELDS} from "../signIn-front";

jest.useFakeTimers();
jest.mock("./../../../services/Sign-in/SignInService", () => ({
    checkForValidCredentials: jest.fn(async (credentials) => {
        if (credentials.password === "Cr7naveeN") return Promise.reject({message: "Custom Error"});
        return Promise.resolve();
    }),
}));

let container = null;
const DOMSelectors = {
    form: 'form',
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
    errorMessage: 'p[data-testid="errorMessage"]',
};

describe("Testing SignIn Component", function() {
    beforeEach(function() {
        container = document.createElement("div");
        document.body.appendChild(container);
    });
    afterEach(function() {
        unmountComponentAtNode(container);
        container.remove();
    });

    test("Successful Submission", async function() {
        ReactDOM.render(
            <SignIn/>,
            container
        );
        let DOMElements = getDOMElements();
        act(function () {
            Simulate.change(DOMElements.emailInput, {
                target: {
                    name: FORM_FIELDS.USERNAME,
                    value: "naveenpantra.np@gmail.com",
                },
            });
        });
        expect(DOMElements.emailInput.value).toEqual("naveenpantra.np@gmail.com");
        act(function () {
            Simulate.change(DOMElements.passwordInput, {
                target: {
                    name: FORM_FIELDS.PASSWORD,
                    value: "Cr7naveen",
                },
            });
        });
        expect(DOMElements.passwordInput.value).toEqual("Cr7naveen");
        act(function () {
            Simulate.submit(DOMElements.form);
            jest.runAllTimers();
        });
        await wait (() => {}, {timeout: 0});
        expect(SignInServiceMock.checkForValidCredentials).toHaveBeenCalledTimes(1);
        expect(DOMElements.errorMessage.textContent).toEqual("");
    });

    test("UnSuccessful Submission and Error Message", async function() {
        ReactDOM.render(
            <SignIn/>,
            container
        );
        let DOMElements = getDOMElements();
        act(function () {
            Simulate.change(DOMElements.emailInput, {
                target: {
                    name: FORM_FIELDS.USERNAME,
                    value: "naveenpantra.np@gmail.com",
                },
            });
        });
        expect(DOMElements.emailInput.value).toEqual("naveenpantra.np@gmail.com");
        act(function () {
            Simulate.change(DOMElements.passwordInput, {
                target: {
                    name: FORM_FIELDS.PASSWORD,
                    value: "Cr7naveeN",
                },
            });
        });
        expect(DOMElements.passwordInput.value).toEqual("Cr7naveeN");
        act(function () {
            Simulate.submit(DOMElements.form);
            jest.runAllTimers();
        });
        await wait (() => {}, {timeout: 0});
        expect(SignInServiceMock.checkForValidCredentials).toHaveBeenCalledTimes(2);
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
