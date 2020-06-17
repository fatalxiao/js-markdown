/**
 * @file Event.js
 */

/**
 * bind new event
 * @param el
 * @param type
 * @param cb
 */
function addEvent(el, type, cb) {
    if (typeof window.addEventListener === 'function') {
        el.addEventListener(type, cb, false);
    } else if (typeof document.attachEvent === 'function') {
        el.attachEvent(`on${type}`, cb);
    } else {
        el[`on${type}`] = cb;
    }
}

/**
 * unbind event
 * @param el
 * @param type
 * @param cb
 */
function removeEvent(el, type, cb) {
    if (typeof window.removeEventListener === 'function') {
        el.removeEventListener(type, cb, false);
    } else if (typeof document.detachEvent === 'function') {
        el.detachEvent(`on${type}`, cb);
    } else {
        el[`on${type}`] = null;
    }
}

export default {
    addEvent,
    removeEvent
};
