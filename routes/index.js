const combineRouters = require('koa-combine-routers');

const index = require('./index/index.js');
const sse = require('./sse');

const router = combineRouters(
  index,
  sse,
);

module.exports = router;
