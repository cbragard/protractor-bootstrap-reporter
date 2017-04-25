'use strict';

let chai = require('chai');
let expect = chai.expect;
let ProtractorBootstrapReporter = require('../index');
let reporter;

describe('unit testing', function() {
    beforeEach(function() {
        reporter = new ProtractorBootstrapReporter({
            path: 'spec/report'
        });
    });

    it('should generate the report', function() {
        reporter.jasmineDone({});
    });
});
