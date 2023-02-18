import moment from 'moment';
let getGrowthPercentage = () => {};
export default (stats, selectedTimeframe = '7_days') => {
	let userChartData = null;
	let viewChartData = null;
	let maxViewsCount;
	let maxReferralCount;
	let maxCountryCount;
	debugger;
	let userGrowth =
		!stats.totalUsersCount && !stats.prevUsersCount
			? 0
			: stats.totalUsersCount === 0
			? -100
			: ((stats.prevUsersCount / stats.totalUsersCount - 1) * 100).toFixed(0);

	maxViewsCount = stats.pageStats[0]?.count;
	maxReferralCount = stats.referralStats[0]?.count;
	maxCountryCount = stats.userCountryStats[0]?.count;

	let dateFrom;
	let unitToAdd;
	let dateLabelFormat = 'yyyy-MM-DD';

	if (selectedTimeframe === '7_days') {
		dateFrom = moment().subtract(7, 'days');
		unitToAdd = 'day';
		dateLabelFormat = 'yyyy-MM-DD';
	} else if (selectedTimeframe === '24_hours') {
		dateFrom = moment().subtract(24, 'hours');
		unitToAdd = 'hour';
		dateLabelFormat = 'DD-HH';
	}

	let now = moment().add(1, 'hour');

	userChartData = {};
	viewChartData = {};

	while (dateFrom < now) {
		let dateLabel = dateFrom.format(dateLabelFormat);

		userChartData[dateLabel] = stats.userStats.find((s) => s.date === dateLabel)?.count || 0;
		viewChartData[dateLabel] = stats.viewStats.find((s) => s.date === dateLabel)?.count || 0;
		dateFrom.add(1, unitToAdd);
	}

	return {
		userChartData,
		viewChartData,
		maxViewsCount,
		maxReferralCount,
		maxCountryCount,
		userGrowth
	};
};
