var jwt = require('jsonwebtoken')

module.exports = function(req, res, next, access) {
	var token = req.headers.authorization
    jwt.verify(token, toaster.local.keyToken, function(err, decoded) {
        if (err) {
            res.status(401);
            res.send('Unauthorized');
        } else {
            if (access == 'super' && decoded.action != 'SuperToken') {
                res.status(401);
                return res.send('Unauthorized');
            }
            if (decoded.action != 'accessToken') {
                res.status(401);
                return res.send('Unauthorized');
            }
            req.session = {
                user: decoded.id || null,
                type: decoded.action
            }
            next(req, res)
        }
    });
}