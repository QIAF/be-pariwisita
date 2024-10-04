const jwt = require('jsonwebtoken')
function createToken (user) {
    const payload = {
        id: user.id,
        name: user.name,
    }
    console.log(payload)
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES,});
}
module.exports = createToken;