function parse(line, index, lines, renderTree) {

    const result = line.match(/^\s*\[([^\[\]]+)\]:\s*(.+)(?:[ \t]+(["'])(.*?)\3)(?:\n|$)/);

    if (!result) {
        return;
    }

    renderTree.referenceDefine[result[1]] = {
        href: result[2],
        title: result[4]
    };

    return [null, index];

}

export default {
    parse
};