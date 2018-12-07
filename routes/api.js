const Router = require('koa-router');
const passport = require('koa-passport');
const {authenticated} = require('../utils/authenticated');
const categorydbStatic = require('../db/categoryStatic');
const productdb = require('../db/product');
require('../utils/oauth');

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

router.get('/oauth/google',
passport.authenticate('google',{ scope: ['profile', 'email']}));


router.get('/oauth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);
module.exports = router;