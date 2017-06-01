import Util from './utils/Util';
import Syntax from './syntax';

function Markdown(data) {

    this._initData = this.initialData(data);

    this._dataBlocks = [];
    this._renderTree = null;
    this._result = '';

}

Markdown.parse = function (data) {
    let md = new Markdown(data);
    return md.render();
};

Markdown.prototype.initialData = function (data) {
    return data.replace(/\r\n?/g, '\n');
};

Markdown.prototype.toBlock = function () {

    let reg = /([\s\S]+?)(\n(?:\s*\n|$)+|$)/g,
        lineNumber = 0,
        result,
        blocks = [];

    if ((result = /^(\s*\n)/.exec(this._initData)) !== null) {
        lineNumber = Util.countLines(result[0]);
        reg.lastIndex = result[0].length;
    }

    while ((result = reg.exec(this._initData)) !== null) {
        blocks.push({
            rawValue: result[1],
            trail: result[2],
            lineNumber
        });
        lineNumber += Util.countLines(result[0]);
    }

    return blocks;

};

Markdown.prototype.toTree = function () {

};

Markdown.prototype.toHTML = function () {

};

Markdown.prototype.render = function () {

    this._dataBlocks = this.toBlock();

    this._renderTree = this.toTree();

    return this.toHTML();

};

export default Markdown;