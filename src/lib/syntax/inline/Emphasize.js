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

function generateRegExp(flag, count) {
    return new RegExp(`^([\\${flag}]{${count}})([^\\${flag}]*?)(\\1)`);
}

function parse(str, children, renderTree) {

    const flag = str.at(0);

    const resultDouble = str.match(generateRegExp(flag, 3));
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

    const resultStrong = str.match(generateRegExp(flag, 2));
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

    const resultWeak = str.match(generateRegExp(flag, 1));
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