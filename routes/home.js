const Router = require('koa-router');
const send = require('koa-send');
const router = new Router();

router.get('/', async ctx =>{
    await send(ctx, '/views/index.html');
});

module.exports = router;