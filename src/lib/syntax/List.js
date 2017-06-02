import _ from 'lodash';

function parse(line, index, lines, blocks) {

    const reg = /^([\*\-\+]|\d+\.)\s+(.*?)\s*(?:\n|$)/;

    const result = line.match(reg);

    if (!result) {
        return;
    }



}

function render(data = '', node) {
    return '';
}

export default {
    parse,
    render
};