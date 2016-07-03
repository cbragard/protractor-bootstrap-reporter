'use strict';

var
    fs     = require('fs'),
    mkdirp = require('mkdirp'),
    path   = require('path');

function ProtractorHTMLReporter(options) {

    var _self = this;
    var _specs = [];

    function iterateHtml(spec, nested, lvl) {
        var i = (nested > 0) ? nested : 0;
        var innclass = (nested > 0) ? 'list-group-inner collapse' : '';
        var html = '<ul id="inn' + lvl + i + '" class="list-group ' + innclass + '"> \n';
        for (var property in spec) {
            html += '\t <li class="list-group-item"> \n';
            if (spec.hasOwnProperty(property)) {
                var clzz;
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
                            default:
                                clzz = 'alert-info';
                            break;
                        }
                        break;
                    default:
                        clzz = 'alert-info';
                        break;
                }
                if (property !== null && typeof spec[property] === "object") {
                    i++;
                    var count = spec[property].length || 'item';
                    html += '<button class="btn btn-default ' + clzz + '" data-toggle="collapse" data-target="#inn' + lvl +  i + '">' + count + ' ' + property + ' </button> \n';
                    html += iterateHtml(spec[property], i, lvl);
                } else {
                    if(property === 'id') {
                        html += '<div class="well">' +
                            '<strong>' + spec[property] + '</strong> ' +
                            '<a href="../json/' + spec.id + '.json" target="_blank">' +
                                '<span class="glyphicon glyphicon-wrench"></span> ' +
                                ' JSON ' +
                            '</a>' +
                        '</div> \n';
                    } else {
                        html += '<div class="well"><strong>' + property + '</strong> ' + spec[property] + '</div> \n';
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
        var nav =
        '<nav class="navbar navbar-inverse navbar-static-top">' +
          '<div class="container">' +
            '<div class="navbar-header">' +
              '<a class="navbar-brand" href="index.html">Protractor Html Reporter</a>' +
            '</div>'+
          '</div>' +
        '</nav>';
        if(spec) {
            var data = nav +
            '<div class="media">' +
                '<div class="media-body">' +
                    html  +
                '</div>' +
                '<div class="media-right">' +
                    '<img src="../png/' + spec.id + '.png" alt="' + spec.id + '" class="">' +
                '</div>' +
            '</div>';
        } else {
            var data = nav + html;
        }
        var doc = '' +
            '<html> \n' +
                '\t <head> \n' +
                    '\t\t <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" media="all"/> \n' +
                '\t </head> \n' +
                '<body> \n' +
                    '<div class="container">' + data + '</div>' +
                    '<script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>' +
                    '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script> \n' +
                '</body> \n' +
            '</html> \n';
        return doc;
    }

    function writeSpec(path, fmt, spec) {
        switch(fmt) {
            case 'html':
                var html = iterateHtml(spec, 0, 0);
                var data = docHtml(html, spec);
                break;

            default:
                var data = JSON.stringify(spec);
                break;
        }
        var folder = options.path + '/' + fmt + '/';
        mkdirp(folder, function (err) {
            if(err) {
                throw new Error('Error folder creation ' + folder);
            }
            var filename = path + '/' + fmt + '/' + spec.id + '.' + fmt;
            fs.writeFile(filename, data, function (err) {
                if(err) {
                    console.log('Error writting ' + filename);
                }
            });
        });
    }

    function writeScreenshot(data, filename) {
        var stream = fs.createWriteStream(filename);
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
                var folder =  options.path + '/png/';
                mkdirp(folder, function (err) {
                    if (err) {
                        throw new Error('Error folder creation ' + folder);
                    }
                    writeScreenshot(png, folder + spec.screenshot);
                });
            });
        });
    }

    _self.jasmineDone = function() {
        var html = '<ul class="list-group">';
        for(var i = 0; i < _specs.length; i++) {
            var clzz = '';
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

                default:
                    clzz = 'btn-info';
                    break;
            }
            html += '<li class="list-group-item">' +
                '<div class="media">' +
                    '<div class="media-left">' +
                        '<a href="' + _specs[i].id + '.html">' +
                            '<img height="135" src="../png/' + _specs[i].id + '.png">' +
                        '</a>' +
                    '</div>' +
                    '<div class="media-body">' +
                        '<h2>' + _specs[i].id + '</h2>' +
                        '<p>' + _specs[i].fullName + '</p>' +
                        '<a href="' + _specs[i].id + '.html" class="btn ' + clzz + '">' +
                            '<span class="glyphicon glyphicon-search"></span> ' +
                            _specs[i].status +
                        ' </a>' +
                    '</div>' +
                '</div>' +
            '</li>';
        }
        html += '</ul>';
        var data = docHtml(html);
        var filename = options.path + '/html/index.html';
        fs.writeFile(filename, data, function (err) {
            if(err) {
                console.log('Error writting ' + filename);
            }
        });

        var data = JSON.stringify(_specs);
        var filename = options.path + '/json/index.json';
        fs.writeFile(filename, data, function (err) {
            if(err) {
                console.log('Error writting ' + filename);
            }
        });
    }

    _self.suiteDone = function(suite) {
    }

    return _self;
}
module.exports = ProtractorHTMLReporter;
