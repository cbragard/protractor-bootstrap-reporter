'use strict';

global.browser = require('../js/browser.polyfill');

let chai = require('chai');
let spies = require('chai-spies');
let ProtractorBootstrapReporter = require('../index');
let reporter;
let options = {
    path: 'spec/report'
};

describe('unit testing', function() {
    chai.use(spies);

    beforeEach(function() {
        reporter = new ProtractorBootstrapReporter(options);
    });

    it('should done spec', function() {
        let spec = { status: 'passed' };
        let writer = chai.spy.on(reporter.writer, 'spec');
        let screen = chai.spy.on(browser, 'takeScreenshot');
        reporter.specDone(spec);
        chai.expect(writer).to.have.been.called.with(options.path, 'json', spec);
        chai.expect(writer).to.have.been.called.with(options.path, 'html', spec);
        chai.expect(screen).to.have.been.called();
    });

    it('should done suite', function() {
        reporter.suiteDone({});
    });

    it('should done jasmine', function() {
        reporter.jasmineDone();
    });
});
