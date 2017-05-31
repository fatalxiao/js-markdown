function valid(data) {

    if (!data) {
        return false;
    }

    return /^\#\#\#\#\#\#\s.+$/.test(data);

}

function content(data) {
    return data.slice(7);
}

function parse(data) {
    return `<h6>${data}</h6>`;
}

export default {
    valid,
    content,
    parse
};