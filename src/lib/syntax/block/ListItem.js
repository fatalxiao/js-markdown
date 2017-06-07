function render(data = '', node) {
    return `<li>${node.rawValue || ''}${data}</li>`;
}

export default {
    render
};