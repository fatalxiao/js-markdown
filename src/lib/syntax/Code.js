import _ from 'lodash';

function parse(line, index, lines, blocks) {

    const result = line.match(/^(`{3,})\s*(.*?)\s*(?:\n|$)/);

    if (!result) {
        return;
    }

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

function render(data = '', node) {
    return `<pre><code>${data}</code></pre>`;
}

export default {
    parse,
    render
};