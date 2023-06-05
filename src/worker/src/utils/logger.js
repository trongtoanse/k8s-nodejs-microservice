const {createLogger, format, transports} = require('winston');
const ip = require("ip");

module.exports = createLogger({
    transports:
        new transports.Console({
            format: format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${ip.address()} - ${[info.timestamp]}  [${info.level}] ${info.message}`),
            )
        }),
});