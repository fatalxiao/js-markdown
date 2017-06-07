function formatCRLF(str) {
    return str.replace(/\r\n?/g, '\n');
};

function countLines(str) {
    return str.split('\n').length - 1;
};

function preOrderTraverse(node, callback, deep = 0) {

    callback.call(this, node, deep);

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            preOrderTraverse.call(this, node.children[i], callback, deep + 1);
        }
    }

}

function postOrderTraverse(node, callback, deep = 0) {

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            postOrderTraverse.call(this, node.children[i], callback, deep + 1);
        }
    }

    callback.call(this, node, deep);

}

export default {
    formatCRLF,
    countLines,
    preOrderTraverse,
    postOrderTraverse
};