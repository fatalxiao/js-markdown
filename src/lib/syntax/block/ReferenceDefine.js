function parse(line, index, lines, renderTree) {

    const result = line.match(/^\s*\[([^\[\]]+)\]:\s*(.+)(?:\n|$)/);

    if (!result) {
        return;
    }

    renderTree.referenceDefine[result[1]] = result[2];

    return [null, index];

}

export default {
    parse
};