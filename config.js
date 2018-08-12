module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: 'mongodb://localhost/blog',
    IS_PRODUCTION: process.env.NODE_ENV === 'production'
}