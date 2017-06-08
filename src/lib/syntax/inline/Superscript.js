function parse(str, children, renderTree) {

    const result = str.match(/^\[\^(.*?)\]/);

    if (!result) {
        return;
    }

    for (let i = 0, len = renderTree.footnotes.length; i < len; i++) {
        if (renderTree.footnotes[i].key === result[1]) {

            renderTree.footnotes[i].activated = true;

            return [{
                display: 'inline',
                type: 'Superscript',
                index: i + 1,
                rawValue: ''
            }, result[0].length];

        }
    }

    return;

}

function render(data = '', node) {
    return `<sup id="fnref${node.index}">[<a href="#fn${node.index}" rel="footnote">${node.index}</a>]</sup>`;
}

export default {
    parse,
    render
};