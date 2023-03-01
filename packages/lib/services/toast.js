import { toast } from '@zerodevx/svelte-toast';

export const showSuccessMessage = (text) => {
	toast.push(text, {
		duration: 3000,
		pausable: true,
		theme: {
			'--toastWidth:': '500px',
			'--toastColor': 'mintcream',
			'--toastBackground': '#054238',
			'--toastBarBackground': '#2F855A',
			'--toastPadding': '10px 15px'
		}
	});
};

export const showErrorMessage = (text) => {
	toast.push(text, {
		duration: 3000,
		pausable: true,
		theme: {
			'--toastWidth:': '500px',
			'--toastColor': 'white',
			'--toastBackground': '#b13131',
			'--toastBarBackground': 'red',
			'--toastPadding': '10px 15px'
		}
	});
};
