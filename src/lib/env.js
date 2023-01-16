// src/lib/Env.js
import { dev } from '$app/environment';

export const API_URL = dev
	? 'https://ship-627ed08f489a970013572f5d.paralect.net'
	: 'https://ship-prod-627ed08f489a970013572f5d.paralect.net';

export const PAGE_URL = dev
	? 'https://iharkrasnik-upgraded-halibut-54p7vwww43jj6-5173.preview.app.github.dev'
	: 'https://page.mmntm.build';

export const STREAM_URL = dev
	? 'https://sveltejskittemplatedefault2q1zcw-hsav--5173.local-credentialless.webcontainer.io'
	: 'https://app.mmntm.build';
