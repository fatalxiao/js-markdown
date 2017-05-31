function valid(data) {

    if (!data) {
        return false;
    }

    return /^\#\#\#\#\#\s.+$/.test(data);

}

function content(data) {
    return data.slice(6);
}

function parse(data) {
    return `<h5>${data}</h5>`;
}

export default {
    valid,
    content,
    parse
};