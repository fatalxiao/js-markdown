import _ from 'lodash';

function generateListNode(result) {
    return {
        display: 'block',
        type: 'List',
        isOrder: result[1].includes('.'),
        children: []
    };
}

function generateListItemNode(result) {
    return {
        display: 'block',
        type: 'ListItem',
        rawValue: result[2],
        children: []
    };
}

function initListRootNode(result) {

    const root = generateListNode(result);
    root.children.push(generateListItemNode(result));

    return root;

}

function parse(line, index, lines, blocks) {

    const noDeepReg = /^([\*\+\-]|\d+\.)\s+(.*?)\s*(?:\n|$)/,
        deepReg = /^( {0,3}\t| {4})*([\*\-\+]|\d+\.)\s+(.*?)\s*(?:\n|$)/;

    let result = line.match(noDeepReg);

    if (!result) {
        return;
    }

    const block = initListRootNode(result);

    // index++;
    // for (let len = lines.length; index < len; index++) {
    //
    //     result = lines[index].match(deepReg);
    //
    //     if (!result) {
    //
    //     }
    //
    // }

    return [block,index];

}

function render(data = '', node) {
    const tag = node.isOrder ? 'ol' : 'ul';
    return `<${tag}>${data}</${tag}>`;
}

export default {
    parse,
    render
};