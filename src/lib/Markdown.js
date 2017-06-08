import Util from './utils/Util';
import Syntax from './syntax';

function Markdown(data = '') {

    this.initData = data;
    this.renderTree = null;
    this.result = '';

}

Markdown.parse = function (data) {

    if (data === this.initData) {
        return this.result;
    }

    let md = new Markdown(data);
    return md.render();

};

/** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- parse -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
Markdown.prototype.parseBlock = function (line, index, lines, renderTree) {

    for (let i = 0, len = Syntax.blockTypes.length; i < len; i++) {

        const result = Syntax[Syntax.blockTypes[i]].parse.call(this, line, index, lines, renderTree);

        if (!result) {
            continue;
        }

        return result;

    }

};

Markdown.prototype.parseBlocks = function (lines, renderTree) {

    let line,
        block;

    for (let i = 0, len = lines.length; i < len; i++) {

        line = lines[i];

        const result = this.parseBlock(line, i, lines, renderTree);

        if (result) {

            [block, i] = result;

            if (renderTree && renderTree.children && block) {
                renderTree.children.push(block);
            }

        }

    }

};

Markdown.prototype.matchInline = function (str, children) {

    const urlReg = /^(?:\s*)(?:(https?|ftp|mailto))\S*/,
        reg = /([\s\S]*?)(\s|\\|(?:!\[)|(?:\[\^)|\[|<|`|(  \n)|(?:\*\*)|(?:__)|\*\*|__|\*|_)/;

    let result = str.match(urlReg);

    if (result) {
        return [{
            display: 'inline',
            type: 'Anchor',
            rawValue: result[0]
        }, result[0].length];
    }

    result = str.match(reg);

    if (!result) {
        return [{
            display: 'inline',
            type: 'String',
            rawValue: str
        }, str.length];
    } else if (result[1]) {
        return [{
            display: 'inline',
            type: 'String',
            rawValue: result[1]
        }, result[1].length];
    }

    let res;
    if (result[2] in Syntax.inlineTypes) {
        res = Syntax[Syntax.inlineTypes[result[2]]].parse.call(this, str, children, this.renderTree);
    }

    return res || [{
            display: 'inline',
            type: 'String',
            rawValue: result[2]
        }, result[2].length];

};

Markdown.prototype.parseInline = function (node) {

    if (!node.rawValue || node.type === 'BlockCode' || node.type === 'InlineCode') {
        return;
    }

    const children = [];
    let result, inline, len;

    while (node.rawValue.length > 0) {

        result = this.matchInline(node.rawValue, children);

        if (!result) {
            break;
        }

        [inline, len] = result;

        node.rawValue = node.rawValue.slice(len);

        if (inline) {
            if (inline.type === 'String'
                && children && children.length > 0 && children[children.length - 1].type === 'String') {
                children[children.length - 1].rawValue += inline.rawValue;
            } else {
                children.push(inline);
            }
        }

    }

    if (children.length > 0) {

        if (!node.children) {
            node.children = [];
        }

        node.children = [...children, ...node.children];

    }

};

Markdown.prototype.parseInlines = function (renderTree) {
    Util.postOrderTraverse.call(this, renderTree, this.parseInline);
};

Markdown.prototype.formatFootnotes = function () {

    const footnotes = this.renderTree.footnotes;

    let result = [],
        temp = {};

    if (!footnotes || footnotes.length < 1) {
        return;
    }

    result = footnotes.filter(item => isNaN(item.key));

    for (let item of footnotes) {
        if (!isNaN(item.key)) {
            temp[item.key] = item;
        }
    }
    for (let index of Object.keys(temp).sort()) {
        result.splice(index - 1, 0, temp[index]);
    }

    this.renderTree.footnotes = result;

};

Markdown.prototype.reformatFootnotes = function () {
    this.renderTree.footnotes = this.renderTree.footnotes.filter(item => item.activated);
};

Markdown.prototype.parseTree = function () {

    const data = Util.formatCRLF(this.initData),
        lines = data.split('\n');

    this.renderTree = {
        isRoot: true,
        metaData: {},
        referenceDefine: {},
        footnotes: [],
        children: []
    };

    this.parseBlocks(lines, this.renderTree);

    this.formatFootnotes();

    this.parseInlines(this.renderTree);

    this.reformatFootnotes();

};

/** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- render -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
Markdown.prototype.toHTML = function (node = this.renderTree) {

    let string = '';

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            string += this.toHTML(node.children[i]);
        }
    }

    if (node.type && Syntax[node.type] && Syntax[node.type].render) {
        return Syntax[node.type].render(string, node);
    } else {
        return node.rawValue || '' + string;
    }

    return string;

};

Markdown.prototype.renderFootnotes = function () {

    if (!this.renderTree.footnotes || this.renderTree.footnotes.length < 1) {
        return '';
    }

    const footnotes = this.renderTree.footnotes.map(item => ({
            display: 'block',
            type: 'ListItem',
            rawValue: item.rawValue
        })),
        node = {
            display: 'block',
            type: 'Footnote',
            children: [{
                display: 'block',
                type: 'List',
                isOrder: true,
                children: footnotes
            }]
        };

    this.parseInlines(node);

    return this.toHTML(node);

};

Markdown.prototype.renderHTML = function () {

    this.result = this.toHTML(this.renderTree);
    this.result += this.renderFootnotes();

};

/** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- main -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
Markdown.prototype.render = function () {

    this.parseTree();

    this.renderHTML();

    return this.result;

};

export default Markdown;