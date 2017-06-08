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

export default {
    formatCRLF,
    countLines,
    postOrderTraverse,
    encodeHTML,
    trimEndBlankLines
};