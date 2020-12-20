const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(chaiAsPromised);
chai.use(sinonChai);
const rewire = require('rewire');


let demo = rewire('./app');

describe('app', () => {

    context('add', () => {
        it('should add two numbers', () => {
            expect(demo.add(1, 2)).to.be.equal(3);
        });
    });

    context('addCallback', () => {
        it('should add two numbers without throwing an error', (done) => {
            demo.addCallback(1, 2, (err, result) => {
                expect(err).to.not.exist;
                expect(result).to.be.equal(3);
                done();
            });
        });
    });

    context('addPromise', () => {
        it('should add two numbers without throwing an error', (done) => {
            demo.addPromise(1, 2).then((result) => {
                expect(result).to.be.equal(3);
                done();
            }).catch(err => {
                done(err);
            });
        });

        it('should add two numbers using async/await', async() => {
            let result = await demo.addPromise(1, 2);
            expect(result).to.be.equal(3);
        });        

        it('should add two numbers using chai-as-promised', async() => {
            await expect(demo.addPromise(1, 2)).to.eventually.equal(3);
        });    
    });

    context('foo', () => {
        it('spy on log', () => {
            let spy = sinon.spy(console, 'log');
            demo.foo();
            //expect(spy.calledOnce).to.be.true;
            expect(spy).to.have.been.calledOnce;
            spy.restore();
        });

        it('should stub console.warn', () => {
            let stub = sinon.stub(console, 'warn').callsFake(() => { console.log('Message from Stub')});
            demo.foo();
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWith('console.warn was called');
            stub.restore();
        });            
    });  
 
    context('bar', () => {
        it('should stub private function', async () => {
            let createStub = sinon.stub(demo , 'createFile').resolves('create_stub');
            let callStub = sinon.stub().resolves('calldb_stub');

            demo.__set__('callDB', callStub);

            let result = await demo.bar('test.txt');

            expect(result).to.equal('calldb_stub');
            expect(callStub).to.have.been.calledOnce;
            expect(createStub).to.have.been.calledOnce;
            expect(createStub).to.have.been.calledWith('test.txt');
        });     
    });
});
