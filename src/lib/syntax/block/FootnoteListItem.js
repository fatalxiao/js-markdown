'use strict';

function render(data = '', node) {
    const index = node.index + 1;
    return `<li id="fn${index}">${node.rawValue || ''}${data}<a href="#fnref${index}" rev="footnote">↩</a></li>`;
}

export default {
    render
};