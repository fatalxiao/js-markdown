function valid(data) {

    if (!data) {
        return false;
    }

    return /^\#\s.+$/.test(data);

}

function content(data) {
    return data.slice(2);
}

function parse(data) {
    return `<h1>${data}</h1>`;
}

export default {
    valid,
    content,
    parse
};