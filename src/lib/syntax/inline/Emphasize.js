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
    DOUBLE: Symbol('DOUBLE'),
    STRONG: Symbol('STRONG'),
    WEAK: Symbol('WEAK')
};

function parse(str, children, renderTree) {

    const regDouble = /^([\*\_]{3})([^\*\_]*?)(\1)/,
        regStrong = /^([\*\_]{2})([^\*\_]*?)(\1)/,
        regWeak = /^([\*\_]{1})([^\*\_]*?)(\1)/;

    const resultDouble = str.match(regDouble);
    if (resultDouble && resultDouble[2]) {

        const node = { // strong root node
            type: 'Emphasize',
            emphasizeType: EmphasizeType.DOUBLE,
            rawValue: resultDouble[2]
        };

        // parse recursively
        this.parseInline(node);

        return [node, resultDouble[2].length + 6];

    }

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

function getTag(emphasizeType) {
    switch (emphasizeType) {
        case EmphasizeType.DOUBLE:
            return ['<strong><em>', '</em></strong>'];
        case EmphasizeType.STRONG:
            return ['<strong>', '</strong>'];
        default:
            return ['<em>', '</em>'];
    }
}

function render(data = '', node) {
    const tag = getTag(node.emphasizeType);
    return `${tag[0]}${node.rawValue || ''}${data}${tag[1]}`;
}

export default {
    parse,
    render
};