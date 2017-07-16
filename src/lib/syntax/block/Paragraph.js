/**
 * match text and paragraph
 *
 * If one string does not match any syntax, it will be a text or paragraph.
 * String will render as a text preferentially.
 * Adjacent text will combine as a paragraph.
 * Only if parent is render tree root node, string will render as a paragraph.
 *
 */

'use strict';

import Valid from '../../utils/Valid';
import Str from '../../utils/Str';

// get prev node in render tree
function getPrev(renderTree) {

    if (!renderTree || !renderTree.children || renderTree.children.length < 1
        || !renderTree.children[renderTree.children.length - 1]) {
        return;
    }

    return renderTree.children[renderTree.children.length - 1];

}

function parse(line, index, lines, renderTree) {

    const prev = getPrev(renderTree),
        isBlankLine = Valid.isBlank(line);

    if (prev) {

        if (prev.type === 'Text') { // multi Text line will be a Paragraph

            if (isBlankLine) {
                prev.type = 'Paragraph';
                return [{
                    type: 'BlankLine',
                    rawValue: ''
                }, index];
            } else {
                prev.type = 'Paragraph';
                prev.rawValue += '\n' + line;
                return [null, index];
            }

        }

        if (isBlankLine && prev.type === 'BlankLine') {
            return [null, index];
        }

        if (!isBlankLine && prev.type === 'Paragraph') { // append to prev Paragraph
            prev.rawValue += '\n' + line;
            return [null, index];
        }

    }

    if (isBlankLine) {
        return [{
            type: 'BlankLine',
            rawValue: ''
        }, index];
    }

    // render as a single line text when parent is a list
    if (renderTree && renderTree.type === 'ListItem') {
        return [{
            type: 'Text',
            rawValue: line
        }, index];
    }

    return [{
        type: 'Paragraph',
        rawValue: line
    }, index];

}

function render(data = '', node) {
    return `<p>${node.rawValue || ''}${Str.trim(data, ' \n')}</p>`;
}

export default {
    parse,
    render
};