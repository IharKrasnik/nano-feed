import io from 'socket.io-client';

import currentUser from 'lib/stores/currentUser';

import { API_URL } from 'lib/env';

const socket = io(API_URL, {
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

let currentUserId;

socket.on('connect', () => {
	emit('subscribe', 'global');

	currentUser.subscribe((user) => {
		if (user) {
			if (user._id !== currentUserId) {
				currentUserId = user._id;
				emit('subscribe', `user-${user._id}`);

				if (currentUserId && currentUserId !== user._id) {
					emit('unsubscribe', `user-${user._id}`);
				}
			}
		} else {
			if (currentUserId) {
				emit('unsubscribe', `user-${user._id}`);
			}
			currentUserId = null;
		}
	});
});
