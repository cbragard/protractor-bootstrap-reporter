let
    fs = require('fs'),
    mkdirp = require('mkdirp');

module.exports = new function() {

    /**
    */
    this.build = (spec, nested, lvl) => {
        let i = (nested > 0) ? nested : 0;
        let innclass = (nested > 0) ? 'list-group-inner collapse' : '';
        let html = '<ul id="inn' + lvl + '' + i + '" class="list-group ' + innclass + '"> \n';
        for (let property in spec) {
            html += '\t <li class="list-group-item"> \n';
            if (spec.hasOwnProperty(property)) {
                let style = 'alert-info';
                switch(property) {
                    case 'failedExpectations':
                        style = 'btn-danger';
                        break;
                    case 'passedExpectations':
                        style = 'btn-success';
                        break;
                    case 'status':
                        switch(spec[property]) {
                            case 'passed':
                                style = 'alert-success';
                            break;
                            case 'failed':
                                style = 'alert-danger';
                            break;
                            case 'disabled':
                                style = 'alert-warning';
                            break;
                        }
                        break;
                }
                if (property !== null && typeof spec[property] === "object") {
                    i++;
                    let count = spec[property].length || 'item';
                    html += require('../templates/spec-detail-button')(style, lvl + '' + i, property, count);
                    html += this.build(spec[property], i, lvl);
                } else {
                    if (property === 'id') {
                        html += require('../templates/spec-detail-id')(spec, property);
                    } else {
                        html += require('../templates/spec-detail-property')(spec, property);
                    }
                }
            }
            lvl++;
            html += '\t </li> \n';
        }
        html += '</ul> \n';
        return html;
    }

    /**
    */
    this.file = (path, filename, data) => {
        mkdirp(path, function (err) {
            if(err) {
                console.error(`PBR - mkdir error '${path}'`);
            } else {
                fs.writeFile(filename, data, function (err) {
                    if(err) {
                        console.error(`PBR - error writting '${filename}'`, err);
                    }
                });
            }
        });
    }

    /**
    */
    this.template = (html, spec) => {
        let data;
        let nav = require('../templates/nav')();
        if(spec) {
            data = nav + require('../templates/spec-detail')(html, spec);
        } else {
            data = nav + html;
        }
        return require('../templates/html')(data);
    }

    /**
    */
    this.screenshot = (path, filename, png) => {
        mkdirp(path, function (err) {
            if (err) {
                console.error(`PBR - specDone: error mkdir '${folder}'`);
            } else {
                let stream = fs.createWriteStream(path + filename);
                stream.write(new Buffer(png, 'base64'));
                stream.end();
            }
        });
    }

    /**
    */
    this.spec = (path, fmt, spec) => {
        let data;
        switch(fmt) {
            case 'html':
                let html = this.build(spec, 0, 0);
                data = this.template(html, spec);
                break;

            default:
                data = JSON.stringify(spec);
                break;
        }
        let folder = path + '/' + fmt + '/';
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
}
