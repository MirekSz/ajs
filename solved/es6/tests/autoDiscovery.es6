/**
 * Created by Mirek on 2016-02-16.
 */
//var testsContext = require.context(".", true, /Test$/);
//testsContext.keys().forEach(testsContext);
// require('source-map-support').install();

function asyncWait(time = TIME_500) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}

function mochaAsync(fn) {
    return (done) => {
        try {
            fn().then(done, done);
        } catch (err) {
            done(err);
        }
    };
}

global.ita = function (description, fn) {
    it(description, mochaAsync(fn));
};

var context = require.context('../app', true, /Test$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);
