const Router = require('koa-router');
const categorydb = require('../db/category');

const router = new Router();

router.get('/categories', async ctx =>{
    const c = await categorydb.viewAll();
    console.log('!! ',c);
    ctx.body = c;
});

module.exports = router;