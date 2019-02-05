const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models');
//const authConfig = require('../../../resources/auth');
const mailer = require('../../modules/mailer');
const crypto = require('crypto');


function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400
    });
}

// Login
router.post('/', async(req, res) => {

    try{
        const postData = req.body;
        const user = await User.findAll({ where: {username: postData.username}});
        console.log(user);
        
        // if(!user)
        //     res.status(400).send({error: "Usuário não encontrado"});

        // if(!await bcrypt.compare(postData.password, user.password))
        //     res.status(400).send({error: "Erro ao fazer login, tente novamente"});

        // var retorno = { 
        //     erro: 0,
        //     usuario: user, 
        //     token: generateToken({ id: user.id }) 
        // };
    }catch(err){
        var retorno = res.status(400).send(err.error);
    }
});

// Recuperação de senha
router.post('/forgot', async(req, res) =>{
    const postData = req.body;

    try{

        // Busca o usuário pelo email
        const user = await User.findAll({ where: { email: postData.email} });

        if(!user)
            return res.status(400).send({error: "User not found"});

        // token para mudança de senha
        const token = crypto.randomBytes(20).toString('hex');
        
        // Tempo de expiração do token
        const now = new Date();
        now.setHours(now.getHours() +1);

        // Update
        User.update({
            passwordResetToken: token,
            passwordResetExpires: now
        }, {
            where: {
                id : user.id
            }
        })

        // Envio de email
        mailer.sendMail({
            to: email,
            from: 'pedroguimaraes@email.com.br',
            template: 'auth/forgot_password',
            context: { token }
        }, (err) => {
            if(err)
                return res.status(400).send({error: 'Cannot send forgot password email'});
            
            return res.send();
        });

    }catch(err){
        res.status(400).send({error: 'Error on forgot password, try again'});
    }
});

router.post('/reset', async(req, res) => {

    const {email, token, password} = req.body;

    try{
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if(!user)
            return res.status(400).send({error: "User not found"});
            
        if(token !== user.passwordResetToken)
            return res.status(400).send({error: "Token invalid"});

        const now = new Date();

        if(now > user.passwordResetExpires)
            return res.status(400).send({error: "Token expired, generate a new one"});
         
        user.password = password;
        
        await user.save();
        res.send();
        
    }catch(err){
        
        res.status(400).send({ error: 'Cannot reset password, try again'});
    }
});

module.exports = app => app.use('/auth', router);  