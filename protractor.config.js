// An example configuration file
var phantomjs = require('phantomjs-prebuilt');
exports.config = {
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': phantomjs.path,
    },
    framework: 'jasmine2',
    directConnect: false,
    specs: ['spec/**/*.e2e.js'],
    onPrepare: function() {
        var ProtractorHTMLReporter = require('./index.js');
        jasmine.getEnv().addReporter(new ProtractorHTMLReporter({
            path: 'spec/report'
        }));
    }
};
