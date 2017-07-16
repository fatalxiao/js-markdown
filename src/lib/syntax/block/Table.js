/**
 * match a table
 *
 * syntax like this:
 *
 *  First Header  | Second Header
 *  ------------- | -------------
 *  Content Cell  | Content Cell
 *  Content Cell  | Content Cell
 *
 * or
 *
 *  | First Header  | Second Header |
 *  | ------------- | ------------- |
 *  | Content Cell  | Content Cell |
 *  | Content Cell  | Content Cell |
 *
 * and the separator line may control align, like this:
 *
 *  | Left Aligned  | Center Aligned  | Right Aligned |
 *  |:------------- |:---------------:| -------------:|
 *  | left          |      center     |         right |
 *
 */

'use strict';

import Str from '../../utils/Str';

/**
 * get the initial table render tree that includes headers
 * @param head
 * @param separator
 * @returns {{type: string, children: [*]}}
 */
function generateTableTree(head, separator) {
    return {
        type: 'Table',
        children: [{
            type: 'TableHead',
            children: [{
                type: 'TableRow',
                children: head.map((rawValue, index) => ({
                    type: 'TableHeadCell',
                    align: separator[index],
                    rawValue
                }))
            }]
        }]
    };
}

/**
 * return a table body root node
 * @returns {{type: string, children: Array}}
 */
function generateTableBodyNode() {
    return {
        type: 'TableBody',
        children: []
    };
}

/**
 * split a table row line
 * @param str
 * @returns {*|Array}
 */
function calRow(str) {

    str = Str.trim(str, ' \t|');

    return str.split(/\s*\|\s*/);

}

/**
 * return a table row that includes table data cells
 * @param line
 * @param separator
 * @returns {{type: string, children}}
 */
function generateTableRowNode(line, separator) {

    const tableRow = {
        type: 'TableRow',
        children: separator.map(align => ({
            type: 'TableDataCell',
            align
        }))
    };

    for (let i = 0, data = calRow(line), len = data.length; i < len; i++) {
        tableRow.children[i].rawValue = data[i];
    }

    return tableRow;

}

/**
 * parse the separator line, and return a align info
 * @param str
 * @returns {Array}
 */
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

    // if the line is the last line
    if (index + 1 >= linesLen) {
        return;
    }

    const separatorLine = lines[index + 1];

    // the second line does not like separator
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

    // append table body to table render tree if there are table rows
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