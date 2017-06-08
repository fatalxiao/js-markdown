function parse(str, children, renderTree) {

    let result = str.match(/^\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);

    if (result) {

        const node = {
            display: 'inline',
            type: 'Anchor',
            href: result[2],
            rawValue: result[1]
        };

        if (result[4]) {
            node.title = result[4];
        }

        this.parseInline(node);

        return [node, result[0].length];

    }

    result = str.match(/^\[(.*?)\][ \t]*\[(.*?)\]/);

    if (result) {

        const node = {
            display: 'inline',
            type: 'Anchor',
            href: renderTree.referenceDefine[result[2]],
            rawValue: result[1]
        };

        this.parseInline(node);

        return [node, result[0].length];
    }

}

function render(data = '', node) {
    return `<a href="${node.href}" ${node.title ? `title="${node.title}"` : ''}>${node.rawValue || ''}${data}</a>`;
}

export default {
    parse,
    render
};