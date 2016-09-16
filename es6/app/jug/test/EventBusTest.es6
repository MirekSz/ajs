var expect = chai.expect;

import {
    eb as es5
} from '../EventBus';
import {
    eb as es6
} from '../EventBusES6';
import {
    eb as ts
} from '../EventBusTs';
var lastEventData;
var listener = {
    eventName: 'RowSelected',
    handle: (data) => {
        lastEventData = data;
    }
};
describe('Component interactions Tests...', function() {
    for (var subject of[{
            es5
        }, {
            es6
        }, {
            ts
        }]) {
        let name = Object.keys(subject)[0];
        let eb = subject[name];
        describe('EventBus Tests...' + name, function() {
            var sandbox;
            beforeEach(function() {
                sandbox = sinon.sandbox.create();
            });

            afterEach(function() {
                sandbox.restore();
                eb.listeners.clear();
            });

            it('should add listener', function() {
                //given
                var currentSize = eb.listeners.size;

                //when
                eb.addListener(listener);

                //then
                expect(eb.listeners.size || eb.listeners.length).to.be.eq(currentSize + 1);
            });
            it('should invoke listener handler - by mock', function() {
                //given
                var spy = sandbox.stub(listener, 'handle');
                eb.addListener(listener);
                let eventData = {
                    id: 1
                };

                //when
                eb.fire('RowSelected', eventData);


                //then
                expect(spy).to.have.been.calledOnce;
                // sinon.assert.calledOnce(spy);
            });
            it('should invoke listener handler - by variable', function() {
                //given
                eb.addListener(listener);
                let eventData = {
                    id: 1
                };

                //when
                eb.fire('RowSelected', eventData);

                //then
                expect(lastEventData).to.be.eq(eventData);
            });
        });
    }
});
