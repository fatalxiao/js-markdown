'use strict';

function initRoot() {
    return {
        isRoot: true,
        children: []
    };
}

function insertHeaderNode(node, level, innerHtml) {

    if (!node) {
        return;
    }

    const len = node.children.length;

    if (len < 1) {
        node.children.push({
            level,
            innerHtml,
            children: []
        });
        return;
    }

    const last = node.children[len - 1];

    // find right position
    if (last.level >= level) {
        node.children.push({
            level,
            innerHtml,
            children: []
        });
        return;
    }

    // if (len < 1) {
    //     node.children.push({
    //         level,
    //         innerHtml,
    //         children: []
    //     });
    //     return;
    // }

    if (!insertHeaderNode(last, level, innerHtml)) {
        return;
    }

}

function addHeaderNode(root, level, innerHtml) {

    if (!root.children || root.children.length < 1) {
        root.children = [{
            level,
            innerHtml,
            children: []
        }];
        return;
    }

    // debugger;

    insertHeaderNode(root, level, innerHtml);

}

export default {
    initRoot,
    insertHeaderNode,
    addHeaderNode
};