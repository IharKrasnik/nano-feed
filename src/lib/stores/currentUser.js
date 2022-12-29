import { writable } from 'svelte/store';

const currentUserStore = writable(null);

// socketIoService.on('user:updated', (user) => {
// 	currentUserStore.set(user);
// });

export let isLoading = writable(true);

export default currentUserStore;
