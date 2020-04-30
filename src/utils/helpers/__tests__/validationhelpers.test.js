import {isNotValidPassword, isNotValidEmailAddress} from "../validationHelpers";

const EMAILS = {
    VALID_EMAILS: [
        'naveenpantra.np@gmail.com',
        'gurappanaidupantra@gmail.com',
        'naveen.pantra@zestmoney.in',
        'naveen.pantra@melorra.com',
    ],
    IN_VALID_EMAILS: [
        '.@gmail.com',
        'a@b.c',
        '.amazon@ze.in',
        'duch..h@gmail.com',
        'usa.@gm.in',
        "",
    ],
};

const PASSWORDS = {
    VALID_PASSWORDS: [
        'Cr7naveen',
        'cr7Mitusha',
        'naveenCr7',
        'naveencR7',
        './[];_+=-A'
    ],
    IN_VALID_PASSWORDS: [
        'cr7naveen',
        'stuart little',
        'cr7mitusha',
        '-=_+<>,.',
        '{}alpha[]',
        'asc',
        "",
    ],
};

describe("Testing for Valid EMAIL Addresses", function() {
    EMAILS.VALID_EMAILS.forEach(function(EMAIL) {
        it(`${EMAIL} is Valid.`, function() {
            expect(isNotValidEmailAddress(EMAIL)).toBeFalsy();
        });
    });
});

describe("Testing for InValid EMAIL Addresses", function() {
    EMAILS.IN_VALID_EMAILS.forEach(function(EMAIL) {
        it(`${EMAIL} is InValid.`, function() {
            expect(isNotValidEmailAddress(EMAIL)).toBeTruthy();
        });
    });
});

describe("Testing for Valid Passwords", function() {
    PASSWORDS.VALID_PASSWORDS.forEach(function(PASSWORD) {
        it(`${PASSWORD} is Valid`, function() {
            expect(isNotValidPassword(PASSWORD)).toBeFalsy();
        });
    });
});

describe("Testing for InValid Passwords", function() {
    PASSWORDS.IN_VALID_PASSWORDS.forEach(function(PASSWORD) {
        it(`${PASSWORD} is InValid`, function() {
            expect(isNotValidPassword(PASSWORD)).toBeTruthy();
        });
    });
});
