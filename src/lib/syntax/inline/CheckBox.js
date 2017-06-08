function parse(str, children, renderTree) {

    const result = str.match(/^\[(x| )\]/);

    if (!result) {
        return;
    }

    return [{
        display: 'inline',
        type: 'CheckBox',
        checked: result[1] === 'x',
        rawValue: ''
    }, result[0].length];

}

function render(data = '', node) {
    return `<input type="checkbox" ${node.checked ? 'checked' : ''}>`;
}

export default {
    parse,
    render
};