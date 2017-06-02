function formatCRLF(str) {
    return str.replace(/\r\n?/g, '\n');
};

function countLines(str) {
    return str.split('\n').length - 1;
};

function preOrderTraverse(node, callback, deep = 0) {

    callback(node, deep);

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            preOrderTraverse(node.children[i], callback, deep + 1);
        }
    }

}

function postOrderTraverse(node, callback, deep = 0) {

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            postOrderTraverse(node.children[i], callback, deep + 1);
        }
    }

    callback(node, deep);

}

export default {
    formatCRLF,
    countLines,
    preOrderTraverse,
    postOrderTraverse
};