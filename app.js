exports.add = (a, b) => {
    return a + b;
};

exports.addCallback = (a, b, callback) => {
    setTimeout(() => {
        return callback(null, a + b);
    }, 500);
};

exports.addPromise = (a, b) => {
    return Promise.resolve(a + b);
    //return Promise.reject( new Error('fake'));
};