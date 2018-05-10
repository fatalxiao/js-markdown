/**
 * match ordered(numbered) / unordered(bulleted) list
 *
 * (1) unordered list syntax like this:
 *
 *  * Red
 *  * Green
 *  * Blue
 *
 * also you can use "+" or "-" instead of "*" above.
 *
 * (2) ordered list syntax like this:
 *
 *  1. One
 *  2. Two
 *  3. Three
 *
 * the number of list will be ignored, you can write like this:
 *
 *  1. One
 *  1. Two
 *  1. Three
 *
 * even like this:
 *
 *  12. One
 *  3456. Two
 *  7890. Three
 *
 * they all will be generated like this:
 *
 *  <ol>
 *      <li>One</li>
 *      <li>Two</li>
 *      <li>Three</li>
 *  </ol>
 *
 * (3) list also can be nested, like this:
 *
 *  *   This is a list item with two paragraphs.
 *
 *      This is the second paragraph in the list item. You're
 *  only required to indent the first line. Lorem ipsum dolor
 *  sit amet, consectetuer adipiscing elit.
 *
 *  *   A list item with a blockquote:
 *
 *      > This is a blockquote
 *      > inside a list item.
 *
 * (4) list also can includes checkbox, syntax like this:
 *
 *  1. [x] I can render checkbox list syntax
 *      * [x] I support nesting
 *      * [x] I support ordered *and* unordered lists
 *  2. [ ] I don't support clicking checkboxes directly in the html window
 *
 * [x]: checked = true
 * [ ]: checked = false
 *
 */

'use strict';

import Valid from '../../utils/Valid';

/**
 * generate a list item node according to match result
 * @param result
 * @returns {{type: string, checked: boolean, content: [*], children: Array}}
 */
function generateListItem(result, hasBlankLine) {

    const content = [result[3]];

    if (hasBlankLine) {
        content.unshift('\n');
    }

    return {
        type: 'ListItem',
        checked: result[2] === '[x]' ? true : (result[2] === '[ ]' ? false : undefined), // true / false / undefined
        content,
        children: []
    };

}

function parse(line, index, lines, renderTree) {

    const reg = /^([\*\-\+]|\d+\.)\s+(\[[x| ]\])?(.*?)(?:\n|$)/,
        indentReg = /^( {0,3}\t| {4}|\t)*(.*?)(?:\n|$)/,

        result = line.match(reg);

    if (!result) {
        return;
    }

    const block = { // list root node
        type: 'List',
        isOrder: result[1].includes('.'),
        children: []
    };

    let lastListItem = generateListItem(result),
        hasBlankLine = false;

    index++;
    for (let len = lines.length; index < len; index++) {

        if (Valid.isBlank(lines[index])) {
            hasBlankLine = true;
            continue;
        }

        const lineResult = lines[index].match(reg);
        if (lineResult) { // matched next list item

            if (lastListItem) {

                if (hasBlankLine) {
                    lastListItem.content.push('');
                }

                block.children.push(lastListItem);

            }

            lastListItem = generateListItem(lineResult, hasBlankLine);

            hasBlankLine = false;

            continue;

        }

        const indentResult = lines[index].match(indentReg);
        if (hasBlankLine && (!indentResult || !indentResult[1])) { // end of list

            if (lastListItem) {
                block.children.push(lastListItem);
                lastListItem = null;
            }

            index--;
            break;

        }

        if (lastListItem) { // append to last list item

            if (hasBlankLine) {
                lastListItem.content.push('');
                hasBlankLine = false;
            }

            lastListItem.content.push(indentResult[2]);

        }

    }

    if (lastListItem) {

        if (hasBlankLine) {
            lastListItem.content.push('');
        }

        block.children.push(lastListItem);

    }

    // parse recursively
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