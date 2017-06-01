function valid(data) {

    if (!data) {
        return false;
    }

    return /^\#\#\s/.test(data);

}

function handle(node) {

    let data,
        index = node.rawValue.indexOf('\n');

    if (index !== -1) {
        data = node.rawValue.slice(3, index);
        node.rawValue = node.rawValue.slice(index);
        node.rawValue = _.trimStart(node.rawValue, '\n');
    } else {
        data = node.rawValue.slice(3);
        node.rawValue = '';
    }

    if (node.children) {
        node.children.push({
            type: 'H2',
            rawValue: data,
            parent: node,
            index: node.children.length
        });
    } else {
        node.children = [{
            type: 'H2',
            rawValue: data,
            parent: node,
            index: 0
        }];
    }

}

function parse(data) {
    return `<h2>${data}</h2>`;
}

export default {
    valid,
    handle,
    parse
};