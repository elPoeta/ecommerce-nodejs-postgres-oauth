const Router = require('koa-router');
const home = require('./home');
const api = require('./api');
const user = require('./user');

const router = new Router();

router.use('/', home.routes());
router.use('/api', api.routes());
router.use('/user', user.routes());

module.exports = router;
