import io from 'socket.io-client';

import currentCustomer from 'lib/stores/currentCustomer';

import { API_URL } from 'lib/env';

export const socket = io(API_URL, {
	transports: ['websocket'],
	autoConnect: false
});

export const connect = async () => {
	socket.open();
};

export const disconnect = () => {
	socket.disconnect();
};

export const emit = (event, ...args) => {
	socket.emit(event, ...args);
};

export const on = (event, callback) => {
	socket.on(event, callback);
};

export const off = (event, callback) => {
	socket.off(event, callback);
};

export const connected = () => socket.connected;

export const disconnected = () => socket.disconnected;

let currentCustomerId;

socket.on('connect', () => {
	emit('subscribe', 'customer-global');

	currentCustomer.subscribe((customer) => {
		if (customer && customer.isEmailVerified) {
			if (customer._id !== currentCustomerId) {
				currentCustomerId = customer._id;
				emit('subscribe', `customer-${customer._id}`);

				if (currentCustomerId && currentCustomerId !== customer._id) {
					emit('unsubscribe', `customer-${customer._id}`);
				}
			}
		} else {
			if (currentCustomerId) {
				emit('unsubscribe', `customer-${currentCustomerId}`);
			}
			currentCustomerId = null;
		}
	});
});
