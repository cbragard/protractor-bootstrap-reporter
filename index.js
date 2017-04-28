'use strict';

let mkdirp = require('mkdirp');

function ProtractorBootstrapReporter(options) {

    this.specDone = (spec) => {
        this.specs.push(spec);
        this.writer.spec(options.path, 'json', spec);
        this.writer.spec(options.path, 'html', spec);
        browser
            .takeScreenshot()
            .then((png) => {
                this.writer.screenshot(options.path + '/png/', spec.id + '.png', png);
            });
    }

    this.jasmineDone = () => {
        let html;
        for(let i = 0; i < this.specs.length; i++) {
            let style = 'btn-info';
            switch(this.specs[i].status.trim()) {
                case 'passed':
                    style = 'btn-success';
                    break;

                case 'disabled':
                    style = 'btn-warning';
                    break;

                case 'failed':
                    style = 'btn-danger';
                    break;
            }
            html += require('./templates/spec-item-list')(this.specs[i], style);
        }
        let data = this.writer.template('<ul class="list-group">' + html + '</ul>');
        let htmlpath = options.path + '/html';
        let htmlindex = htmlpath + '/index.html';
        this.writer.file(htmlpath, htmlindex, data);

        let specs = JSON.stringify(this.specs);
        let jsonpath = options.path + '/json';
        let jsonindex = jsonpath + '/index.json';
        this.writer.file(jsonpath, jsonindex, data);
    }

    this.suiteDone = (suite) => {
    }

    return this;
}
ProtractorBootstrapReporter.prototype = {
    specs: [],
    writer: require('./js/writer')
}
module.exports = ProtractorBootstrapReporter;
