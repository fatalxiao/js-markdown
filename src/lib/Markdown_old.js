import Util from './utils/Util';
import Syntax from './syntax';

function Markdown(data) {

    this.initData = data;

    this.dataBlocks = [];
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

Markdown.prototype.formatData = function (data) {
    return data.replace(/\r\n?/g, '\n');
};

Markdown.prototype.toBlock = function () {

    const data = this.formatData(this.initData);

    let reg = /([\s\S]+?)(\n(?:\s*\n|$)+|$)/g,
        lineNumber = 0,
        result,
        blocks = [];

    if ((result = /^(\s*\n)/.exec(data)) !== null) {
        lineNumber = Util.countLines(result[0]);
        reg.lastIndex = result[0].length;
    }

    while ((result = reg.exec(data)) !== null) {
        blocks.push({
            rawValue: result[1],
            trail: result[2],
            lineNumber
        });
        lineNumber += Util.countLines(result[0]);
    }

    this.dataBlocks = blocks;

};

Markdown.prototype.toBlockNode = function (block) {

    if (!block) {
        return;
    }

    for (let key in Syntax.block) {

        const node = Syntax.block[key].parse.call(this, block);
        this.toInlineNode(node);

        if (node) {
            return node;
        }

    }

    return block;

};

Markdown.prototype.toInlineNode = function (string) {

    if (!string) {
        return;
    }

    let children = [];

    // while (string) {
    //
    //     for (let key in Syntax.inline) {
    //         Syntax.inline[key].parse.call(this, string);
    //     }
    //
    //     string.slice();
    // }

    return children;

};

Markdown.prototype.toTree = function () {

    if (!this.dataBlocks || this.dataBlocks.length < 1) {
        return;
    }

    this.renderTree = {
        isRoot: true,
        children: []
    };

    for (let i = 0, len = this.dataBlocks.length; i < len; i++) {

        const node = this.toBlockNode(this.dataBlocks[i]);

        if (!node) {
            continue;
        }

        this.renderTree.children.push(node);

    }

};

Markdown.prototype.toHTML = function (node = this.renderTree) {

    const parsers = {...Syntax.block, ...Syntax.inline};
    let string = '';

    if (node.children) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            string += this.toHTML(node.children[i]);
        }
    } else {
        if (node.type && parsers[node.type]) {
            return parsers[node.type].render(node.rawValue, node);
        } else {
            return node.rawValue;
        }
    }

    if (node.type && parsers[node.type]) {
        return parsers[node.type].render(string, node);
    } else {
        return string;
    }

    if (node.isRoot) {
        return string;
    }

};

Markdown.prototype.render = function () {

    this.toBlock();

    this.toTree();

    return this.toHTML();

};

export default Markdown;