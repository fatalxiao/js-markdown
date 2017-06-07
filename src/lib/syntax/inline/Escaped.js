function parse(str, children, renderTree) {

    if (/^\\[\\`\*_{}<>\[\]()#\+.!\-]/.test(str)) {
        return [{
            display: 'inline',
            type: 'String',
            rawValue: str.at(1)
        }, 2];
    }

    return [{
        display: 'inline',
        type: 'Escaped',
        rawValue: str.at(0)
    }, 1];

}

function render(data = '', node) {
    return '\\';
}

export default {
    parse,
    render
};