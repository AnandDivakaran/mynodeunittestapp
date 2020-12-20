const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const demo = require('./app');

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

    
 
});
