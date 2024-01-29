// src/lib/Env.js
import { dev } from '$app/environment';
import { browser } from '$app/environment';

//

export let isDev = dev;

// export const API_URL = dev
// 	? 'https://ship-627ed08f489a970013572f5d.paralect.net'
// 	: 'https://ship-prod-627ed08f489a970013572f5d.paralect.net';

export const API_URL = 'https://ship-prod-627ed08f489a970013572f5d.paralect.net';

export const WAVE_URL = dev ? 'https://wave.mmntm.build' : 'https://wave.mmntm.build';

export const BRAND_URL = dev ? 'http://localhost:5173' : 'https://brand.mmntm.build';

export const PAGE_URL = dev ? 'https://mmntm.page' : 'https://mmntm.page';

export const IDE_URL = dev ? 'http://localhost:5177/ide' : 'https://momentum.page/ide';

export const POST_URL = dev ? 'http://localhost:5179' : 'https://mmntm.blog';

export const STREAM_URL = dev ? 'http://localhost:5175' : 'https://feed.mmntm.build';

// export const STREAM_URL = 'https://feed.mmntm.build';

export let GOOGLE_LOGIN_URL = browser
	? `${API_URL}/auth/google/url?redirect_to=${window.document.location.href}`
	: null;

export let getGoogleLoginUrl = () => {
	return browser ? `${API_URL}/auth/google/url?redirect_to=${window.document.location.href}` : null;
};

export const LINKEDIN_LOGIN_URL = browser
	? `${API_URL}/auth/linkedin/url?redirect_to=${window.document.location.href}`
	: null;

export const TWITTER_LOGIN_URL = browser
	? `${API_URL}/auth/twitter/url?redirect_to=${window.document.location.href}`
	: null;
