describe('end2end', function() {

    beforeEach(() => {
      browser.get('https://angular.io/');
    });

    it('should have a title', () => {
      browser
          .getTitle()
          .then((subject) => {
              expect(subject).toEqual('One framework. - Angular');
          });
    });

    it('should have a hero logo', () => {
        let logo = element(by.css('.hero-logo'));
        expect(logo.isPresent()).toBeTruthy();
    });
});
