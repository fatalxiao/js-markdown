function parse(str, children, renderTree) {

    let result = str.match(/^\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);

    if (result) {

        const node = {
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

        let ref = result[2];
        if (!result[2]) {
            ref = result[1];
        }

        ref = ref.toLowerCase();

        if (!(ref in renderTree.referenceDefine) || !renderTree.referenceDefine[ref].href) {
            return;
        }

        ref = renderTree.referenceDefine[ref];

        const node = {
            type: 'Anchor',
            href: ref.href,
            rawValue: result[1]
        };

        if (ref.title) {
            node.title = ref.title;
        }

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