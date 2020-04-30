import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { Simulate } from "react-dom/test-utils";
import Input from "../Input";

const DOMSelectors = {
    input: 'input',
    label: 'label',
    helperContent: 'p[data-testid="helperContent"]',

};

const SPY_FUNCTIONS = {
    onChangeHandler: jest.fn(),
};

let container = null;

describe("Input Field", function() {
    beforeEach(function() {
        container = document.createElement("div");
        document.body.appendChild(container);
    });
    afterEach(function() {
        unmountComponentAtNode(container);
        container.remove();
    });

    test("Initial Rendering (Normal Behaviour)", function() {
        ReactDOM.render(
            <Input
                type={"email"}
                name={"username"}
                id={"username"}
                value={""}
                onChangeHandler={SPY_FUNCTIONS.onChangeHandler}
                placeholderLabelText={"Email Address"}
                helperContent={"Enter Valid Email Address"}
                error={false}/>,
            container
        );
        let DOMElements = getDOMElements();
        expect(DOMElements.input).toBeTruthy();
        expect(DOMElements.label).toBeTruthy();
        expect(DOMElements.input.value).toEqual("");
        expect(DOMElements.label.textContent).toEqual("Email Address");
        expect(DOMElements.helperContent).toBeTruthy();
        expect(DOMElements.helperContent.textContent).toEqual("Enter Valid Email Address");
    });

    test("Input with Error, Change Event and Initial value", function() {
        ReactDOM.render(
            <Input
                type={"password"}
                name={"password"}
                id={"password"}
                value={"mitusha"}
                onChangeHandler={SPY_FUNCTIONS.onChangeHandler}
                placeholderLabelText={"Email Address"}
                helperContent={"Enter Valid Email Address"}
                error={true}/>,
            container
        );
        let DOMElements = getDOMElements();
        expect(DOMElements.input.value).toEqual("mitusha");
        expect([...DOMElements.helperContent.classList].join("").toLowerCase()).toContain("error");
        Simulate.change(DOMElements.input, {});
        expect(SPY_FUNCTIONS.onChangeHandler).toHaveBeenCalledTimes(1);
    });
});


function getDOMElements() {
    let DOMElements = {};
    for (let selector in DOMSelectors) {
        DOMElements[selector] = container.querySelector(DOMSelectors[selector]);
    }
    return DOMElements;
}
