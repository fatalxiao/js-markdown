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

    let result = block;
    while (result && result.children && result.children.length > 0) {
        result = result.children[result.children.length - 1];
    }

    return result;

}

function addListItem(result, block) {
    const deep = calDeep(result[1]);
    calParentNode(block, deep).children.push(generateListItemNode(result, false));
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

    const noDeepReg = /^([\*\+\-]|\d+\.)\s+(.*?)\s*(?:\n|$)/,
        deepReg = /^( {0,3}\t| {4})*([\*\-\+]|\d+\.)\s+(.*?)\s*(?:\n|$)/;

    let result = line.match(noDeepReg);

    if (!result) {
        return;
    }

    const block = initListRootNode(result, true);

    index++;
    for (let len = lines.length; index < len; index++) {

        if (lines[index] === '' || _.trim(lines[index]) === '') {
            break;
        }

        result = lines[index].match(deepReg);
        if (!result) {
            if (this.parseBlock(lines[index], 0, [lines[index]], [])[0].type === 'Paragraph') {
                appendParagraph(getLastListItemNode(block), '\n' + lines[index]);
                continue;
            } else {
                break;
            }
        }

        addListItem(result, block);

    }

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