function formatCRLF(str) {
    return str.replace(/\r\n?/g, '\n');
};

function countLines(str) {
    return str.split('\n').length - 1;
};

function postOrderTraverse(node, callback, deep = 0) {

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            postOrderTraverse.call(this, node.children[i], callback, deep + 1);
        }
    }

    callback.call(this, node, deep);

}

function encodeHTML(str) {

    if (!str) {
        return str;
    }

    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

}

function trimEndBlankLines(array) {

    if (!array || array.length < 1) {
        return array;
    }

    while (_.trim(array[array.length - 1]) === '') {
        array.pop();
    }

    return array;

}

function matchUrl(str) {
    const reg = /^(?:\s*)(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/i;
    return str.match(reg);
}

export default {
    formatCRLF,
    countLines,
    postOrderTraverse,
    encodeHTML,
    trimEndBlankLines,
    matchUrl
};