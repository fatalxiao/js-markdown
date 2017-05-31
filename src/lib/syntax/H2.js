function valid(data) {

    if (!data) {
        return false;
    }

    return /^\#\#\s.+$/.test(data);

}

function content(data) {
    return data.slice(3);
}

function parse(data) {
    return `<h2>${data}</h2>`;
}

export default {
    valid,
    content,
    parse
};