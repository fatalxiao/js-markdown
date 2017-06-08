import _ from 'lodash';

function isInlineMatch(line) {

    let result = line.match(/^(`{3,}).*$/);

    if (!result || result.length < 2) {
        return false;
    }

    const startFlag = result[1];
    line = line.slice(startFlag.length);

    if (_.trim(line) === '') {
        return false;
    }

    result = line.match(new RegExp(`[^\`]+(${startFlag})[^\`]+`));
    if (result) {
        return true;
    }

    return false;

}

function parse(line, index, lines, renderTree) {

    let result = line.match(/^(`{3,}|\t| {4})\s*(.*?)(?:\n|$)/);

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

        return [{
            display: 'block',
            type: 'BlockCode',
            rawValue: codeContent.join('\n') + '\n'
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
            rawValue: codeContent.join('\n') + '\n'
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