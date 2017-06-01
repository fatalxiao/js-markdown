function valid(data) {

    if (!data) {
        return false;
    }

    return /^\#\#\#\#\#\s/.test(data);

}

function handle(node) {

    let data,
        index = node.rawValue.indexOf('\n');

    if (index !== -1) {
        data = node.rawValue.slice(6, index);
        node.rawValue = node.rawValue.slice(index);
        node.rawValue = _.trimStart(node.rawValue, '\n');
    } else {
        data = node.rawValue.slice(6);
        node.rawValue = '';
    }

    if (node.children) {
        node.children.push({
            type: 'H5',
            rawValue: data,
            parent: node,
            index: node.children.length
        });
    } else {
        node.children = [{
            type: 'H5',
            rawValue: data,
            parent: node,
            index: 0
        }];
    }

}

function parse(data) {
    return `<h5>${data}</h5>`;
}

export default {
    valid,
    handle,
    parse
};