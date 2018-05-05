/**
 * match a emphasize
 *
 * syntax like this:
 *
 *  *emphasized*
 *
 * or
 *
 *  _emphasized_
 *
 * emphasize can be nested
 *
 */

const EmphasizeType = {
    STRONG: 'strong',
    WEAK: 'em'
};

function parse(str, children, renderTree) {

    const regStrong = /^([\*\_]{2})([^\*\_]*?)(\1)/,
        regWeak = /^([\*\_]{1})([^\*\_]*?)(\1)/;

    const resultStrong = str.match(regStrong);
    if (resultStrong && resultStrong[2]) {

        const node = { // strong root node
            type: 'Emphasize',
            emphasizeType: EmphasizeType.STRONG,
            rawValue: resultStrong[2]
        };

        // parse recursively
        this.parseInline(node);

        return [node, resultStrong[2].length + 4];

    }

    const resultWeak = str.match(regWeak);
    if (resultWeak && resultWeak[2]) {

        const node = { // strong root node
            type: 'Emphasize',
            emphasizeType: EmphasizeType.WEAK,
            rawValue: resultWeak[2]
        };

        // parse recursively
        this.parseInline(node);

        return [node, resultWeak[2].length + 2];

    }

    return;

}

function render(data = '', node) {
    return `<${node.emphasizeType}>${node.rawValue || ''}${data}</${node.emphasizeType}>`;
}

export default {
    parse,
    render
};