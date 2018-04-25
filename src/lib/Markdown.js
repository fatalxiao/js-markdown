'use strict';

import Util from './utils/Util';
import Str from './utils/Str';
import Header from './utils/Header';
import Syntax from './syntax';

// String at method polyfill
if (!String.prototype.at) {
    (function () {
        'use strict';
        String.prototype.at = Str.at;
    }());
}

/**
 * Markdown constructor
 * @param data
 * @constructor
 */
function Markdown(data = '', options = {}) {

    this.initData = data;
    this.renderTree = null;
    this.html = '';

    this.fullInfo = !!options.fullInfo;

}

/**
 * static method
 * @param data
 */
Markdown.parse = function (data, options) {
    return new Markdown(data, options).render();
};

/** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- parse -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

/**
 * traverse block types to identify line syntax
 * @param line
 * @param index
 * @param lines
 * @param renderTree
 * @returns {*}
 */
Markdown.prototype.parseBlock = function (line, index, lines, renderTree) {

    let result;

    for (let i = 0, len = Syntax.blockTypes.length; i < len; i++) {

        result = Syntax[Syntax.blockTypes[i]].parse.call(this, line, index, lines, renderTree);

        if (!result) {
            continue;
        }

        return result;

    }

    return;

};

/**
 * split markdown file to block nodes according to lines, and append to renderTree
 * @param lines
 * @param renderTree
 */
Markdown.prototype.parseBlocks = function (lines, renderTree) {

    let line,
        block;

    for (let i = 0, len = lines.length; i < len; i++) {

        line = lines[i];

        const result = this.parseBlock(line, i, lines, renderTree);

        if (result) {
            [block, i] = result;
        } else {
            block = {
                type: 'Text',
                rawValue: line
            };
        }

        if (renderTree && renderTree.children && block) {
            renderTree.children.push(block);
        }

    }

};

/**
 * match inline syntax
 * @param str
 * @param children
 * @returns {*}
 */
Markdown.prototype.matchInline = function (str, children) {

    const reg = /([\s\S]*?)(\\|(?:!\[)|(?:\[\^)|\[|<|`|(  \n)|(?:\*\*)|(?:__)|\*\*|__|\*|_|\n|\s)/;

    let result = Str.matchUrl(str);

    if (result) {
        return [{
            type: 'Anchor',
            rawValue: result[0]
        }, result[0].length];
    }

    result = str.match(reg);

    if (!result) {
        return [{
            type: 'Text',
            rawValue: str
        }, str.length];
    } else if (result[1]) {
        return [{
            type: 'Text',
            rawValue: result[1]
        }, result[1].length];
    }

    let res;
    if (result[2] in Syntax.inlineTypes) {
        res = Syntax[Syntax.inlineTypes[result[2]]].parse.call(this, str, children, this.renderTree);
    } else if (result[2] === '\n' && str === '\n') {
        return [{
            type: 'Text',
            rawValue: ''
        }, result[2].length];
    }

    return res || [{
        type: 'Text',
        rawValue: result[2]
    }, result[2].length];

};

/**
 * split line to several inline nodes
 * @param node
 */
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
            if (inline.type === 'Text'
                && children && children.length > 0 && children[children.length - 1].type === 'Text') {
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

/**
 * traverse renderTree to parse inline syntax
 * @param renderTree
 */
Markdown.prototype.parseInlines = function (renderTree) {
    Util.postOrderTraverse.call(this, renderTree, this.parseInline);
};

/**
 * first time format footnotes after parsed blocks
 */
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

/**
 * second time format footnotes after parsed parse inline
 * in order to filter some footnotes not used
 */
Markdown.prototype.reformatFootnotes = function () {
    this.renderTree.footnotes = this.renderTree.footnotes.filter(item => item.activated);
};

/**
 * generate the render tree from the input markdown data
 */
Markdown.prototype.parseTree = function () {

    const data = Str.formatCRLF(this.initData),
        lines = data.split('\n');

    this.renderTree = {
        isRoot: true,
        metaData: {},
        referenceDefine: {},
        headerTree: Header.initRoot(),
        footnotes: [],
        children: []
    };

    this.parseBlocks(lines, this.renderTree);

    this.formatFootnotes();

    this.parseInlines(this.renderTree);

    this.reformatFootnotes();

};

/** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- render -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

/**
 * render tree to html string
 * @param node
 * @returns {*}
 */
Markdown.prototype.toHTML = function (node = this.renderTree) {

    let string = '';

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            string += this.toHTML(node.children[i]);
        }
    }

    if (node.type && Syntax[node.type] && Syntax[node.type].render) {
        return Syntax[node.type].render(string, node, this.renderTree);
    } else {
        return node.rawValue || '' + string;
    }

    return string;

};

/**
 * footnotes to html string
 * @returns {*}
 */
Markdown.prototype.renderFootnotes = function () {

    if (!this.renderTree.footnotes || this.renderTree.footnotes.length < 1) {
        return '';
    }

    const footnotes = this.renderTree.footnotes.map((item, index) => ({
            type: 'FootnoteListItem',
            index,
            rawValue: item.rawValue
        })),
        node = {
            type: 'Footnote',
            children: [{
                type: 'List',
                isOrder: true,
                children: footnotes
            }]
        };

    this.parseInlines(node);

    return this.toHTML(node);

};

/**
 * render html string for result
 */
Markdown.prototype.renderHTML = function () {
    this.html = this.toHTML(this.renderTree);
    this.html += this.renderFootnotes();
};

/** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- main -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

/**
 * markdown render main method
 * @returns {*|string}
 */
Markdown.prototype.render = function () {

    this.parseTree();

    this.renderHTML();

    return this.fullInfo ?
        {
            html: this.html,
            renderTree: this.renderTree
        }
        :
        this.html;

};

export default Markdown;