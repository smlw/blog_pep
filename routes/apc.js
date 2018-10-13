const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt-nodejs');

console.log(models.Apc.userId);

router.get('/settings', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if (!userId || !userLogin) {
        res.redirect('/');
    } else {
        res.render('apc/apc-settings', {
            user: {
                id: userId,
                login: userLogin
              }
        })
    }

})


module.exports = router;