function parse(str, children, renderTree) {
    return [{
        display: 'inline',
        type: 'BreakRow',
        rawValue: ''
    }, 3];
}

function render(data = '', node) {
    return '<br/>';
}

export default {
    parse,
    render
};