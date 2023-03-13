const Router = require('koa-router');
const instances = require('../../db/index');
const getTimeStamp = require('../../js/createTimeStamp')
const { v4 } = require('uuid');

const router = new Router();

const log = {};

router.get('/instances', async (ctx) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');

  ctx.response.body = JSON.stringify(instances);
});

router.get('/addInstance', async (ctx) => {

  const id = v4();

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (instances.data.some(sub => sub.id === id)) {
    ctx.response.status = 400;
    ctx.response.body = { status: "something went wrong" };

    return;
  }

  log.id = id;
  log.info = 'Create command';
  log.timeStamp = getTimeStamp();

  instances.listeners.forEach(handler => handler(log));

    instances.add({
      id,
      state: 'stopped',
    });

    const response =  instances.data.filter(item => {return item.id === id})

    ctx.response.body = JSON.stringify(response);
});

router.delete('/removeInstance/', (ctx) => {
  const id = ctx.request.query.id;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (instances.data.every(ins => ins.id !== id)) {
    ctx.response.status = 400;
    ctx.response.body = { status: "instance doesn\'t exists" };

    return;
  }

  instances.remove(id);
  
  ctx.response.body = { status: "OK" };
});

module.exports = router;
