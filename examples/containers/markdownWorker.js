import Markdown from 'dist';

onmessage = function (event) {
    postMessage(Markdown.parse(event.data));
};