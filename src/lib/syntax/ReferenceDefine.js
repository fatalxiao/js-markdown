function parse(line, index, lines, renderTree) {

    const result = line.match(/^\s*\[([^\[\]]+)\]:\s*(\S+)/);

    if (!result) {
        return;
    }

    renderTree.referenceDefine[result[1]] = result[2];

    return;

}

function render(data = '', node) {
    return '';
}

export default {
    parse,
    render
};