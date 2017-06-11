'use strict';

import Util from '../../utils/Util';

function isInlineMatch(line) {
    return line.match(/^([`~]{3,}).*\1/);
}

function parse(line, index, lines, renderTree) {

    let result = line.match(/^([`~]{3,}| {4}|\t| {0,3}\t)\s*(.*?)(?:\n|$)/);

    if (!result) {
        return;
    }

    if (isInlineMatch(line)) {
        return;
    }

    if (result[1].includes('\t') || result[1].includes(' ')) { // space or tab

        const indentLen = result[1].length;
        let codeContent = [result[2]];
        index++;

        for (let len = lines.length; index < len; index++) {
            if (Util.trim(lines[index], ' \t') !== '' && !lines[index].startsWith(result[1])) {
                break;
            }
            codeContent.push(lines[index].slice(indentLen));
        }

        return [{
            type: 'BlockCode',
            rawValue: Util.encodeHTML(Util.trimEndBlankLines(codeContent).join('\n')) + '\n'
        }, index - 1];

    } else { // ``` or ~~~

        let codeContent = [];
        index++;
        for (let len = lines.length; index < len; index++) {
            if (Util.trimEnd(lines[index], ' \t') === result[1]) {
                break;
            }
            codeContent.push(lines[index]);
        }

        return [{
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