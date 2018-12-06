const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const kstatic = require('koa-static');
const routes = require('./routes/index');

const port = process.env.PORT || 3000;

const app = new Koa();



app
    .use(bodyparser())
    .use(kstatic('.'))
    .use(routes.routes())
    .use(routes.allowedMethods())
    .listen(port, async error =>{
        if(error)
        {
            console.error(error);
        }
        console.log(`App Listening on Port ${port}`);
    });

  
  