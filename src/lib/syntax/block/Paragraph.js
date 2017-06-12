'use strict';

import Util from '../../utils/Util';

function getPrev(renderTree) {

    if (!renderTree || !renderTree.children || renderTree.children.length < 1
        || !renderTree.children[renderTree.children.length - 1]) {
        return;
    }

    return renderTree.children[renderTree.children.length - 1];

}

function parse(line, index, lines, renderTree) {

    const prev = getPrev(renderTree),
        isBlankLine = Util.isBlank(line);

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

    if (renderTree && renderTree.isRoot) {
        return [{
            type: 'Paragraph',
            rawValue: line
        }, index];
    }

    // single line will be Text
    return [{
        type: 'Text',
        rawValue: line
    }, index];

}

function render(data = '', node) {
    return `<p>${node.rawValue || ''}${data}</p>`;
}

export default {
    parse,
    render
};