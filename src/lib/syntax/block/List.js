import _ from 'lodash';

function generateListItem(result) {
    return {
        display: 'block',
        type: 'ListItem',
        checked: result[2] === '[x]' ? true : (result[2] === '[ ]' ? false : undefined),
        content: [result[3]],
        children: []
    };
}

function parse(line, index, lines, renderTree) {

    const reg = /^([\*\-\+]|\d+\.)\s+(\[[x| ]\])?(.*?)(?:\n|$)/,
        indentReg = /^( {0,3}\t| {4}|\t)*(.*?)(?:\n|$)/;

    let result = line.match(reg);

    if (!result) {
        return;
    }

    const block = {
        display: 'block',
        type: 'List',
        isOrder: result[1].includes('.'),
        children: []
    };

    let lastListItem = generateListItem(result),
        blankLine;

    index++;
    for (let len = lines.length; index < len; index++) {

        if (lines[index] === '' || _.trim(lines[index]) === '' || _.trim(lines[index], '\t') === '') {
            blankLine = lines[index];
            continue;
        }

        result = lines[index].match(reg);

        if (result) { // matched next list item

            if (lastListItem) {
                block.children.push(lastListItem);
            }

            lastListItem = generateListItem(result);

            continue;

        }

        result = lines[index].match(indentReg);

        if (blankLine !== undefined && (!result || !result[1])) { // end of list

            if (lastListItem) {
                block.children.push(lastListItem);
                lastListItem = null;
            }

            index--;
            break;

        }

        if (lastListItem) { // append to last list item

            if (blankLine !== undefined) {
                lastListItem.content.push(blankLine);
            }

            lastListItem.content.push(result[2]);

        }

    }

    if (lastListItem) {
        block.children.push(lastListItem);
    }

    for (let i = 0, len = block.children.length; i < len; i++) {
        this.parseBlocks(block.children[i].content, block.children[i]);
    }

    return [block, index];

}

function render(data = '', node) {
    const tag = node.isOrder ? 'ol' : 'ul';
    return `<${tag}>${node.rawValue || ''}${data}</${tag}>`;
}

export default {
    parse,
    render
};