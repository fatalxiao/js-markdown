import Util from '../../utils/Util';

function generateListItem(result) {
    return {
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
        type: 'List',
        isOrder: result[1].includes('.'),
        children: []
    };

    let lastListItem = generateListItem(result),
        blankLine = undefined;

    index++;
    for (let len = lines.length; index < len; index++) {

        if (Util.isBlankLine(lines[index])) {
            blankLine = lines[index];
            continue;
        }

        result = lines[index].match(reg);

        if (result) { // matched next list item

            if (lastListItem) {

                if (blankLine !== undefined) {
                    lastListItem.content.push(blankLine);
                    blankLine = undefined;
                }

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
                blankLine = undefined;
            }

            lastListItem.content.push(result[2]);

        }

    }

    if (lastListItem) {

        if (blankLine !== undefined) {
            lastListItem.content.push(blankLine);
        }

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