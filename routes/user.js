const Router = require('koa-router');

const router = new Router();

router.get('/authenticated', async ctx =>{
   
    if(ctx.state.user){
        ctx.body = ctx.state.user    
    }else{
        ctx.body = {id:false};
    }
    
});
router.get('/logout', async (ctx) => {
    ctx.logout();
    ctx.redirect('/');
  });
  
module.exports = router;