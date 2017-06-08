function parse(str, children, renderTree) {

    const flag = str.at(0),
        reg = new RegExp(`([\\s\\S]*?)(\\${flag})`);

    let restStr = str.slice(1);

    if (!restStr.includes(flag)) {
        return;
    }

    let count = 0,
        pn = 1,
        resultStr = '',
        result;

    while (restStr.length > 0) {

        if (restStr.startsWith(flag + flag)) {
            restStr = restStr.slice(2);
            resultStr += flag + flag;
            count += pn;
            pn = -pn;
        }

        result = restStr.match(reg);

        if (!result) {
            break;
        }

        if (result[1]) {
            restStr = restStr.slice(result[1].length);
            resultStr += result[1];
            continue;
        }

        if (count === 0 && result[2]) {
            break;
        }

    }

    if (resultStr.length > 0) {

        const node = {
            display: 'inline',
            type: 'Emphasize',
            rawValue: resultStr
        };

        this.parseInline(node);

        return [node, resultStr.length + 2];

    }

    return;

}

function render(data = '', node) {
    return `<em>${node.rawValue || ''}${data}</em>`;
}

export default {
    parse,
    render
};