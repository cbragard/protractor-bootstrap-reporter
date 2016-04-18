var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var ProtractorHTMLReporter = require('./../index');
var reporter;

describe('protractor-html-reporter testing', function() {
    beforeEach(function() {
        reporter = new ProtractorHTMLReporter({
            path : './'
        });
    });

    it('should provide jasmineDone function', function() {
        var done = reporter.jasmineDone({});
    });
});
