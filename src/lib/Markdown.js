import _ from 'lodash';
import Util from './utils/Util';
import Syntax from './syntax';

function Markdown(data = '') {

    this.initData = data;

    this.result = '';

}

Markdown.parse = function (data) {

    if (data === this.initData) {
        return this.result;
    }

    let md = new Markdown(data);
    return md.render();

};

Markdown.prototype.parseBlock = function (line, index, lines, blocks) {

    for (let i = 0, len = Syntax.blockTypes.length; i < len; i++) {

        const result = Syntax[Syntax.blockTypes[i]].parse.call(this, line, index, lines, blocks);

        if (!result) {
            continue;
        }

        return result;

    }

};

Markdown.prototype.parseBlocks = function (lines) {

    let line,
        blocks = [],
        block;

    for (let i = 0, len = lines.length; i < len; i++) {

        line = lines[i];

        const result = this.parseBlock(line, i, lines, blocks);

        if (result) {

            [block, i] = result;

            if (block) {
                blocks.push(block);
            }

        }

    }

    return blocks;

};

Markdown.prototype.parseInline = function (node) {

    if (node.display !== 'block' || node.children || node.rawValue === '') {
        return;
    }



};

Markdown.prototype.toTree = function (blocks) {

    const tree = {
        isRoot: true,
        children: blocks
    };

    Util.postOrderTraverse(tree, this.parseInline);

    return tree;

};

Markdown.prototype.toHTML = function (node = this.renderTree) {

    let string = '';

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            string += this.toHTML(node.children[i]);
        }
    } else {
        string = node.rawValue || '';
    }

    if (node.type && Syntax[node.type]) {
        string = Syntax[node.type].render(string, node);
    }

    return string;

};

Markdown.prototype.render = function () {

    const data = Util.formatCRLF(this.initData),
        lines = data.split('\n');

    const blocks = this.parseBlocks(lines);
    if (!blocks || blocks.length < 1) {
        return '';
    }

    const renderTree = this.toTree(blocks);
    if (!renderTree) {
        return '';
    }

    this.result = this.toHTML(renderTree);
    return this.result;

};

export default Markdown;