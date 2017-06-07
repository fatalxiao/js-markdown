function parse(line, index, lines, renderTree) {

    const result = line.match(/^([\*\-])\1\1+\s*$/);

    if (!result) {
        return;
    }

    return [{
        display: 'block',
        type: 'HorizontalRule'
    }, index];

}

function render(data = '', node) {
    return '<hr/>';
}

export default {
    parse,
    render
};