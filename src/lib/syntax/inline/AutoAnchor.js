function parse(str, children, renderTree) {

    const result = str.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/);

    if (!result) {
        return;
    }

    return [{
        display: 'inline',
        type: 'AutoAnchor',
        href: result[3] ? 'mailto:' + result[3] : result[1],
        rawValue: result[3] ? result[3] : result[1]
    }, result[0].length];

}

function render(data = '', node) {
    const href = node.rawValue || '';
    return `<a href="${href}">${href}${data}</a>`;
}

export default {
    parse,
    render
};