const express = require('express');
const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400
    });
}

// Login
router.get('/', async(req, res) => {

    return res.send({erro:0, msg: 'asdadasad'});
    
});

module.exports = app => app.use('/teste', router);  