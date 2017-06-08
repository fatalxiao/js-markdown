function parse(line, index, lines, renderTree) {

    const reg = /^\s*\[\^([^\[\]]+)\]:\s*(.+)(?:\n|$)/;
    let result = line.match(reg);

    if (!result) {
        return;
    }

    renderTree.footnotes.push({
        key: result[1],
        value: result[2]
    });

    return [null, index];

}

export default {
    parse
};