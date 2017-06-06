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

function calDeep(result) {

    if (!result) {
        return 0;
    }

    const indent = result[0].match(/^( {0,3}\t| {4})*/);

    if (!indent || !indent[0]) {
        return 0;
    }

    return ~~(indent[0].length / 4);

}

function calParentNode(block, deep) {

    if (deep === 0) {
        return block;
    }

    let parentNode = block;
    deep *= 2;
    for (; deep > 0; deep--) {

        if (!parentNode.children || parentNode.children.length < 1) {
            return parentNode;
        }

        parentNode = parentNode.children[parentNode.children.length - 1];

    }

    return parentNode;

}

function getLastListItemNode(block) {

    if (!block) {
        return;
    }

    let node = block,
        deep = 0,
        temp;

    while (node && node.children && node.children.length > 0) {

        temp = node.children[node.children.length - 1];

        if (temp.type !== 'List' && temp.type !== 'ListItem') {
            break;
        }

        node = temp;
        if (node.type === 'List') {
            deep++;
        }

    }

    return {node, deep};

}

function addListItem(result, block) {

    const deep = calDeep(result),
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

function appendParagraph(str, block) {

    const node = getLastListItemNode(block).node;

    if (!node) {
        return;
    }

    if (!node.children || node.children.length < 1) {

        str = node.rawValue + str;
        node.rawValue = '';

        node.children = [{
            display: 'block',
            type: 'Paragraph',
            rawValue: str
        }];

    } else {

        for (let i = 0, len = node.children.length; i < len; i++) {
            if (node.children[i].type === 'Paragraph') {
                node.children[i].rawValue += str;
                return;
            }
        }

        node.children.push({
            display: 'block',
            type: 'Paragraph',
            rawValue: str
        });

    }

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
            if (this.parseBlock(lines[index], 0, lines.slice(index))[0].type === 'Paragraph') {
                appendParagraph('\n' + lines[index], block);
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