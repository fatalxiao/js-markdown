import _ from 'lodash';
import Util from '../../utils/Util';

function isInlineMatch(line) {
    return line.match(/^([`~]{3,}).*\1/);
}

function parse(line, index, lines, renderTree) {

    let result = line.match(/^([`~]{3,}|\t| {4})\s*(.*?)(?:\n|$)/);

    if (!result) {
        return;
    }

    if (isInlineMatch(line)) {
        return;
    }

    if (result[1] === '\t' || result[1] === '    ') {

        const indentLen = result[1].length;
        let codeContent = [result[2]];
        index++;

        for (let len = lines.length; index < len; index++) {
            if (_.trim(lines[index]) !== '' && !lines[index].startsWith(result[1])) {
                break;
            }
            codeContent.push(lines[index].slice(indentLen));
        }

        while (_.trim(codeContent[codeContent.length - 1]) === '') {
            codeContent.pop();
        }

        return [{
            display: 'block',
            type: 'BlockCode',
            rawValue: Util.encodeHTML(Util.trimEndBlankLines(codeContent).join('\n')) + '\n'
        }, index - 1];

    } else {

        let codeContent = [];
        index++;
        for (let len = lines.length; index < len; index++) {
            if (_.trimEnd(lines[index]) === result[1]) {
                break;
            }
            codeContent.push(lines[index]);
        }

        return [{
            display: 'block',
            type: 'BlockCode',
            language: result[2],
            rawValue: Util.encodeHTML(Util.trimEndBlankLines(codeContent).join('\n'))
        }, index];

    }

}

function render(data = '', node) {
    return `<pre><code>${node.rawValue || ''}${data}</code></pre>`;
}

export default {
    parse,
    render
};