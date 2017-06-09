function parse(line, index, lines, renderTree) {

    const reg = /^(?:\>)\s*(.*?)(?:\n|$)/;
    let result = line.match(reg);

    if (!result) {
        return;
    }

    const block = {
            type: 'Blockquote',
            children: []
        },
        content = [result[1]];

    let blankLineFlag = false,
        lineType;

    index++;
    for (let len = lines.length; index < len; index++) {

        if (lines[index] === '' || _.trim(lines[index]) === '') {

            blankLineFlag = true;

            content.push('');
            continue;

        }

        lineType = this.parseBlock(lines[index], 0, lines.slice(index))[0].type;

        if (
            (lineType !== 'Blockquote' && lineType !== 'Paragraph')
            ||
            (blankLineFlag && lineType === 'Paragraph')
        ) {
            index--;
            break;
        }

        if (lineType === 'Paragraph') {
            content.push(lines[index]);
            continue;
        }

        result = lines[index].match(reg);

        if (!result) {
            index--;
            break;
        }

        content.push(result[1]);
        blankLineFlag = false;

    }

    this.parseBlocks(content, block);

    return [block, index];

}

function render(data = '', node) {
    return `<blockquote>${node.rawValue || ''}${data}</blockquote>`;
}

export default {
    parse,
    render
};