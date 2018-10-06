const faker = require('faker');
const models = require('./models');
const tr = require('transliter');

const owner = '5b7a8b37904d432a5cce2b59';

module.exports = async () => {
    try {
        await models.Post.remove();
        
        Array.from({length: 20}).forEach( async () => {
            const title = faker.lorem.words(5);
            const body = faker.lorem.words(100);
            const url = `${tr.slugify(title)}-${Date.now().toString(36)}`;
            const post = await models.Post.create({
                title,
                body,
                url,
                owner
            });
            console.log(post)
        });
    } catch (error) {
        console.log(error)
    }
}