const bunyan = require('bunyan');
const Log = require('../models').Log;

function LogStream(options) {
    this.model = options.model;
}

LogStream.prototype.write = function (rec) {
    this.model.create({
        level: rec.level,
        message: rec.msg,
        time: new Date(rec.time)
    });
};

const logger = bunyan.createLogger({
    name: 'myapp',
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            stream: process.stderr
        },
        {
            level: 'debug',
            type: 'raw', // Indica a Bunyan que el stream es "raw"
            stream: new LogStream({ model: Log })
        }
    ]
});

module.exports = logger;
