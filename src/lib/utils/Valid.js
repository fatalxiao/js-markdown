'use strict';

import Util from './Util';

/**
 * whether a variate is an array
 * @param obj
 * @returns {boolean}
 */
function isArray(obj) {
    return ({}).toString.call(obj) === '[object Array]';
}

/**
 * whether a string is blank(or only includes space and tab)
 * @param line
 * @returns {boolean}
 */
function isBlank(str) {
    return str === '' || Util.trim(str, ' \t') === '';
}

export default {
    isArray,
    isBlank
};