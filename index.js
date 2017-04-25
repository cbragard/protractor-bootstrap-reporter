'use strict';

let
    fs     = require('fs'),
    mkdirp = require('mkdirp'),
    path   = require('path');

function ProtractorBootstrapReporter(options) {

    let _self = this;
    let _specs = [];

    function iterateHtml(spec, nested, lvl) {
        let i = (nested > 0) ? nested : 0;
        let innclass = (nested > 0) ? 'list-group-inner collapse' : '';
        let html = '<ul id="inn' + lvl + i + '" class="list-group ' + innclass + '"> \n';
        for (let property in spec) {
            html += '\t <li class="list-group-item"> \n';
            if (spec.hasOwnProperty(property)) {
                let clzz = 'alert-info';
                switch(property) {
                    case 'failedExpectations':
                        clzz = 'btn-danger';
                        break;
                    case 'passedExpectations':
                        clzz =  'btn-success';
                        break;
                    case 'status':
                        switch(spec[property]) {
                            case 'passed':
                                clzz = 'alert-success';
                            break;
                            case 'failed':
                                clzz = 'alert-danger';
                            break;
                            case 'disabled':
                                clzz = 'alert-warning';
                            break;
                        }
                        break;
                }
                if (property !== null && typeof spec[property] === "object") {
                    i++;
                    let count = spec[property].length || 'item';
                    html += require('./templates/spec-detail-button')(clzz, lvl+i, property, count);
                    html += iterateHtml(spec[property], i, lvl);
                } else {
                    if(property === 'id') {
                        html += require('./templates/spec-detail-id')(spec, property);
                    } else {
                        html += require('./templates/spec-detail-property')(spec, property);
                    }
                }
            }
            lvl++;
            html += '\t </li> \n';
        }
        html += '</ul> \n';
        return html;
    }

    function docHtml(html, spec) {
        let data;
        let nav = require('./templates/nav')();
        if(spec) {
            data = nav + require('./templates/spec-detail')(html, spec);
        } else {
            data = nav + html;
        }
        return require('./templates/html')(data);
    }

    function writeSpec(path, fmt, spec) {
        let data;
        switch(fmt) {
            case 'html':
                let html = iterateHtml(spec, 0, 0);
                data = docHtml(html, spec);
                break;

            default:
                data = JSON.stringify(spec);
                break;
        }
        let folder = options.path + '/' + fmt + '/';
        mkdirp(folder, function (err) {
            if(err) {
                console.error(`PBR - writeSpec: error mkdir '${folder}'`);
            } else {
                let filename = path + '/' + fmt + '/' + spec.id + '.' + fmt;
                fs.writeFile(filename, data, function (err) {
                    if(err) {
                        console.error(`PBR - writeSpec: error writting '${filename}'`);
                    }
                });
            }
        });
    }

    function writeScreenshot(data, filename) {
        let stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

    function sanitizeFilename(name){
        name = name.replace(/\s+/gi, '-');
        return name.replace(/[^a-zA-Z0-9\-]/gi, '');
    }

    _self.specDone = function(spec) {
        _specs.push(spec);
        writeSpec(options.path, 'json', spec);
        writeSpec(options.path, 'html', spec);
        spec.screenshot = spec.id + '.png';
        browser.takeScreenshot().then(function (png) {
            browser.getCapabilities().then(function (capabilities) {
                let folder =  options.path + '/png/';
                mkdirp(folder, function (err) {
                    if (err) {
                        console.error(`PBR - specDone: error mkdir '${folder}'`);
                    }
                    writeScreenshot(png, folder + spec.screenshot);
                });
            });
        });
    }

    _self.jasmineDone = function() {
        let html = '<ul class="list-group">';
        for(let i = 0; i < _specs.length; i++) {
            let clzz = 'btn-info';
            switch(_specs[i].status.trim()) {
                case 'passed':
                    clzz = 'btn-success';
                    break;

                case 'disabled':
                    clzz = 'btn-warning';
                    break;

                case 'failed':
                    clzz = 'btn-danger';
                    break;
            }
            html += require('./templates/spec-item-list')(_specs[i], clzz)
        }
        html += '</ul>';
        let data = docHtml(html);
        let htmlpath = options.path + '/html';
        let htmlindex = htmlpath + '/index.html';
        mkdirp(htmlpath, function (err) {
            if(err) {
                console.error(`PBR - jasmineDone: mkdir error '${htmlpath}'`);
            } else {
                fs.writeFile(htmlindex, data, function (err) {
                    if(err) {
                        console.error(`PBR - jasmineDone: error writting '${htmlindex}'`);
                    }
                });
            }
        });
        let specs = JSON.stringify(_specs);
        let jsonpath = options.path + '/json';
        let jsonindex = jsonpath + '/index.json';
        mkdirp(jsonpath, function (err) {
            if(err) {
                console.error(`PBR - jasmineDone: mkdir error '${jsonpath}'`);
            } else {
                fs.writeFile(jsonindex, data, function (err) {
                    if(err) {
                        console.error(`PBR - jasmineDone: error writting '${jsonindex}'`, err);
                    }
                });
            }
        });
    }
    _self.suiteDone = function(suite) {}
    return _self;
}
module.exports = ProtractorBootstrapReporter;
