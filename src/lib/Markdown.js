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

    const reg = /([\s\S]*?)(\\|(?:!\[)|\[|<|`|(  \n)|(?:\*\*)|(?:__)|\*\*|__|\*|_)/;

    const result = reg.exec(str);

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

    if (!node.rawValue) {
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

Markdown.prototype.toHTML = function (node = this.renderTree) {

    let string = '';

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            string += this.toHTML(node.children[i]);
        }
    }

    if (node.type && Syntax[node.type]) {
        return Syntax[node.type].render(string, node);
    } else {
        return node.rawValue || '' + string;
    }

    return string;

};

Markdown.prototype.render = function () {

    const data = Util.formatCRLF(this.initData),
        lines = data.split('\n');

    this.renderTree = {
        isRoot: true,
        metaData: {},
        referenceDefine: {},
        footnotes: {},
        children: []
    };

    this.parseBlocks(lines, this.renderTree);

    this.parseInlines(this.renderTree);

    // console.log(JSON.stringify(this.renderTree));

    this.result = this.toHTML(this.renderTree);
    return this.result;

};

export default Markdown;