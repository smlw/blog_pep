const express = require('express');
const router = express.Router();
const models = require('../models');
const moment = require('moment');

router.get('/settings', async (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if (!userId || !userLogin) {
        res.redirect('/');
    } else {
        const apcSettings = await models.Apc.findOne({
            pwdUserId: userId
        }).populate('pwdUserId');


        res.render('apc/apc-settings', {
            apcSettings,
            moment,
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
        const passwordLength = req.body.symbolCount;
        const period = req.body.period;

        if (!passwordLength || !period) {
            res.json({
                ok: false,
                error: 'Все поля должны быть заполнены!'
            })
        } else {
            try {
                // Смотрим активировал ли пользователь данную фичу.
                const findUser = await models.Apc.findOne({
                    pwdUserId: userId
                });

                // Если да, то просто обноваляем настройки
                if (findUser.length) {
                    try {
                        await models.Apc.findByIdAndUpdate(findUser._id, {
                            $set: {
                                length: passwordLength,
                                pwdPeriod: period
                            }
                        });

                        res.json({
                            ok: true,
                            message: 'Настройки были успешно обновлены'
                        })
                    } catch (error) {
                        throw new Error ('Failed to update')
                        res.json({
                            ok: false,
                            error: 'Failed to update'
                        })
                    }
                // Если нет, то создаем запись в БД.
                } else {
                    try {
                        await models.Apc.create({
                            length: passwordLength,
                            pwdUserId: userId,
                            pwdPeriod: period,
                        });

                        res.json({
                            ok: true,
                            message: 'Запись была успешно создана'
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