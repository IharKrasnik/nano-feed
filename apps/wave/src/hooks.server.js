// import * as Sentry from '@sentry/node';

// Sentry.init({/*...*/})

export function handleError({ error, event }) {
	// Sentry.captureException(error, { event });

	return {
		message: 'Whoops!',
		code: error?.code ?? 'UNKNOWN'
	};
}
