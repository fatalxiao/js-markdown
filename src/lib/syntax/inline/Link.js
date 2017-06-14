/**
 * match a link
 *
 * (1) basic syntax like this:
 *
 *  [about](/about/)
 *
 * (2) use a reference define
 *
 *  [an example][reference define]
 *  [reference define]: /example/ "optional title attribute"
 *
 * (3) use a reference define as text directly
 *
 *  [Google][]
 *  [Google]: http://google.com/
 *
 */

'use strict';

function parse(str, children, renderTree) {

    let result = str.match(/^\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);

    // basic usage
    if (result) {

        const node = {
            type: 'Link',
            href: result[2],
            rawValue: result[1]
        };

        if (result[4]) {
            node.title = result[4];
        }

        this.parseInline(node);

        return [node, result[0].length];

    }

    result = str.match(/^\[(.*)\][ \t]*\[(.*?)\]/);

    // use a reference define
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
            type: 'Link',
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