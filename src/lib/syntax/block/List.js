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
        checked: result[isFirst ? 2 : 3] === '[x]' ? true : (result[isFirst ? 2 : 3] === '[ ]' ? false : undefined),
        rawValue: result[isFirst ? 3 : 4] + '\n',
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

    let str = result[0],
        indent,
        count = 0;

    while (str && (indent = str.match(/^( {0,3}\t| {4}|\t)/))) {
        str = str.slice(indent[0].length);
        count++;
    }

    return count;

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

        for (let item of node.children) {
            if (item.type === 'Paragraph') {
                item.rawValue += str;
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

function parse(line, index, lines, renderTree) {

    const reg = /^( {0,3}\t| {4}|\t)*([\*\-\+]|\d+\.)\s+(\[[x| ]\])?(.*?)(?:\n|$)/;

    let result = line.match(/^([\*\+\-]|\d+\.)\s+(\[[x| ]\])?(.*?)(?:\n|$)/);

    if (!result) {
        return;
    }

    const block = initListRootNode(result, true);
    let temp, type;

    index++;
    for (let len = lines.length; index < len; index++) {

        if (lines[index] === '' || _.trim(lines[index]) === '' || _.trim(lines[index], '\t') === '') {
            appendParagraph(lines[index] + '\n', block);
            continue;
        }

        result = lines[index].match(reg);
        if (!result) {

            temp = _.trimStart(lines[index]);
            temp = _.trimStart(temp, '\t');
            type = this.parseBlock(temp, 0, [temp])[0].type;

            if (type === 'Paragraph' || type === 'BlankLine') {
                appendParagraph(lines[index] + '\n', block);
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
    return `<${tag}>${node.rawValue || ''}${data}</${tag}>`;
}

export default {
    parse,
    render
};