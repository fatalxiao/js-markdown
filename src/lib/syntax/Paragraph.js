function parse(line, index, lines) {

    const block = {
        display: 'block',
        type: 'Paragraph',
        rawValue: line
    };

    return [block, index];

}

function render(data = '', node) {
    return `<p>${data}</p>`;
}

export default {
    parse,
    render
};