// src/lib/Env.js
import { dev } from '$app/environment';
import { browser } from '$app/environment';

//

export const API_URL = dev
	? 'https://ship-627ed08f489a970013572f5d.paralect.net'
	: 'https://ship-prod-627ed08f489a970013572f5d.paralect.net';

// export const API_URL = 'https://ship-prod-627ed08f489a970013572f5d.paralect.net';

export const WAVE_URL = dev ? 'https://wave.mmntm.build' : 'https://wave.mmntm.build';

export const PAGE_URL = dev ? 'http://localhost:5176' : 'https://page.mmntm.build';
// export const PAGE_URL = 'http://localhost:5175/';

export const STREAM_URL = dev
	? 'https://feed.mmntm.build'
	: // 'https://feed.mmntm.build'
	  'https://feed.mmntm.build';

export let GOOGLE_LOGIN_URL = browser
	? `${API_URL}/auth/google/url?redirect_to=${window.document.location.href}`
	: null;

export const LINKEDIN_LOGIN_URL = browser
	? `${API_URL}/auth/linkedin/url?redirect_to=${window.document.location.href}`
	: null;

export const TWITTER_LOGIN_URL = browser
	? `${API_URL}/auth/twitter/url?redirect_to=${window.document.location.href}`
	: null;
