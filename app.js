const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const kstatic = require('koa-static');
const session = require('koa-session');
const passport = require('koa-passport');
const key = require('./config/config');
const routes = require('./routes/index');
require('./utils/oauth');

const port = process.env.PORT || 3000;

const app = new Koa();

app.keys = [key.appKey];

app
    .use(session({},app))
    .use(bodyparser())
    .use(passport.initialize())
    .use(passport.session())
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

  
    //"redirect_uris":["http://localhost:3000/api/oauth/google/callback"],
    //"javascript_origins":["http://localhost:3000"]}}