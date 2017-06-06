import _ from 'lodash';

function generateTableTree(head, separator) {
    return {
        display: 'block',
        type: 'Table',
        children: [{
            display: 'block',
            type: 'TableHead',
            children: [{
                display: 'block',
                type: 'TableRow',
                children: head.map((rawValue, index) => ({
                    display: 'block',
                    type: 'TableHeadCell',
                    align: separator[index],
                    rawValue
                }))
            }]
        }]
    };
}

function calRow(str) {

    str = _.trim(str);
    str = _.trim(str, '|');

    return str.split(/\s*\|\s*/);

}

function calSeparator(str) {
    return calRow(str).map(item => {
        if (item.startsWith(':') && item.endsWith(':')) {
            return 'center';
        } else if (item.startsWith(':')) {
            return 'left';
        } else if (item.endsWith(':')) {
            return 'right';
        } else if (item.endsWith(':')) {
            return '';
        }
    });
}

function parse(line, index, lines, renderTree) {

    const reg = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)/,
        separatorReg = /^ {0,3}\|?(\s*:?\-{3,}:?\s*\|)+\s*:?\-{3,}:?\s*\|?\s*$/;

    if (index + 1 >= lines.length) {
        return;
    }

    const separatorLine = lines[index + 1];

    if (!line.match(reg) || !separatorLine.match(separatorReg)) {
        return;
    }

    const head = calRow(line),
        separator = calSeparator(separatorLine);

    if (head.length !== separator.length) {
        return;
    }

    const block = generateTableTree(head, separator),
        tableBody = {
            display: 'block',
            type: 'TableBody'
        };

    return [block, index + 1];

}

function render(data = '', node) {
    return `<table>${data}</table>`;
}

export default {
    parse,
    render
};