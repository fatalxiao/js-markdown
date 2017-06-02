function parse(line, index, lines, blocks) {

    const result = line.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);

    if (!result) {
        return;
    }

    const block = {
        display: 'block',
        type: 'Header',
        level: result[1].length,
        rawValue: result[2]
    };

    return [block, index];

}

function render(data = '', node) {
    return `<h${node.level}>${data}</h${node.level}>`;
}

export default {
    parse,
    render
};