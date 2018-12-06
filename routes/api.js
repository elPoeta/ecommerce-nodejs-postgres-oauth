const Router = require('koa-router');
const categorydbStatic = require('../db/categoryStatic');
const productdb = require('../db/product');
const router = new Router();

router.get('/categories', async ctx =>{
    ctx.body = await categorydbStatic.viewAll;
 
});

router.get('/product', async ctx =>{
    const q = JSON.parse(ctx.query.q); 
    ctx.body = await productdb.view(q);
});

router.get('/searchProductName', async ctx =>{
    const q = JSON.parse(ctx.query.q); 
    ctx.body = await productdb.searchByName(q);
});

module.exports = router;