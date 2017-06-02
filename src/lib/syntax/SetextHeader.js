function parse(line, index, lines, blocks) {

    if (index >= lines.length - 1) {
        return;
    }

    const nextLine = lines[index + 1],
        result = nextLine.match(/^([-=])\1\1+(?:\n|$)/);

    if (!result) {
        return;
    }

    const block = {
        display: 'block',
        type: 'SetextHeader',
        level: result[1] === '=' ? 1 : 2,
        rawValue: line
    };

    return [block, index + 1];

}

function render(data = '', node) {
    return `<h${node.level}>${data}</h${node.level}>`;
}

export default {
    parse,
    render
};