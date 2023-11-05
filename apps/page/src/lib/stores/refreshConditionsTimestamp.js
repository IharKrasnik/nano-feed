import { writable } from 'svelte/store';

const refreshConditionsTimestamp = writable(+new Date());

export default refreshConditionsTimestamp;
