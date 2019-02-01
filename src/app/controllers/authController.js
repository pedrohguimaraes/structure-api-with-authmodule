const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {Cliente} = require('../models');
const authConfig = require('../../config/auth');
const router = express.Router();
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400
    });
}

// Login
router.post('/', async(req, res) => {

    try{
        const postData = req.body;
        const cliente = await Cliente.findOne({ where: {cpf: postData.cpf}});

        if(!cliente)
            res.status(400).send({error: "Usuário não encontrado"});

        if(!await bcrypt.compare(postData.senha, cliente.senha))
            qqq(400).send({error: "Erro ao fazer login, tente novamente"});

        let retorno = { 
            erro: 0,
            usuario: cliente, 
            token: generateToken({ id: cliente.id }) 
        };

        return res.send(retorno);
    }catch(err){
        let retorno = res.status(400).send(err.error);
    }finally{
        return retorno;
    }
});

module.exports = app => app.use('/auth', router);  