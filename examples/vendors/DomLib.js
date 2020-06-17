/**
 * @file DomLib.js
 */

/**
 * get element offset top and offset left
 * @param el
 * @returns {{top: number, left: number}}
 */
function getOffset(el) {
    let offset = {
        top: el.offsetTop,
        left: el.offsetLeft
    };
    while (el.offsetParent) {
        el = el.offsetParent;
        offset.top += el.offsetTop;
        offset.left += el.offsetLeft;
    }
    return offset;
};

export default {
    getOffset
};
