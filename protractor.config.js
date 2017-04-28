'use strict';

let phantomjs = require('phantomjs-prebuilt');
exports.config = {
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': phantomjs.path,
    },
    framework: 'jasmine2',
    directConnect: false,
    specs: ['spec/**/*.e2e.js'],
    onPrepare: function() {
        var ProtractorBootstrapReporter = require('./index.js');
        jasmine.getEnv().addReporter(new ProtractorBootstrapReporter({
            path: 'assets/report'
        }));
        browser.driver.manage().window().setSize(960, 600);
    }
};
