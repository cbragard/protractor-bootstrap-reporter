module.exports = new function() {
    this.takeScreenshot = () => {
        let promise = new Promise((resolve, reject) => {
            resolve(null);
        });
        return promise;
    }
}
