import _ from 'lodash';
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

Markdown.prototype.parseInline = function (node) {

    if (node.display !== 'block' || node.children || node.rawValue === '') {
        return;
    }

};

Markdown.prototype.parseInlines = function (renderTree) {
    Util.postOrderTraverse(renderTree, this.parseInline);
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
    }

    return string;

};

Markdown.prototype.render = function () {

    const data = Util.formatCRLF(this.initData),
        lines = data.split('\n');

    this.renderTree = {
        isRoot: true,
        referenceDefine: {},
        children: []
    };

    this.parseBlocks(lines, this.renderTree);
    this.parseInlines(this.renderTree);

    this.result = this.toHTML(this.renderTree);
    return this.result;

};

export default Markdown;