# protractor-bootstrap-reporter

[![Build Status](https://travis-ci.org/cbragard/protractor-bootstrap-reporter.svg?branch=master)](https://travis-ci.org/cbragard/protractor-bootstrap-reporter)

Bootstrap Html reporter for protractor and jasmine2 :
  - provides json / html & png formats for each test/spec
  - including bootstrap layout

* protractor.config :
  ```javascript
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
              const ProtractorBootstrapReporter  = require('protractor-bootstrap-reporter');
              jasmine.getEnv().addReporter(new ProtractorBootstrapReporter({
                  path: 'assets/report'
              }));
              browser.driver.manage().window().setSize(960, 600);
          }
      };
  ```

* generated reporting files :
  * ./spec/report/html/(spec).html
  * ./spec/report/json/(spec).json
  * ./spec/report/png/(spec).png

* complete html report on browser:
  * ./spec/report/html/index.html
