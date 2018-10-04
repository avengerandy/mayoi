const assert = require('assert');
const http = require('http');

function getBody(options) {
    return new Promise ((resolve, reject) => {
        let req = http.get(options);
        let body = "";
        req.on('response', function (response) {
            response.on('data', function (chunk) {
                body += chunk;
                resolve(body);
            });
        });
        req.on('error', err => {
            reject(err);
        });
    }); 
}

function getStatusCode(options) {
    return new Promise ((resolve, reject) => {
        let req = http.get(options);
        req.on('response', function (response) {
            resolve(response.statusCode);
        });
        req.on('error', err => {
            reject(err);
        });
    }); 
}

module.exports = [
    async function test_getBody() {
        let body = await getBody('http://127.0.0.1:8080');
        assert.equal("Hello World", body);
    },
    async function test_getBody() {
        let statusCode = await getStatusCode('http://127.0.0.1:8080');
        assert.equal(200, statusCode);
    }
]
