import _ from 'lodash';

function parse(line, index, lines, blocks) {

    if (blocks && blocks.length > 0) {

        const lastBlock = blocks[blocks.length - 1];

        if (lastBlock.type === 'Paragraph' && lastBlock.rawValue.slice(-2) !== '  ') {

            if (line === '' && _.trim(line) === '') {
                blocks[blocks.length - 1].rawValue += '  ';
            } else {
                blocks[blocks.length - 1].rawValue += '\n' + line;
                return [null, index];
            }

        }

    }

    if (line === '' && _.trim(line) === '') {
        return [null, index];
    } else {
        return [{
            display: 'block',
            type: 'Paragraph',
            rawValue: line
        }, index];
    }

}

function render(data = '', node) {
    return `<p>${_.trim(data)}</p>`;
}

export default {
    parse,
    render
};