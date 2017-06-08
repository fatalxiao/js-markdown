function parse(str, children, renderTree) {

    let result = str.match(/^(`+)/);

    if (!result) {
        return;
    }

    let flag = result[1],
        restStr;

    while (flag.length > 0) {

        restStr = str.slice(flag.length);
        result = restStr.match(new RegExp(`^(.*?)(${flag})`));

        if (result) {
            break;
        }

        flag = flag.slice(1);

    }

    if (!result) {
        return;
    }

    return [{
        display: 'inline',
        type: 'InlineCode',
        rawValue: result[1]
    }, result[1].length + flag.length * 2];

}

function render(data = '', node) {
    return `<code>${node.rawValue || ''}${data}</code>`;
}

export default {
    parse,
    render
};