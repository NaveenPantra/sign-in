const SIGN_IN_SERVICE_URLS = {
    BASE_URL: `http://www.mocky.io/v2/5d9d9219310000153650e30b`,
};

async function checkForValidCredentials() {
    try {
        const response = await fetch(SIGN_IN_SERVICE_URLS.BASE_URL, {
            method: "GET",
        });
        return response.json();
    } catch (err) {
        return Promise.reject(err);
    }
}

export {checkForValidCredentials};
