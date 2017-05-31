function valid(data) {

    if (!data) {
        return false;
    }

    return /^\#\#\#\s.+$/.test(data);

}

function content(data) {
    return data.slice(4);
}

function parse(data) {
    return `<h3>${data}</h3>`;
}

export default {
    valid,
    content,
    parse
};