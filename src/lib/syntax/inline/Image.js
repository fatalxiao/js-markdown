/**
 * match a image
 *
 * (1) basic syntax like this:
 *
 *  ![alt text](/path/to/img.jpg "optional title")
 *
 * (2) use a reference define
 *
 *  ![alt text][reference define]
 *  [reference define]: url/to/image "optional title attribute"
 *
 */

'use strict';

function parse(str, children, renderTree) {

    let result = str.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);

    // basic usage
    if (result) {

        const node = {
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

    // use reference define
    if (result) {

        let ref = renderTree.referenceDefine[result[2].toLowerCase()];

        if (!ref) {
            return;
        }

        const node = {
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