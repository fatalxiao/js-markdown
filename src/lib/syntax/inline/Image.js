function parse(str, children, renderTree) {

    let result = str.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);

    if (result) {

        const node = {
            display: 'inline',
            type: 'Image',
            alt: result[1],
            src: result[2]
        };

        if (result[4]) {
            node.title = result[4];
        }

        return [node, result[0].length];
    }

    result = str.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/);

    if (result) {

        let ref = renderTree.referenceDefine[result[2]];

        if (!ref) {
            return;
        }

        const node = {
            display: 'inline',
            type: 'Image',
            alt: result[1],
            src: ref.href
        };

        if (ref.title) {
            node.title = ref.title;
        }

        return [node, result[0].length];
    }

}

function render(data = '', node) {
    return `<img ${node.alt ? `alt="${node.alt}"` : ''} ${node.title ? `title="${node.title}"` : ''} src="${node.src}"/>`;
}

export default {
    parse,
    render
};