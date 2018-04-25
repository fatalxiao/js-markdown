'use strict';

const gutil = require('gulp-util'),
    through = require('through2');

module.exports = () => through.obj(function (chunk, encoding, callback) {

    if (chunk.isNull()) {
        callback(null, chunk);
        return;
    }

    if (chunk.isStream()) {
        callback(new gutil.PluginError('gulp-mini-package-json', 'Streaming not supported'));
        return;
    }

    try {

        const data = JSON.parse(chunk.contents.toString()),

            miniData = {
                name: data.name,
                author: data.author,
                version: data.version,
                description: data.description,
                keywords: data.keywords,
                repository: data.repository,
                license: data.license,
                homepage: data.homepage
            };

        chunk.contents = new Buffer(JSON.stringify(miniData, null, 2));

        this.push(chunk);

    } catch (e) {
        this.emit('error', e);
    }

    callback();

});