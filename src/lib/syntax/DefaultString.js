function handle(node) {

    let data,
        index = node.rawValue.indexOf('\n\n');

    if (index !== -1) {
        data = node.rawValue.slice(0, index);
        node.rawValue = node.rawValue.slice(index);
        node.rawValue = _.trimStart(node.rawValue, '\n');
    } else {
        data = node.rawValue;
        node.rawValue = '';
    }

    if (node.children) {
        node.children.push({
            rawValue: data,
            parent: node,
            index: node.children.length
        });
    } else {
        node.children = [{
            rawValue: data,
            parent: node,
            index: 0
        }];
    }

}

export default {
    handle
};