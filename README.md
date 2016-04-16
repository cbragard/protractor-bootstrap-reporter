# protractor-html-reporter

Html reporter for protractor and jasmine2 :
  - provides json / html & png formats for each test/spec
  - bootstrap layout


* install:
  - git clone git@github.com:cbragard/protractor-html-reporter.git
  - cd protractor-html-reporter
  - npm install

* test:
  * npm test

* use in protractor.config :
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

* how to check generated reporting files :
  * ./spec/report/html/(spec).html
  * ./spec/report/json/(spec).json
  * ./spec/report/png/(spec).png

* get the complete html report on browser:
  * open ./spec/report/html/index.html
