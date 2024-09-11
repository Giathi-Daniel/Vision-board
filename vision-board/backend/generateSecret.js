const crypto = require('crypto');

function generateSecret(length = 64) {
    return crypto.randomBytes(length).toString('hex');
}

console.log(generateSecret());
