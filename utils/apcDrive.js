const cron = require('node-cron');
var generator = require('generate-password');
const models = require('../models');
const bcrypt = require('bcrypt-nodejs')

function passGen(length, numbers, symbols, uppercase, excludeSimilarCharacters, exclude, sctrict) {

    try {
        return generator.generate({
            length,
            numbers,
            symbols,
            uppercase,
            excludeSimilarCharacters,
            exclude,
            sctrict
        });

    } catch (error) {
        throw new Error('Could not generate password')
    }
}

module.exports = async () => {
    cron.schedule('5 * * * * *', async () => {
        // Find active users and change password
        try {
            await models.Apc.find({
                isActive: true
            }, function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }

                if (data.length == 0) {
                    console.log('No record found')
                    return
                }

                try {
                    data.forEach(async (v, i) => {
                        const userId = data[i].pwdUserId
                        const userContact = data[i].pwdUserId.phone

                        // Generate password

                        // data settings
                        const newPassword = passGen(
                            data[i].length,
                            data[i].numbers,
                            data[i].symbols,
                            data[i].uppercase,
                            data[i].excludeSimilarCharacters,
                            data[i].exclude,
                            data[i].sctrict
                        )

                        if (!newPassword) {
                            throw new Error ('Password dont generated')
                        } else {
                            // Generate password hash
                            var passwordHash = bcrypt.hashSync(newPassword, null);

                            // Update password in database
                            try {
                                await models.User.findByIdAndUpdate(userId, {
                                    password: passwordHash
                                }, {
                                    new: true
                                }, (err) => {
                                    if (err) return console.log(err);
                                });
                            } catch (error) {
                                throw new Error('Failed to update password to database');
                            }
                            console.log(' NEW PASSWORD ' + newPassword + ' HASH ' + passwordHash);
                        }
                    })
                } catch (error) {
                    throw new Error('Could not perform operation');
                }
            }).populate('pwdUserId')
        } catch (error) {
            throw new Error('error');
        }
    }, {
        scheduled: true,
        timezone: "Europe/Moscow"
    });
}