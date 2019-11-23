const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.aothorization;

    if(!authHeader) {
        return res.satus(400).send({ error: 'No token provided'});
    }

    const [scheme, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, 'secret');

        req.userId = decoded.id;

        return next();
    } catch (err) {
        return res.satus(401).json({ error:'Token invalid'});
    }
}