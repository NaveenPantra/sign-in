import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import SignInBack from "../signIn-back";

let container = null;

const DOMSelectors = {
    figure: 'figure',
    figcaption: 'figcaption',
    h4: 'h4',
};

describe("Tests for SignIn Back", function() {
    beforeEach(function() {
        container = document.createElement("div");
        document.body.appendChild(container);
    });
    afterEach(function() {
        unmountComponentAtNode(container);
        container.remove();
    });

    test("Initial Rendering with Loading", function() {
        ReactDOM.render(
            <SignInBack
                isLoading={true}/>,
            container
        );
        let DOMElements = getDOMElements();
        expect([...DOMElements.figure.classList].join('').toLowerCase()).toContain("figurecenter");
        expect(DOMElements.figcaption.style.transform).toBe("scale(1)");
        expect(DOMElements.figcaption.style.opacity).toBe("1");
        expect(DOMElements.h4.style.opacity).toBe("0");
    });
    test("Initial Rendering without Loading", function() {
        ReactDOM.render(
            <SignInBack
                isLoading={false}/>,
            container
        );
        let DOMElements = getDOMElements();
        expect([...DOMElements.figure.classList].join('').toLowerCase()).not.toContain("figurecenter");
        expect(DOMElements.figcaption.style.transform).toBe("scale(0)");
        expect(DOMElements.figcaption.style.opacity).toBe("0");
        expect(DOMElements.h4.style.opacity).toBe("1");
    });
});

function getDOMElements() {
    let DOMElements = {};
    for (let selector in DOMSelectors) {
        DOMElements[selector] = container.querySelector(DOMSelectors[selector]);
    }
    return DOMElements;
}
