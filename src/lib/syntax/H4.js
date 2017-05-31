function valid(data) {

    if (!data) {
        return false;
    }

    return /^\#\#\#\#\s.+$/.test(data);

}

function content(data) {
    return data.slice(5);
}

function parse(data) {
    return `<h4>${data}</h4>`;
}

export default {
    valid,
    content,
    parse
};