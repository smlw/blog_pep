const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt-nodejs');

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

router.post('/settings/req', async (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if (!userId || !userLogin) {
        res.redirect('/');

        res.json({
            ok: false
        });
    } else {
        const symbolCount = req.body.symbolCount;
        const period = req.body.period;

        if (!symbolCount || !period) {
            res.json({
                ok: false,
                error: 'Все поля должны быть заполнены!'
            })
        } else {
            try {
                // Смотрим активировал ли пользователь данную фичу.
                const findUser = await models.Apc.find({
                    pwdUserId: userId
                });

                // Если да, то просто обноваляем настройки
                if (findUser.length) {
                    console.log(findUser.pwdUserId);
                    try {
                        await models.Apc.findByIdAndUpdate(findUser[0]._id,
                            {
                                $set: {
                                    symbolCount,
                                    pwdPeriod: period
                                }
                            });

                        res.json({
                            ok: true
                        })
                    } catch (error) {
                        res.json({
                            ok: false,
                            error: 'Не удалось обновить'
                        })
                    }
                // Если нет, то создаем запись в БД.
                } else {
                    try {
                        const User = await models.User.findById(userId);

                        await models.Apc.create({
                            symbolCount,
                            pwdUserId: User.id,
                            pwdPeriod: period,
                            recipientContact: User.phone
                        });


                        res.json({
                            ok: true
                        });
                    } catch (error) {
                        res.json({
                            ok: false,
                            error: 'Ошибка. Повторите позже.'
                        });
                    }
                }


            } catch (error) {
                res.json({
                    ok: false,
                    error: 'Server Error'
                })
            }


        }
    }
});


module.exports = router;