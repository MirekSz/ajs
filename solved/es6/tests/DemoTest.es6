r expect = chai.expect;
var renderId = 0;
function takeScreenshot(file) {
    // check if we are in PhantomJS
    if (window.top.callPhantom === undefined) return;

    var options = {type: 'render'};
    // if the file argument is defined, we'll save the file in the path defined eg: `fname: '/tmp/myscreen.png'
    // otherwise we'll save it in the default directory with a progressive name
    options.fname = file || '.tmp/screenshots/' + (renderId++) + '.png';

    // this calls the onCallback function of PhantomJS, the type: 'render' will trigger the screenshot script
    window.top.callPhantom(options);
}


import Demo from '../app/Demo';
new Demo().sayHello();
describe('Main function', function () {


    it('should fill the text fields that correspond to an answer', function () {
    });

    it('should select the options that correspond to an answer', function (done) {
        require(['./lazy.es6'], function (module) {
            expect(new module.Miro().getVal()).to.be.eq(5);
            done()
        });
    });

    it('should skip fields where the question has changed', function () {
    });
});

describe('Initialization', function () {
    it('should initialize the main object', function () {
    });
});
