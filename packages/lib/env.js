// src/lib/Env.js
import { dev } from '$app/environment';
import { browser } from '$app/environment';

export const API_URL = dev
	? 'https://ship-627ed08f489a970013572f5d.paralect.net'
	: 'https://ship-prod-627ed08f489a970013572f5d.paralect.net';

export const PAGE_URL = dev
	? 'https://iharkrasnik-potential-robot-4q5pjgx4ggf7gx9-5173.preview.app.github.dev'
	: 'https://page.mmntm.build';

export const STREAM_URL = dev
	? 'https://sveltejskittemplatedefault2q1zcw-hsav--5173.local-credentialless.webcontainer.io'
	: 'https://app.mmntm.build';

export const GOOGLE_LOGIN_URL = browser
	? `${API_URL}/auth/google/url?redirect_to=${window.document.location.href}`
	: null;
