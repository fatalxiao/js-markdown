'use strict';

import Valid from './Valid';

/**
 * String.at polyfill
 * @param index
 * @returns {*}
 */
function at(index) {

    if (!this) {
        throw TypeError();
    }

    const str = '' + this,
        len = str.length;

    if (index >= len) {
        return;
    }
    if (index < 0) {
        index = len - index;
    }

    let i = 0;
    for (let item of str) {
        if (i === index) {
            return item;
        }
    }

    return;

}

/**
 * string trim handle method
 * @param str
 * @param chars
 * @param position
 */
function trimHandle(str, chars = ' ', position) {

    if (typeof str !== 'string') {
        return;
    }

    let cs = chars;

    if (Valid.isArray(chars)) {
        cs = chars.join('');
    }

    const startReg = new RegExp(`^[${cs}]*`, 'g'),
        endReg = new RegExp(`[${cs}]*$`, 'g');

    if (position === 'start') {
        return str.replace(startReg, '');
    } else if (position === 'end') {
        return str.replace(endReg, '');
    }

    return str.replace(startReg, '').replace(endReg, '');

}

/**
 * string trim start(left)
 * @param str
 * @param chars
 * @returns {*}
 */
function trimStart(str, chars = ' ') {
    return trimHandle(str, chars, 'start');
}

/**
 * string trim end(right)
 * @param str
 * @param chars
 * @returns {*}
 */
function trimEnd(str, chars = ' ') {
    return trimHandle(str, chars, 'end');
}

/**
 * string trim(left and right)
 * @param str
 * @param chars
 * @returns {*}
 */
function trim(str, chars = ' ') {
    return trimHandle(str, chars);
}

/**
 * replace \r or \r\n to \n
 * @param str
 */
function formatCRLF(str) {
    return str.replace(/\r\n?/g, '\n');
};

/**
 * get line count
 * @param str
 * @returns {number}
 */
function countLines(str) {
    return str.split('\n').length - 1;
};

/**
 * replace specific symbol of html
 * @param str
 * @returns {*}
 */
function encodeHTML(str) {

    if (!str) {
        return str;
    }

    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

}

/**
 * match a url
 * @param str
 */
function matchUrl(str) {
    const reg = /^(?:\s*)(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/i;
    return str.match(reg);
}

export default {
    at,
    trimHandle,
    trimStart,
    trimEnd,
    trim,
    formatCRLF,
    countLines,
    encodeHTML,
    matchUrl
};