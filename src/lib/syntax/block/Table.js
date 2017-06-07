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

function generateTableBodyNode() {
    return {
        display: 'block',
        type: 'TableBody',
        children: []
    };
}

function generateTableRowNode(line, separator) {

    const tableRow = {
        display: 'block',
        type: 'TableRow',
        children: separator.map(align => ({
            display: 'block',
            type: 'TableDataCell',
            align
        }))
    };

    for (let i = 0, data = calRow(line), len = data.length; i < len; i++) {
        tableRow.children[i].rawValue = data[i];
    }

    return tableRow;

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

    const reg = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)(?:\n|$)/,
        separatorReg = /^ {0,3}\|?(\s*:?\-{3,}:?\s*\|)+\s*:?\-{3,}:?\s*\|?(?:\n|$)/,
        linesLen = lines.length;

    if (index + 1 >= linesLen) {
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
        tableBody = generateTableBodyNode();

    for (index += 2; index < linesLen; index++) {

        if (!lines[index].match(reg)) {
            index--;
            break;
        }

        tableBody.children.push(generateTableRowNode(lines[index], separator));

    }

    tableBody.children.length > 0 && block.children.push(tableBody);

    return [block, index];

}

function render(data = '', node) {
    return `<table>${data}</table>`;
}

export default {
    parse,
    render
};