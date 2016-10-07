/**
 * Poller
 *
 */

var Websocket = require('middleware/Websocket');

var _pollers = {};

var Poller = {

	create(exchange_id, promise, params, channel, action, interval) {

		var poller = this.poll.apply(this, arguments);
		var key = `${exchange_id}|${channel}|${action}`;

		_pollers[key] = poller;


	},

	poll(exchange_id, promise, params, channel, action, interval) {

		return promise.apply(this, params)
			.then((data) => {
				return Websocket.broadcast(exchange_id, channel, action, data);
			})
			.then(() => {
				setTimeout(() => {
					return Poller.poll.apply(this, arguments);
				}, interval);
			});

	}

}

module.exports = Poller;
