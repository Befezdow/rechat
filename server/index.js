const { app } = require('./app');
const { Nuxt, Builder } = require('nuxt');
const nuxtConfig = require('../nuxt.config');
const config = require('../config');


nuxtConfig.dev = app.env !== 'production';
const nuxt = new Nuxt(nuxtConfig);

if (nuxtConfig.dev) {
  const builder = new Builder(nuxt);
  builder.build().catch(e => {
    console.error(e);
    process.exit(1);
  });
} else {
  nuxt.ready().catch(e => {
    console.error(e);
    process.exit(1);
  });
}

app.use((ctx) => {
  ctx.status = 200;
  ctx.respond = false; // Bypass Koa's built-in response handling
  ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
  nuxt.render(ctx.req, ctx.res);
});

const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;
app.listen(port);
