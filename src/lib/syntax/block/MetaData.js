function parse(line, index, lines, renderTree) {

    if (index > 0) {
        return;
    }

    const reg = /^(\w+):\s*(.+?)(?:\n|$)/;

    let result = line.match(reg);

    if (!result) {
        return;
    }

    renderTree.metaData[result[1]] = result[2];

    index++;
    for (let len = lines.length; index < len; index++) {

        result = lines[index].match(reg);

        if (!result) {
            index--;
            break;
        }

        renderTree.metaData[result[1]] = result[2];

    }

    return [null, index];

}

export default {
    parse
};