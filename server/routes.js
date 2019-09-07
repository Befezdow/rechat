const router = require('koa-router')();

router.get('/test', (ctx, next) => {
  next('test');
});

module.exports = router;
