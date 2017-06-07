function parse(str, children, renderTree) {

    let result = str.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);

    if (result) {
        return [{
            display: 'inline',
            type: 'Image',
            alt: result[1],
            src: result[2],
            title: result[4]
        }, result[0].length];
    }

    result = str.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/);

    if (result) {
        return [{
            display: 'inline',
            type: 'Image',
            alt: result[1],
            src: renderTree.referenceDefine[result[2]]
        }, result[0].length];
    }

}

function render(data = '', node) {
    return `<img ${node.alt ? `alt="${node.alt}"` : ''} ${node.title ? `title="${node.title}"` : ''} src="${node.src}"/>`;
}

export default {
    parse,
    render
};