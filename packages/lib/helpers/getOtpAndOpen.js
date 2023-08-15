import { post } from 'lib/api';
import { goto } from '$app/navigation';

let getOtpAndOpen = async (url) => {
	let { otp } = await post('users/otp');

	goto(`${url}?otp=${otp}`);
};

export default getOtpAndOpen;
