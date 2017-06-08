function render(data = '', node) {

    const checkbox = node.checked !== undefined ?
        `<input type="checkbox" ${node.checked ? 'checked' : ''}>`
        :
        '';

    return `<li>${checkbox}${node.rawValue || ''}${data}</li>`;

}

export default {
    render
};