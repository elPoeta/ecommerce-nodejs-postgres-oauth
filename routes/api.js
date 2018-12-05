const Router = require('koa-router');
const categorydbStatic = require('../db/categoryStatic');

const router = new Router();

router.get('/categories', async ctx =>{
    ctx.body = await categorydbStatic.viewAll;
 
});

module.exports = router;