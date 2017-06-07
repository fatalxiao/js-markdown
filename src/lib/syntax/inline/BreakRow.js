function parse(str, children, renderTree) {

    if (str === '  ') {
        return [{
            display: 'inline',
            type: 'BreakRow',
            rawValue: ''
        }, 2];
    }

    return [{
        display: 'inline',
        type: 'String',
        rawValue: '  '
    }, 2];

}

function render(data = '', node) {
    return '<br/>';
}

export default {
    parse,
    render
};