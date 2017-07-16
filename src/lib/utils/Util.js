'use strict';

import Str from './Str';

/**
 * a tree traverse method
 * @param node
 * @param callback
 * @param deep
 */
function traverse(node, callback, deep = 0) {

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            traverse.call(this, node.children[i], callback, deep + 1);
        }
    }

    callback.call(this, node, deep);

}

/**
 * remove blank(or only includes space and tab) item in array
 * @param array
 * @returns {*}
 */
function trimEndBlankLines(array) {

    if (!array || array.length < 1) {
        return array;
    }

    let temp;
    while (array.length > 0) {
        temp = array[array.length - 1];
        if (temp === '' || Str.trim(temp, ' \t') === '') {
            array.pop();
        } else {
            break;
        }
    }

    return array;

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
    traverse,
    trimEndBlankLines,
    matchUrl
};