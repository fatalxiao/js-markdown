function parse(str, children, renderTree) {
    return [{
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