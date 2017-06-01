function valid(data) {

    if (!data) {
        return false;
    }

    const dataArray = data.split('\n');
    if (dataArray[1]) {

    }

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