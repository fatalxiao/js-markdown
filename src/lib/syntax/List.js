import _ from 'lodash';

function generateListNode(result, isFirst) {
    return {
        display: 'block',
        type: 'List',
        isOrder: result[isFirst ? 1 : 2].includes('.'),
        children: []
    };
}

function generateListItemNode(result, isFirst) {
    return {
        display: 'block',
        type: 'ListItem',
        rawValue: result[isFirst ? 2 : 3],
        children: []
    };
}

function initListRootNode(result, isFirst) {

    const root = generateListNode(result, isFirst);
    root.children.push(generateListItemNode(result, isFirst));

    return root;

}

function calDeep(indent) {

    if (!indent) {
        return 0;
    }

    const reg = /^( {0,3}\t| {4})/;
    let count = 0,
        result;

    while (indent) {

        result = indent.match(reg);
        if (!result) {
            return count;
        }

        count++;
        indent = indent.slice(4);

    }

    return count;

}

function calParentNode(block, deep) {

    if (deep === 0) {
        return block;
    }

    let parentNode = block;
    for (let i = 0; i < deep; i++) {
        parentNode = parentNode.children[parentNode.children.length - 1];
    }

    return parentNode;

}

function getLastListItemNode(block) {

    if (!block) {
        return;
    }

    let node = block, deep = -1;
    while (node && node.children && node.children.length > 0) {
        node = node.children[node.children.length - 1];
        deep++;
    }

    return {node, deep};

}

function addListItem(result, block) {

    const deep = calDeep(result[1]),
        {deep: lastItemDeep} = getLastListItemNode(block),
        parentNode = calParentNode(block, deep);

    let node;
    if (deep <= lastItemDeep) {
        node = generateListItemNode(result, false);
    } else {
        node = generateListNode(result, false);
        node.children.push(generateListItemNode(result, false));
    }

    parentNode.children.push(node);

}

function appendParagraph(node, str) {

    if (!node) {
        return;
    }

    str = node.rawValue + str;
    delete node.rawValue;

    if (!node.children) {
        node.children = [];
    }

    node.children.unshift({
        display: 'block',
        type: 'Paragraph',
        rawValue: str
    });

}

function parse(line, index, lines, blocks) {

    const reg = /^( {0,3}\t| {4})*([\*\-\+]|\d+\.)\s+(.*?)\s*(?:\n|$)/;

    let result = line.match(/^([\*\+\-]|\d+\.)\s+(.*?)\s*(?:\n|$)/);

    if (!result) {
        return;
    }

    const block = initListRootNode(result, true);

    index++;
    for (let len = lines.length; index < len; index++) {

        if (lines[index] === '' || _.trim(lines[index]) === '') {
            break;
        }

        result = lines[index].match(reg);
        if (!result) {
            if (this.parseBlock(lines[index], 0, [lines[index]], [])[0].type === 'Paragraph') {
                appendParagraph(getLastListItemNode(block).node, '\n' + lines[index]);
                continue;
            } else {
                break;
            }
        }

        addListItem(result, block);

    }

    console.log(block);

    return [block, index - 1];

}

function render(data = '', node) {
    const tag = node.isOrder ? 'ol' : 'ul';
    return `<${tag}>${data}</${tag}>`;
}

export default {
    parse,
    render
};