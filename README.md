# protractor-bootstrap-reporter

[![Build Status](https://travis-ci.org/cbragard/protractor-bootstrap-reporter.svg?branch=master)](https://travis-ci.org/cbragard/protractor-bootstrap-reporter)

Html reporter for protractor and jasmine2 :
  - provides json / html & png formats for each test/spec
  - bootstrap layout

* protractor.config :
  ```javascript
    exports.config = {
        capabilities: {
            'browserName': 'phantomjs',
            'phantomjs.binary.path': phantomjs.path,
        },
        framework: 'jasmine2',
        directConnect: false,
        specs: ['spec/**/*[sS]pec.js'],
        onPrepare: function() {
            var ProtractorHTMLReporter = require('./index.js');
            jasmine.getEnv().addReporter(new ProtractorHTMLReporter({
                path: 'spec/report'
            }));
        }
    };
  ```

* generated reporting files :
  * ./spec/report/html/(spec).html
  * ./spec/report/json/(spec).json
  * ./spec/report/png/(spec).png

* complete html report on browser:
  * ./spec/report/html/index.html
