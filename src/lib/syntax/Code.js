import _ from 'lodash';

function parse(line, index, lines, blocks) {

    const result = line.match(/^(`{3,}|\t|\s{4})\s*(.*?)\s*(?:\n|$)/);

    if (!result) {
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
            type: 'Code',
            rawValue: codeContent.join('\n')
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
            type: 'Code',
            language: result[2],
            rawValue: codeContent.join('\n')
        }, index];

    }

}

function render(data = '', node) {
    return `<pre><code>${data}</code></pre>`;
}

export default {
    parse,
    render
};