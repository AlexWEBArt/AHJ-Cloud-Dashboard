const getTimeStamp = require('../js/createTimeStamp')

const instances = {
  data: [],
  listeners: [],
  log: {},
  
  add(item) {
    this.data.push(item);

    this.log.id = item.id;
    this.log.info = 'Created';
    this.log.timeStamp = getTimeStamp();

    this.listeners.forEach(handler => handler(this.log));
  },

  changeStatus(id) {
    this.data.forEach(item => {
      if (item.id === id) {
        if (item.state === 'stopped') {
          item.state = 'running';
          this.log.info = 'Started';
        } else {
          item.state = 'stopped';
          this.log.info = 'Stopped';
        }
      }
    })

    this.log.id = id;
    this.log.timeStamp = getTimeStamp();

    this.listeners.forEach(handler => handler(this.log));
  },

  remove(id) {
    this.data = this.data.filter(item => {
      return item.id !== id
    })

    this.log.id = id;
    this.log.info = 'Removed';
    this.log.timeStamp = getTimeStamp();

    this.listeners.forEach(handler => handler(this.log));
  },
  
  listen(handler) {
    this.listeners.push(handler);
  },
}

module.exports = instances;
