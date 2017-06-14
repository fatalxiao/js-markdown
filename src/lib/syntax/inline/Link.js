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

function getContent(str) {

    const escapeReg = /^((?:\\\[)|(?:\\\]))/;
    let char,
        count = 1,
        index = 1,
        flag = false;

    while (str) {

        if (str.match(escapeReg)) {
            index += 2;
            str = str.slice(2);
            continue;
        }

        char = str.at(0);

        if (char === '[') {
            count++;
        } else if (char === ']') {
            count--;
        }

        if (count === 0) {
            flag = true;
            break;
        }

        index++;
        str = str.slice(1);

    }

    if (!flag) {
        return;
    }

    return index;

}

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

    const reg = /^\[(.*?)\][ \t]*\[(.*?)\]/;
    result = str.match(reg);

    // use a reference define
    if (result) {

        let rawValue, ref, length = 0;

        // if there is a image in a link, like this:
        // [![alt text][/path/to/img.jpg]][/path/to/link]
        if (result[1].includes('[') || result[2].includes('[')) {

            let tempStr = str.slice(1),
                index = getContent(tempStr);
            if (index === undefined) {// link syntax error
                return;
            }

            rawValue = str.slice(1, index);
            tempStr = str.slice(index + 1);
            length += index + 1;


            result = tempStr.match(/^([ \t]*)(\[(?:.*?)\])/);
            if (!result) {// link syntax error
                return;
            }

            length += result[1].length;
            index = getContent(result[2].slice(1));
            if (index === undefined) { // link syntax error
                return;
            }

            ref = result[2].slice(1, index);
            length += index + 1;

        } else {

            rawValue = result[1];

            ref = result[2];
            if (!result[2]) {
                ref = result[1];
            }

            ref = ref.toLowerCase();

            length = result[0].length;

        }

        // no referenceDefine  matched
        if (!(ref in renderTree.referenceDefine) || !renderTree.referenceDefine[ref].href) {
            return;
        }

        ref = renderTree.referenceDefine[ref];

        const node = {
            type: 'Link',
            href: ref.href,
            rawValue
        };

        if (ref.title) {
            node.title = ref.title;
        }

        this.parseInline(node);

        return [node, length];

    }

    return;

}

function render(data = '', node) {
    return `<a href="${node.href}" ${node.title ? `title="${node.title}"` : ''}>${node.rawValue || ''}${data}</a>`;
}

export default {
    parse,
    render
};