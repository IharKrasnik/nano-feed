// src/lib/Env.js
import { dev } from '$app/environment';

export const API_URL = dev
	? 'https://ship-627ed08f489a970013572f5d.paralect.net'
	: 'https://ship-prod-627ed08f489a970013572f5d.paralect.net';
