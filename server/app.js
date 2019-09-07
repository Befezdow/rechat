const Koa = require('koa');
const router = require('./routes');
const io = require('./socket');

const app = new Koa();
io.attach(app);

app.use(router.routes()).use(router.allowedMethods());

module.exports = { app };
